<?php
/**
 * Plugin Name: Bville Menu for WooCommerce
 * Description: Imports every Bville Pizza & Grill menu item as a WooCommerce product (SKU, prices, photos, variations).
 * Version: 1.0.0
 * Author: Bville Pizza & Grill
 * Requires Plugins: woocommerce
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

add_action('admin_menu', static function (): void {
    add_submenu_page(
        'woocommerce',
        'Bville Menu',
        'Bville Menu',
        'manage_woocommerce',
        'bville-menu',
        'bville_menu_admin_page'
    );
});

add_action('woocommerce_after_order_notes', static function (): void {
    echo '<p class="form-row form-row-wide"><label for="bville_fulfillment">Pickup or delivery</label>';
    echo '<select name="bville_fulfillment" id="bville_fulfillment">';
    echo '<option value="pickup">Pickup at 159 Morristown Rd</option>';
    echo '<option value="delivery">Delivery</option>';
    echo '</select></p>';
});

add_action('woocommerce_checkout_update_order_meta', static function ($order_id): void {
    if (!empty($_POST['bville_fulfillment'])) {
        $value = sanitize_text_field(wp_unslash((string) $_POST['bville_fulfillment']));
        if (in_array($value, ['pickup', 'delivery'], true)) {
            update_post_meta((int) $order_id, 'fulfillment', $value);
        }
    }
});

function bville_menu_catalog(): array
{
    $path = __DIR__ . '/catalog.json';
    if (!is_file($path)) {
        return [];
    }
    $json = json_decode((string) file_get_contents($path), true);

    return is_array($json) ? $json : [];
}

function bville_menu_admin_page(): void
{
    if (!current_user_can('manage_woocommerce')) {
        return;
    }

    $result = null;
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && check_admin_referer('bville_menu_sync')) {
        $result = bville_menu_sync_products();
    }

    $catalog = bville_menu_catalog();
    $count = count($catalog['products'] ?? []);

    echo '<div class="wrap"><h1>Bville Menu</h1>';
    echo '<p>Import the printed Bville menu as WooCommerce products. Each dish gets a SKU, price, photo, and variations (pizza size, wing count).</p>';
    echo '<p><strong>' . esc_html((string) $count) . '</strong> products in catalog.json.</p>';
    if (is_array($result)) {
        echo '<div class="notice notice-success"><p>' . esc_html((string) $result['message']) . '</p></div>';
    }
    echo '<form method="post">';
    wp_nonce_field('bville_menu_sync');
    submit_button('Import / update products');
    echo '</form></div>';
}

function bville_menu_sync_products(): array
{
    if (!function_exists('wc_get_product_id_by_sku')) {
        return ['message' => 'WooCommerce is not active.'];
    }

    $catalog = bville_menu_catalog();
    $created = 0;
    $updated = 0;

    foreach ($catalog['products'] ?? [] as $row) {
        $product_id = wc_get_product_id_by_sku($row['sku']);
        $is_variable = ($row['type'] ?? '') === 'variable';
        $product = $product_id ? wc_get_product($product_id) : null;

        if (!$product) {
            $product = $is_variable ? new WC_Product_Variable() : new WC_Product_Simple();
            $created++;
        } else {
            $updated++;
        }

        $product->set_sku($row['sku']);
        $product->set_name($row['name']);
        $product->set_short_description($row['short_description'] ?? '');
        $product->set_description($row['description'] ?? '');
        $product->set_catalog_visibility('visible');
        $product->set_status('publish');
        $product->set_virtual(true);
        $product->set_tax_status('taxable');
        $product->set_sold_individually(false);
        $product->update_meta_data('bville_id', $row['id']);

        if (!$is_variable) {
            $product->set_regular_price($row['regular_price']);
        }

        $term = get_term_by('name', $row['category_name'], 'product_cat');
        if (!$term) {
            $inserted = wp_insert_term($row['category_name'], 'product_cat', [
                'slug' => sanitize_title($row['category_name']),
            ]);
            $term_id = is_wp_error($inserted) ? 0 : (int) $inserted['term_id'];
        } else {
            $term_id = (int) $term->term_id;
        }
        if ($term_id) {
            $product->set_category_ids([$term_id]);
        }

        $product_id = $product->save();

        if ($is_variable && $product_id) {
            bville_menu_sync_variations((int) $product_id, $row);
        }
    }

    return [
        'message' => sprintf('Imported Bville menu: %d created, %d updated.', $created, $updated),
    ];
}

function bville_menu_sync_variations(int $product_id, array $row): void
{
    $product = wc_get_product($product_id);
    if (!$product instanceof WC_Product_Variable) {
        return;
    }

    $attr = $row['attributes'][0] ?? null;
    if (!$attr) {
        return;
    }

    $attribute = new WC_Product_Attribute();
    $attribute->set_name($attr['name']);
    $attribute->set_options($attr['options']);
    $attribute->set_visible(true);
    $attribute->set_variation(true);
    $product->set_attributes([$attribute]);
    $product->save();

    foreach ($row['variations'] as $variation_row) {
        $variation_id = wc_get_product_id_by_sku($variation_row['sku']);
        $variation = $variation_id ? new WC_Product_Variation($variation_id) : new WC_Product_Variation();
        $variation->set_parent_id($product_id);
        $variation->set_sku($variation_row['sku']);
        $variation->set_regular_price($variation_row['regular_price']);
        $variation->set_virtual(true);
        $variation->set_attributes(array_change_key_case($variation_row['attributes'], CASE_LOWER));
        $variation->save();
    }
}
