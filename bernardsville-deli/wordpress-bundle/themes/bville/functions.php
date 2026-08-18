<?php
/**
 * Bville theme functions.
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

add_action('after_setup_theme', static function (): void {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo', [
        'height' => 120,
        'width' => 120,
        'flex-height' => true,
        'flex-width' => true,
    ]);
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
    register_nav_menus([
        'primary' => __('Primary', 'bville'),
    ]);
});

add_action('wp_enqueue_scripts', static function (): void {
    wp_enqueue_style(
        'bville-fonts',
        'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Oleo+Script+Swash+Caps:wght@700&family=Oswald:wght@500;600;700&display=swap',
        [],
        null
    );
    wp_enqueue_style('bville-style', get_stylesheet_uri(), ['bville-fonts'], '1.0.0');
});

function bville_asset(string $file): string
{
    return get_template_directory_uri() . '/assets/' . ltrim($file, '/');
}

function bville_phone(): string
{
    return '(908) 766-1666';
}

function bville_phone_raw(): string
{
    return '9087661666';
}

function bville_address(): string
{
    return '159 Morristown Rd · Bernardsville, NJ 07924';
}

/** Keep shop loops compact for the line layout. */
add_filter('loop_shop_per_page', static fn (): int => 24);
add_filter('loop_shop_columns', static fn (): int => 2);

add_action('after_setup_theme', static function (): void {
    if (get_option('bville_menu_seeded') || !function_exists('wc_get_page_id')) {
        return;
    }
    $menu_id = wp_create_nav_menu('Bville Primary');
    if (is_wp_error($menu_id)) {
        return;
    }
    $shop = get_permalink(wc_get_page_id('shop')) ?: home_url('/shop/');
    $links = [
        'Home' => home_url('/'),
        'Menu' => $shop,
        'Cart' => function_exists('wc_get_cart_url') ? wc_get_cart_url() : home_url('/cart/'),
        'Checkout' => function_exists('wc_get_checkout_url') ? wc_get_checkout_url() : home_url('/checkout/'),
    ];
    foreach ($links as $title => $url) {
        wp_update_nav_menu_item($menu_id, 0, [
            'menu-item-title' => $title,
            'menu-item-url' => $url,
            'menu-item-status' => 'publish',
            'menu-item-type' => 'custom',
        ]);
    }
    $locations = get_theme_mod('nav_menu_locations', []);
    $locations['primary'] = (int) $menu_id;
    set_theme_mod('nav_menu_locations', $locations);
    update_option('bville_menu_seeded', 1);
}, 30);
