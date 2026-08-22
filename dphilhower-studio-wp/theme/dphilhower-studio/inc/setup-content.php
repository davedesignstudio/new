<?php
/**
 * Demo pages, menu, and portfolio seed.
 *
 * @package DPhilhowerStudio
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Import a theme image into the media library.
 *
 * @param string $filename Image file in assets/images.
 * @param string $title    Attachment title.
 * @return int Attachment ID or 0.
 */
function dps_sideload_theme_image( $filename, $title = '' ) {
	$path = dps_image_path( $filename );
	if ( ! file_exists( $path ) ) {
		return 0;
	}

	$stem       = pathinfo( $filename, PATHINFO_FILENAME );
	$candidates = array( $filename, $stem . '.jpg', $stem . '.jpeg' );
	$existing   = get_posts(
		array(
			'post_type'      => 'attachment',
			'post_status'    => 'inherit',
			'posts_per_page' => 1,
			'fields'         => 'ids',
			'meta_query'     => array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
				array(
					'key'     => '_dps_source_file',
					'value'   => $candidates,
					'compare' => 'IN',
				),
			),
		)
	);
	if ( $existing ) {
		$attach_id = (int) $existing[0];
		dps_refresh_attachment_from_theme( $attach_id, $filename );
		return $attach_id;
	}

	require_once ABSPATH . 'wp-admin/includes/file.php';
	require_once ABSPATH . 'wp-admin/includes/media.php';
	require_once ABSPATH . 'wp-admin/includes/image.php';

	$upload = wp_upload_bits( $filename, null, file_get_contents( $path ) ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
	if ( ! empty( $upload['error'] ) ) {
		return 0;
	}

	$filetype  = wp_check_filetype( $filename, null );
	$attach_id = wp_insert_attachment(
		array(
			'post_mime_type' => $filetype['type'],
			'post_title'     => $title ? $title : preg_replace( '/\.[^.]+$/', '', $filename ),
			'post_content'   => '',
			'post_status'    => 'inherit',
		),
		$upload['file']
	);

	if ( is_wp_error( $attach_id ) || ! $attach_id ) {
		return 0;
	}

	$meta = wp_generate_attachment_metadata( $attach_id, $upload['file'] );
	wp_update_attachment_metadata( $attach_id, $meta );
	update_post_meta( $attach_id, '_dps_source_file', $filename );

	return (int) $attach_id;
}

/**
 * Replace a previously imported JPEG (or stale file) with the theme PNG.
 *
 * @param int    $attach_id Attachment ID.
 * @param string $filename  Theme image file name.
 */
