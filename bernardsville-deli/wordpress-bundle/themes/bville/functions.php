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
        'https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,700;1,700&family=Bangers&family=DM+Sans:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Oleo+Script+Swash+Caps:wght@700&family=Oswald:wght@500;600;700&family=Russo+One&display=swap',
        [],
        null
    );
    wp_enqueue_style('bville-style', get_stylesheet_uri(), ['bville-fonts'], '1.4.6');
    wp_enqueue_style('bville-order-board', bville_asset('order-board.css'), ['bville-style'], '1.4.6');
    wp_enqueue_style('bville-chudo', bville_asset('chudo.css'), ['bville-order-board'], '1.4.6');
    wp_enqueue_script('bville-nav', bville_asset('nav.js'), [], '1.4.6', true);
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

function bville_instagram(): string
{
    return 'https://www.instagram.com/bvillepizzagrill/';
}

function bville_shop_url(): string
{
    if (function_exists('wc_get_page_id')) {
        $id = wc_get_page_id('shop');
        if ($id > 0) {
            return (string) get_permalink($id);
        }
    }

    return home_url('/shop/');
}

function bville_wordmark_slug(string $title): string
{
    $map = [
        'From The Garden' => 'garden',
        'Starters' => 'starters',
        'Shakes' => 'shakes',
        'Burgers' => 'burgers',
        'Wraps' => 'wraps',
        'Wrap & Roll' => 'wraps',
        'Pasta' => 'pasta',
        'Pastabilities' => 'pasta',
        'Philly Cheese Steak' => 'cheesesteak',
        'Cheesesteak' => 'cheesesteak',
        'Sandwiches' => 'sandwiches',
        'Panini' => 'panini',
        'Stone Oven Baked' => 'pizza',
        'Headlines' => 'platters',
        "Kids' Menu" => 'kids',
        'Kids Menu' => 'kids',
        'Sweet Endings' => 'desserts',
    ];

    return $map[$title] ?? sanitize_title($title);
}

function bville_print_title(string $title, string $class = 'print-title'): string
{
    $slug = bville_wordmark_slug($title);
    $file = get_template_directory() . '/assets/wordmarks/' . $slug . '.png';
    if (is_file($file)) {
        return sprintf(
            '<img class="%s print-title--img" src="%s" alt="%s" width="640" height="180" decoding="async" />',
            esc_attr($class),
            esc_url(bville_asset('wordmarks/' . $slug . '.png')),
            esc_attr($title)
        );
    }

    return sprintf(
        '<span class="%s print-title--text">%s</span>',
        esc_attr($class),
        esc_html($title)
    );
}

function bville_menu_category_order(): array
{
    return [
        'From The Garden',
        'Starters',
        'Shakes',
        'Burgers',
        'Wrap & Roll',
        'Pastabilities',
        'Cheesesteak',
        'Sandwiches',
        'Panini',
        'Stone Oven Baked',
        'Headlines',
        'Kids Menu',
        'Sweet Endings',
        'Cafe Robust',
    ];
}

add_filter('body_class', static function (array $classes): array {
    $classes[] = 'chudo-world';
    $classes[] = 'bville-brand';
    return $classes;
});
add_filter('loop_shop_per_page', static fn (): int => 24);
add_filter('loop_shop_columns', static fn (): int => 2);

add_action('after_switch_theme', static function (): void {
    if (get_option('bville_pages_seeded')) {
        return;
    }
    $pages = [
        'menu' => ['title' => 'Menu', 'template' => 'page-menu.php'],
        'contact' => ['title' => 'Contact', 'template' => 'page-contact.php'],
    ];
    foreach ($pages as $slug => $row) {
        if (get_page_by_path($slug)) {
            continue;
        }
        $id = wp_insert_post([
            'post_title' => $row['title'],
            'post_name' => $slug,
            'post_status' => 'publish',
            'post_type' => 'page',
            'post_content' => '',
        ]);
        if ($id && !is_wp_error($id)) {
            update_post_meta((int) $id, '_wp_page_template', $row['template']);
        }
    }
    update_option('bville_pages_seeded', 1);
});

add_action('after_setup_theme', static function (): void {
    if (get_option('bville_menu_seeded') || !function_exists('wc_get_page_id')) {
        return;
    }
    $menu_id = wp_create_nav_menu('Bville Primary');
    if (is_wp_error($menu_id)) {
        return;
    }
    $contact = get_page_by_path('contact');
    $menu_page = get_page_by_path('menu');
    $links = [
        'Home' => home_url('/'),
        'Menu' => $menu_page ? get_permalink($menu_page) : bville_shop_url(),
        'Order' => bville_shop_url(),
        'Contact' => $contact ? get_permalink($contact) : home_url('/contact/'),
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
}, 40);

require_once get_template_directory() . '/inc/order-board.php';
