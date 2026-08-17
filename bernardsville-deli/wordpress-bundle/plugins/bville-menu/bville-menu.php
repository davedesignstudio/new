<?php
/**
 * Plugin Name: Bville Menu for WooCommerce
 * Description: Imports every Bville Pizza & Grill menu item as WooCommerce products (SKU, prices, photos, variations) for GoDaddy / WordPress.
 * Version: 1.1.0
 * Author: Bville Pizza & Grill
 * Requires at least: 6.0
 * Requires PHP: 8.0
 * Requires Plugins: woocommerce
 * Text Domain: bville-menu
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

define('BVILLE_MENU_VERSION', '1.1.0');
define('BVILLE_MENU_PATH', plugin_dir_path(__FILE__));
define('BVILLE_MENU_URL', plugin_dir_url(__FILE__));

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
    echo '<p class="form-row form-row-wide"><label for="bville_fulfillment">' . esc_html__('Pickup or delivery', 'bville-menu') . '</label>';
    echo '<select name="bville_fulfillment" id="bville_fulfillment">';
    echo '<option value="pickup">' . esc_html__('Pickup at 159 Morristown Rd', 'bville-menu') . '</option>';
    echo '<option value="delivery">' . esc_html__('Delivery', 'bville-menu') . '</option>';
    echo '</select></p>';
});

add_action('woocommerce_checkout_update_order_meta', static function ($order_id): void {
    if (!empty($_POST['bville_fulfillment'])) {
        $value = sanitize_text_field(wp_unslash((string) $_POST['bville_fulfillment']));
        if (in_array($value, ['pickup', 'delivery'], true)) {
            $order = wc_get_order($order_id);
            if ($order) {
                $order->update_meta_data('fulfillment', $value);
                $order->save();
            }
        }
    }
});

function bville_menu_catalog(): array
{
    $path = BVILLE_MENU_PATH . 'catalog.json';
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
        $with_images = !empty($_POST['bville_import_images']);
        $result = bville_menu_sync_products($with_images);
    }

    $catalog = bville_menu_catalog();
    $count = count($catalog['products'] ?? []);

    echo '<div class="wrap"><h1>Bville Menu</h1>';
    echo '<p>Import the printed Bville menu as WooCommerce products. Each dish gets a SKU, price, optional photo, and variations (pizza size, wing count).</p>';
    echo '<p><strong>' . esc_html((string) $count) . '</strong> products in <code>catalog.json</code>.</p>';
    if (is_array($result)) {
        $class = !empty($result['ok']) ? 'notice-success' : 'notice-error';
        echo '<div class="notice ' . esc_attr($class) . '"><p>' . esc_html((string) $result['message']) . '</p></div>';
    }
    echo '<form method="post">';
    wp_nonce_field('bville_menu_sync');
    echo '<p><label><input type="checkbox" name="bville_import_images" value="1" checked> ';
    echo esc_html__('Attach bundled product photos from the plugin assets folder', 'bville-menu');
    echo '</label></p>';
    submit_button('Import / update products');
    echo '</form>';
    echo '<p>After import: WooCommerce → Settings → Payments to enable Stripe/Square/PayPal, then set NJ tax if needed.</p>';
    echo '</div>';
}

function bville_menu_local_image_path(string $image_ref): string
{
    $rel = ltrim($image_ref, '/');
    if (str_starts_with($rel, 'assets/')) {
        $rel = substr($rel, strlen('assets/'));
    }
    $candidate = BVILLE_MENU_PATH . 'assets/' . $rel;
    if (is_file($candidate)) {
        return $candidate;
    }
    $base = basename($rel);
    $fallback = BVILLE_MENU_PATH . 'assets/photos/menu/' . $base;
    return is_file($fallback) ? $fallback : '';
}

function bville_menu_sideload_image(string $file_path, int $parent_id, string $title): int
{
    if ($file_path === '' || !is_file($file_path)) {
        return 0;
    }
    require_once ABSPATH . 'wp-admin/includes/file.php';
    require_once ABSPATH . 'wp-admin/includes/media.php';
    require_once ABSPATH . 'wp-admin/includes/image.php';

    $filename = basename($file_path);
    $upload = wp_upload_bits($filename, null, (string) file_get_contents($file_path));
    if (!empty($upload['error'])) {
        return 0;
    }

    $filetype = wp_check_filetype($filename, null);
    $attachment = [
        'post_mime_type' => $filetype['type'] ?? 'image/jpeg',
        'post_title' => sanitize_text_field($title),
        'post_content' => '',
        'post_status' => 'inherit',
    ];
    $attach_id = wp_insert_attachment($attachment, $upload['file'], $parent_id);
    if (is_wp_error($attach_id) || !$attach_id) {
        return 0;
    }
    $meta = wp_generate_attachment_metadata($attach_id, $upload['file']);
    wp_update_attachment_metadata($attach_id, $meta);

    return (int) $attach_id;
}

function bville_menu_sync_products(bool $with_images = true): array
{
    if (!function_exists('wc_get_product_id_by_sku')) {
        return ['ok' => false, 'message' => 'WooCommerce is not active.'];
    }

    $catalog = bville_menu_catalog();
    if (!$catalog) {
        return ['ok' => false, 'message' => 'catalog.json missing or invalid.'];
    }

    $created = 0;
    $updated = 0;
    $images = 0;

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
        $product->set_virtual(!empty($row['virtual']));
        $product->set_tax_status('taxable');
        $product->set_sold_individually(false);
        $product->update_meta_data('bville_id', $row['id']);
        if (!empty($row['legacy_id'])) {
            $product->update_meta_data('bville_legacy_id', $row['legacy_id']);
        }

        if (!$is_variable) {
            $product->set_regular_price((string) $row['regular_price']);
        }

        $term = get_term_by('name', $row['category_name'], 'product_cat');
        if (!$term) {
            $inserted = wp_insert_term($row['category_name'], 'product_cat', [
                'slug' => sanitize_title((string) ($row['category'] ?? $row['category_name'])),
            ]);
            $term_id = is_wp_error($inserted) ? 0 : (int) $inserted['term_id'];
        } else {
            $term_id = (int) $term->term_id;
        }
        if ($term_id) {
            $product->set_category_ids([$term_id]);
        }

        $product_id = $product->save();

        if ($with_images && $product_id && !empty($row['images'][0])) {
            $local = bville_menu_local_image_path((string) $row['images'][0]);
            if ($local !== '') {
                $attach_id = bville_menu_sideload_image($local, (int) $product_id, (string) $row['name']);
                if ($attach_id) {
                    $product = wc_get_product($product_id);
                    if ($product) {
                        $product->set_image_id($attach_id);
                        $product->save();
                        $images++;
                    }
                }
            }
        }

        if ($is_variable && $product_id) {
            bville_menu_sync_variations((int) $product_id, $row);
        }
    }

    return [
        'ok' => true,
        'message' => sprintf(
            'Imported Bville menu: %d created, %d updated, %d photos attached.',
            $created,
            $updated,
            $images
        ),
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
        $variation->set_regular_price((string) $variation_row['regular_price']);
        $variation->set_virtual(true);
        $variation->set_attributes(array_change_key_case($variation_row['attributes'], CASE_LOWER));
        $variation->save();
    }
}
