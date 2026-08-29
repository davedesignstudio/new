<?php
/**
 * D Philhower Studio theme bootstrap.
 *
 * @package DPhilhowerStudio
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'DPS_VERSION', '1.0.49' );
define( 'DPS_DIR', get_template_directory() );
define( 'DPS_URI', get_template_directory_uri() );

require_once DPS_DIR . '/inc/helpers.php';
require_once DPS_DIR . '/inc/cpt.php';
require_once DPS_DIR . '/inc/customizer.php';
require_once DPS_DIR . '/inc/contact-form.php';
require_once DPS_DIR . '/inc/brand-kits.php';
require_once DPS_DIR . '/inc/setup-content.php';

/**
 * Theme supports and menus.
 */
function dps_setup() {
	load_theme_textdomain( 'dphilhower-studio', DPS_DIR . '/languages' );

	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'align-wide' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'editor-styles' );
	add_theme_support(
		'html5',
		array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' )
	);
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 80,
			'width'       => 320,
			'flex-height' => true,
			'flex-width'  => true,
		)
	);
	add_theme_support(
		'custom-background',
		array(
			'default-color' => 'dfe4d8',
		)
	);

	register_nav_menus(
		array(
			'primary' => __( 'Primary Menu', 'dphilhower-studio' ),
			'footer'  => __( 'Footer Menu', 'dphilhower-studio' ),
		)
	);

	add_image_size( 'dps-hero', 2560, 1707, false );
	add_image_size( 'dps-work', 2048, 2560, false );
}
add_action( 'after_setup_theme', 'dps_setup' );

/**
 * Front-end assets.
 */
function dps_assets() {
	wp_enqueue_style(
		'dps-fonts',
		'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Source+Sans+3:ital,wght@0,400;0,600;1,400&display=swap',
		array(),
		null
	);
	wp_enqueue_style( 'dps-main', DPS_URI . '/assets/css/main.css', array( 'dps-fonts' ), DPS_VERSION );
	wp_enqueue_style( 'dps-editorial', DPS_URI . '/assets/css/editorial.css', array( 'dps-main' ), DPS_VERSION );
	wp_enqueue_script( 'dps-main', DPS_URI . '/assets/js/main.js', array(), DPS_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'dps_assets' );

/**
 * Resource hints for Google Fonts.
 *
 * @param array  $urls          URLs.
 * @param string $relation_type Relation.
 * @return array
 */
function dps_resource_hints( $urls, $relation_type ) {
	if ( 'preconnect' === $relation_type ) {
		$urls[] = array(
			'href'        => 'https://fonts.googleapis.com',
			'crossorigin' => false,
		);
		$urls[] = array(
			'href'        => 'https://fonts.gstatic.com',
			'crossorigin' => true,
		);
	}
	return $urls;
}
add_filter( 'wp_resource_hints', 'dps_resource_hints', 10, 2 );

/**
 * Add CTA class to the contact menu item.
 *
 * @param array    $classes Classes.
 * @param WP_Post  $item    Item.
 * @return array
 */
function dps_nav_cta_class( $classes, $item ) {
	$title = strtolower( wp_strip_all_tags( $item->title ) );
	if ( in_array( 'cta', $classes, true ) || 'start a project' === $title || 'contact' === $title ) {
		$classes[] = 'cta';
	}
	return $classes;
}
add_filter( 'nav_menu_css_class', 'dps_nav_cta_class', 10, 2 );

/**
 * Default content width.
 */
function dps_content_width() {
	$GLOBALS['content_width'] = 2560;
}

/**
 * Keep uploaded and generated images at full resolution.
 */
function dps_full_image_quality( $quality ) {
	return 100;
}
add_filter( 'jpeg_quality', 'dps_full_image_quality' );
add_filter( 'wp_editor_set_quality', 'dps_full_image_quality' );
add_filter( 'big_image_size_threshold', '__return_false' );
add_action( 'after_setup_theme', 'dps_content_width', 0 );

/**
 * Queue demo content when the theme is activated.
 * Seeding runs on init so the Work post type is already registered.
 */
function dps_after_switch_theme() {
	update_option( 'dps_seed_pending', 1 );
}
add_action( 'after_switch_theme', 'dps_after_switch_theme' );

/**
 * Seed demo content on init if queued, or once if this is a fresh site.
 */
function dps_maybe_seed_demo() {
	if ( get_option( 'dps_seed_pending' ) || ( ! get_option( 'dps_demo_seeded' ) && 'dphilhower-studio' === get_stylesheet() ) ) {
		dps_seed_demo_content();
		delete_option( 'dps_seed_pending' );
	}
	dps_maybe_upgrade_images();
}
add_action( 'init', 'dps_maybe_seed_demo', 20 );

/**
 * Replace compressed demo JPEGs with native PNG files on existing installs.
 */
function dps_maybe_upgrade_images() {
	if ( 'dphilhower-studio' !== get_stylesheet() ) {
		return;
	}
	if ( get_option( 'dps_images_version' ) === 'brands-print-28' ) {
		return;
	}
	if ( ! get_option( 'dps_demo_seeded' ) ) {
		return;
	}
	dps_seed_demo_content( true );
	update_option( 'dps_images_version', 'brands-print-28' );
}

/**
 * Favicon.
 */
function dps_favicon() {
	printf(
		'<link rel="icon" href="%s" type="image/svg+xml">' . "\n",
		esc_url( dps_image_url( 'favicon.svg' ) )
	);
}
add_action( 'wp_head', 'dps_favicon' );

/**
 * This theme is a brochure site — keep comments off.
 */
add_filter( 'comments_open', '__return_false' );
add_filter( 'pings_open', '__return_false' );