function dps_refresh_attachment_from_theme( $attach_id, $filename ) {
	$source = dps_image_path( $filename );
	$dest   = get_attached_file( $attach_id );
	if ( ! $attach_id || ! $source || ! $dest || ! file_exists( $source ) ) {
		update_post_meta( $attach_id, '_dps_source_file', $filename );
		return;
	}

	$new_dest = preg_replace( '/\.(jpe?g|png)$/i', '.png', $dest );
	if ( ! $new_dest ) {
		$new_dest = $dest;
	}

	if ( file_exists( $dest ) && md5_file( $source ) === md5_file( $dest ) && $filename === get_post_meta( $attach_id, '_dps_source_file', true ) ) {
		return;
	}

	require_once ABSPATH . 'wp-admin/includes/file.php';
	require_once ABSPATH . 'wp-admin/includes/image.php';

	copy( $source, $new_dest ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_copy
	if ( $new_dest !== $dest && file_exists( $dest ) ) {
		unlink( $dest ); // phpcs:ignore WordPress.WP.AlternativeFunctions.unlink_unlink
	}

	wp_update_post(
		array(
			'ID'             => $attach_id,
			'post_mime_type' => 'image/png',
		)
	);
	update_attached_file( $attach_id, $new_dest );
	$meta = wp_generate_attachment_metadata( $attach_id, $new_dest );
	wp_update_attachment_metadata( $attach_id, $meta );
	update_post_meta( $attach_id, '_dps_source_file', $filename );
}

/**
 * Create or update a page by slug.
 *
 * @param string $slug     Slug.
 * @param string $title    Title.
 * @param string $content  Content.
 * @param string $template Page template file.
 * @return int
 */
function dps_upsert_page( $slug, $title, $content, $template = '' ) {
	$existing = get_page_by_path( $slug );
	$data     = array(
		'post_title'   => $title,
		'post_name'    => $slug,
		'post_content' => $content,
		'post_status'  => 'publish',
		'post_type'    => 'page',
	);

	if ( $existing ) {
		$data['ID'] = $existing->ID;
		$page_id    = wp_update_post( $data );
	} else {
		$page_id = wp_insert_post( $data );
	}

	if ( $page_id && $template ) {
		update_post_meta( $page_id, '_wp_page_template', $template );
	}

	return (int) $page_id;
}

/**
 * Seed demo content once.
 *
 * @param bool $force Recreate even if already seeded.
 * @return bool
 */
function dps_seed_demo_content( $force = false ) {
	if ( ! $force && get_option( 'dps_demo_seeded' ) ) {
		return false;
	}

	$hero_id   = dps_sideload_theme_image( 'hero-editorial.png', 'Studio hero' );
	$about_id  = dps_sideload_theme_image( 'about-desk.png', 'Studio desk' );
	$street_id = dps_sideload_theme_image( 'street.png', 'Downtown street' );
	$images    = array(
		'work-brand.png' => dps_sideload_theme_image( 'work-brand.png', 'Brand identity' ),
		'work-web.png'   => dps_sideload_theme_image( 'work-web.png', 'Website design' ),
		'work-print.png' => dps_sideload_theme_image( 'work-print.png', 'Print design' ),
		'work-menu.png'  => dps_sideload_theme_image( 'work-menu.png', 'Hospitality' ),
		'work-pack.png'   => dps_sideload_theme_image( 'work-pack.png', 'Packaging' ),
		'ember-kit.png'   => dps_sideload_theme_image( 'ember-kit.png', 'Ember Pie Co. kit' ),
	);

	if ( $hero_id ) {
		set_theme_mod( 'dps_hero_image', $hero_id );
	}

	$home_id = dps_upsert_page(
		'home',
		__( 'Home', 'dphilhower-studio' ),
		''
	);
	dps_upsert_page(
		'services',
		__( 'Services', 'dphilhower-studio' ),
		'',
		'page-templates/template-services.php'
	);
	$about_page = dps_upsert_page(
		'about',
		__( 'About', 'dphilhower-studio' ),
		'',
		'page-templates/template-about.php'
	);
	if ( $about_id && $about_page ) {
		set_post_thumbnail( $about_page, $about_id );
	}
	dps_upsert_page(
		'contact',
		__( 'Contact', 'dphilhower-studio' ),
		'',
		'page-templates/template-contact.php'
	);

	update_option( 'show_on_front', 'page' );
	update_option( 'page_on_front', $home_id );
	update_option( 'blogname', 'D Philhower Studio' );
	update_option( 'blogdescription', 'Graphic design and websites in the Morristown, NJ area' );
	update_option( 'timezone_string', 'America/New_York' );

	$projects = array(
		array(
			'slug'     => 'ember-pie-co',
			'title'    => 'Ember Pie Co.',
			'image'    => 'ember-kit.png',
			'excerpt'  => 'Live brand kit — window, menu, print',
			'subtitle' => 'Live brand kit — window, menu, print',
			'client'   => 'Studio sample, Morris County pie shop',
			'services' => 'Identity · menu · print · packaging',
			'year'     => '2026',
			'location' => 'Morristown / Bernardsville area',
			'content'  => '<p>Guests meet this brand in the street, in their hands, and on a screen before the first slice. The kit is the proof: one type family, one red, one cream, used everywhere it has to survive a printer and a rainy sidewalk.</p><p>This is a studio sample of how D Philhower Studio would build a local pizzeria system — not a template with a new logo dropped in.</p>',
		),
		array(
			'slug'     => 'restaurant-brand-systems',
			'title'    => 'Restaurant brand systems',
			'image'    => 'work-brand.png',
			'excerpt'  => 'Identity, menus, and storefront presence',
			'subtitle' => 'Identity, menus, and storefront presence',
			'client'   => 'Hospitality groups, Morris County',
			'services' => 'Identity · menus · signage direction',
			'year'     => '2024',
			'location' => 'Bernardsville & Morristown, NJ',
			'content'  => '<p>Hospitality brands need more than a logo. Guests meet the identity on a window, a menu, a takeout bag, and a phone screen—often in the same week.</p><h2>The work</h2><p>D Philhower Studio builds restaurant brand systems from the ground up: mark, type, color, menus, and a simple set of rules so staff and printers stay consistent. The goal is a brand that feels local and crafted, not a template retrofitted for the next dining room.</p><h2>Outcome</h2><p>A kit of files and guidelines the kitchen, front of house, and website can all share—so the food and the design pull in the same direction.</p>',
		),
		array(
			'slug'     => 'custom-website-design',
			'title'    => 'Custom website design',
			'image'    => 'work-web.png',
			'excerpt'  => 'Marketing sites for Morris County businesses',
			'subtitle' => 'Structure · visuals · responsive build',
			'client'   => 'Local service and retail brands',
			'services' => 'UX · visual design · WordPress / static build',
			'year'     => '2025',
			'location' => 'Morris County, NJ',
			'content'  => '<p>Most local sites either look like everyone else or hide the thing that makes the business worth choosing. Custom website design here starts with structure: what a visitor needs to believe, then the layout and type that make that obvious on a phone.</p><h2>The work</h2><p>Information architecture, art direction, and a responsive build that matches the identity—fast to load, easy to contact, and ready for search. WordPress when you need to edit; static when you do not.</p><h2>Outcome</h2><p>A marketing site that feels like the same studio that designed the print, not a theme with the logo dropped in.</p>',
		),
		array(
			'slug'     => 'print-and-packaging',
			'title'    => 'Print & packaging',
			'image'    => 'work-print.png',
			'excerpt'  => 'Collateral that matches the digital brand',
			'subtitle' => 'Collateral · packaging · campaigns',
			'client'   => 'Retail and food brands',
			'services' => 'Print · packaging · campaign art direction',
			'year'     => '2024',
			'location' => 'Northern New Jersey',
			'content'  => '<p>Print still does work a homepage cannot: it sits on a table, gets handed across a counter, and has to survive a printer who has never seen your Figma file.</p><h2>The work</h2><p>Brochures, posters, packaging, and campaign pieces designed for how they actually get made—paper, ink, foil, and folds included. Specs go out with the art so production is not a second design problem.</p><h2>Outcome</h2><p>Collateral that feels worth keeping, and matches what people already saw online.</p>',
		),
		array(
			'slug'     => 'hospitality-storytelling',
			'title'    => 'Hospitality storytelling',
			'image'    => 'work-menu.png',
			'excerpt'  => 'Menus, photography direction, guest touchpoints',
			'subtitle' => 'Menus · photography direction · guest touchpoints',
			'client'   => 'Independent restaurants',
			'services' => 'Menu design · art direction',
			'year'     => '2023',
			'location' => 'Morristown, NJ area',
			'content'  => '<p>A menu is a layout problem and a hospitality problem. Guests should find a dish, feel the room, and trust the price without working for it.</p><h2>The work</h2><p>Menu systems, photo direction, and the small printed pieces that sit between the door and the table. Type and hierarchy do the quiet work so the food can be loud.</p><h2>Outcome</h2><p>Touchpoints that read as one guest journey—from reservation site to check presenter.</p>',
		),
		array(
			'slug'     => 'packaging-systems',
			'title'    => 'Packaging systems',
			'image'    => 'work-pack.png',
			'excerpt'  => 'Product and package design for small makers',
			'subtitle' => 'Structure · label · unboxing',
			'client'   => 'Makers and specialty food',
			'services' => 'Packaging · label design',
			'year'     => '2025',
			'location' => 'New Jersey',
			'content'  => '<p>Packaging has to sell at arm’s length and still feel honest in someone’s kitchen. The studio designs labels, sleeves, and structural graphics that can grow from one SKU to a family.</p><h2>The work</h2><p>Dielines, print-ready art, and a simple system for flavors or sizes so the next product does not need a whole new brand.</p>',
		),
	);

	$menu_order = 0;
	foreach ( $projects as $project ) {
		$menu_order    += 10;
		$existing = get_page_by_path( $project['slug'], OBJECT, 'dps_work' );
		$postarr  = array(
			'post_type'    => 'dps_work',
			'post_status'  => 'publish',
			'post_title'   => $project['title'],
			'post_name'    => $project['slug'],
			'post_content' => $project['content'],
			'post_excerpt' => $project['excerpt'],
			'menu_order'   => $menu_order,
		);
		if ( $existing ) {
			$postarr['ID'] = $existing->ID;
			$post_id       = wp_update_post( $postarr );
		} else {
			$post_id = wp_insert_post( $postarr );
		}
		if ( ! $post_id || is_wp_error( $post_id ) ) {
			continue;
		}
		update_post_meta( $post_id, '_dps_client', $project['client'] );
		update_post_meta( $post_id, '_dps_services', $project['services'] );
		update_post_meta( $post_id, '_dps_subtitle', $project['subtitle'] );
		update_post_meta( $post_id, '_dps_year', $project['year'] );
		update_post_meta( $post_id, '_dps_location', $project['location'] );
		$thumb = isset( $images[ $project['image'] ] ) ? $images[ $project['image'] ] : 0;
		if ( $thumb ) {
			set_post_thumbnail( $post_id, $thumb );
		}
	}

	$menu_name = 'Primary';
	$menu      = wp_get_nav_menu_object( $menu_name );
	if ( ! $menu ) {
		$menu_id = wp_create_nav_menu( $menu_name );
	} else {
		$menu_id = (int) $menu->term_id;
		$items   = wp_get_nav_menu_items( $menu_id );
		if ( $items ) {
			foreach ( $items as $item ) {
				wp_delete_post( $item->ID, true );
			}
		}
	}

	$work_link = get_post_type_archive_link( 'dps_work' );
	wp_update_nav_menu_item(
		$menu_id,
		0,
		array(
			'menu-item-title'  => __( 'Work', 'dphilhower-studio' ),
			'menu-item-url'    => $work_link ? $work_link : home_url( '/work/' ),
			'menu-item-status' => 'publish',
			'menu-item-type'   => 'custom',
		)
	);

	foreach ( array( 'services' => 'Services', 'about' => 'About' ) as $slug => $label ) {
		$page = get_page_by_path( $slug );
		if ( $page ) {
			wp_update_nav_menu_item(
				$menu_id,
				0,
				array(
					'menu-item-title'     => $label,
					'menu-item-object'    => 'page',
					'menu-item-object-id' => $page->ID,
					'menu-item-type'      => 'post_type',
					'menu-item-status'    => 'publish',
				)
			);
		}
	}

	$contact = get_page_by_path( 'contact' );
	if ( $contact ) {
		wp_update_nav_menu_item(
			$menu_id,
			0,
			array(
				'menu-item-title'     => __( 'Start a project', 'dphilhower-studio' ),
				'menu-item-object'    => 'page',
				'menu-item-object-id' => $contact->ID,
				'menu-item-type'      => 'post_type',
				'menu-item-status'    => 'publish',
				'menu-item-classes'   => 'cta',
			)
		);
	}

	$locations              = get_theme_mod( 'nav_menu_locations', array() );
	$locations['primary']   = $menu_id;
	set_theme_mod( 'nav_menu_locations', $locations );

	update_option( 'permalink_structure', '/%postname%/' );
	flush_rewrite_rules();

	update_option( 'dps_demo_seeded', DPS_VERSION );
	update_option( 'dps_images_version', 'png-native-1' );
	return true;
}

if ( defined( 'WP_CLI' ) && WP_CLI ) {
	WP_CLI::add_command(
		'dps seed',
		function () {
			dps_seed_demo_content( true );
			WP_CLI::success( 'D Philhower Studio demo content seeded.' );
		}
	);
}
