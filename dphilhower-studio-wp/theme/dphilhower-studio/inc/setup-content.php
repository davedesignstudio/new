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
		'ember-kit.png'          => dps_sideload_theme_image( 'ember-kit.png', 'Ember Pie Co. kit' ),
		'bville-hero.png'          => dps_sideload_theme_image( 'bville-hero.png', 'Bville Pizza & Grill' ),
		'bville-print-window.png'  => dps_sideload_theme_image( 'bville-print-window.png', 'Bville window study' ),
		'ritual-hero.png'        => dps_sideload_theme_image( 'ritual-hero.png', 'The Ritual Café' ),
		'magicbuds-hero.png'     => dps_sideload_theme_image( 'magicbuds-hero.png', 'Magic Buds' ),
		'cowlick-hero.png'       => dps_sideload_theme_image( 'cowlick-hero.png', 'Cow Lick' ),
		'sthills-hero.png'       => dps_sideload_theme_image( 'sthills-hero.png', 'Service The Hills' ),
		'bvdeli-hero.png'        => dps_sideload_theme_image( 'bvdeli-hero.png', 'Bernardsville Deli' ),
		'pok-hero.png'           => dps_sideload_theme_image( 'pok-hero.png', 'Philhower & O’Krogly' ),
		'cafe-robust-hero.png'   => dps_sideload_theme_image( 'cafe-robust-hero.png', 'Cafe Robust' ),
		'expresso-hero.png'      => dps_sideload_theme_image( 'expresso-hero.png', 'EXPresso' ),
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
	update_option( 'blogdescription', 'Graphic design for restaurants in Morris County, NJ' );
	update_option( 'timezone_string', 'America/New_York' );

	$projects = array(
		array(
			'slug'     => 'pattern-studies',
			'title'    => 'Fifteen pattern studies',
			'image'    => 'bville-print-window.png',
			'excerpt'  => 'Print pulled from the uploaded marks',
			'subtitle' => 'Print pulled from the uploaded marks',
			'client'   => 'Studio studies from six uploaded identities',
			'services' => 'Identity · print · packaging',
			'year'     => '2026',
			'location' => 'Morris County, NJ',
			'content'  => '<p>Each piece takes a rule already in the logo — the color split, the cup from above, the sticker halo, the saw blade, the B flourish, the gold script — and puts it on something a guest actually holds.</p><p>These are studio studies, not live jobs. The marks stay themselves. Print is how they leave the building.</p>',
		),
		array(
			'slug'     => 'ember-pie-co',
			'title'    => 'Ember Pie Co.',
			'image'    => 'ember-kit.png',
			'excerpt'  => 'Live brand kit — window · menu · print',
			'subtitle' => 'Live brand kit — window · menu · print',
			'client'   => 'Morris County pie shop',
			'services' => 'Identity · menu · print · packaging',
			'year'     => '2026',
			'location' => 'Morristown / Bernardsville area',
			'content'  => '<p>Guests meet this brand in the street, in their hands, and on a screen before the first slice. The kit is the proof: one type family, one red, one cream, used everywhere it has to survive a printer and a rainy sidewalk.</p><p>One type family, one red, one cream — built the way a Morris County pie shop actually prints, not a template with a new logo dropped in.</p>',
		),
		array(
			'slug'     => 'bville-pizza-grill',
			'title'    => 'Bville Pizza & Grill',
			'image'    => 'bville-hero.png',
			'excerpt'  => 'In-house design, Bernardsville, 2018–2021',
			'subtitle' => 'In-house design, Bernardsville, 2018–2021',
			'client'   => 'Bville Pizza & Grill',
			'services' => 'In-house graphic designer · branding · menus · websites',
			'year'     => '2018–2021',
			'location' => 'Bernardsville, NJ',
			'content'  => '<p>David was the graphic designer at Bville Pizza &amp; Grill from 2018 to 2021: branding, menus, and the website. This is the lockup from that work — orange B, green ville, gold edge, two swooshes on slate — used as the logo with no redraw.</p><p>Locals already shorten Bernardsville to Bville. The orange B is appetite and oven heat from the lot. Ville sits in forest green so the town and the grill are in the name, not a second pizza red. No clipart pizza: the food is inside the box.</p>',
		),
		array(
			'slug'     => 'ritual-cafe',
			'title'    => 'The Ritual Café',
			'image'    => 'ritual-hero.png',
			'excerpt'  => 'Coffee as a pause, not a rush',
			'subtitle' => 'Coffee as a pause, not a rush',
			'client'   => 'Morristown café',
			'services' => 'Identity · menu · packaging · print',
			'year'     => '2025',
			'location' => 'Morristown, NJ',
			'content'  => '<p>The daily cup is supposed to feel like a ritual. Black, cream, kraft, and gold — a board you can read before you order, and a mark that survives a sleeve.</p><p>The circular logo is a cup seen from above, the ring broken like a pause. Serif for THE RITUAL CAFÉ because this is tradition, not a startup. Gold on the slate board sets hierarchy: category, item, quiet italic ingredients, prices in a column.</p>',
		),
		array(
			'slug'     => 'bernardsville-deli',
			'title'    => 'Bernardsville Deli & Grocery',
			'image'    => 'bvdeli-hero.png',
			'excerpt'  => 'Warm deli, cool grocery',
			'subtitle' => 'Warm deli, cool grocery',
			'client'   => 'Bernardsville deli and grocery',
			'services' => 'Identity · wrap · in-store print',
			'year'     => '2024',
			'location' => 'Bernardsville, NJ',
			'content'  => '<p>Two businesses, one town name. Warm gradients for food you eat now, blue for the aisle you shop later.</p><p>Deli in orange-to-pink is appetite. Bernardsville gets the long B flourish — a signature, family-owned, large enough to survive crumpled paper. The blue line is a horizon between the counter and the grocery.</p>',
		),
		array(
			'slug'     => 'cow-lick',
			'title'    => 'Cow Lick',
			'image'    => 'cowlick-hero.png',
			'excerpt'  => 'A joke you can print',
			'subtitle' => 'A joke you can print',
			'client'   => 'ice cream shop',
			'services' => 'Identity · packaging · window',
			'year'     => '2025',
			'location' => 'Morris County, NJ',
			'content'  => '<p>The cow licks. That is the brief. If the drawing is not funny, the name is just two words.</p><p>The tongue is literal so you remember it. A thick sticker halo exists so the same die-cut can live on a pint, a window, and a freezer door. Chocolate-to-tan type reads as ice cream, not a farm NGO.</p>',
		),
		array(
			'slug'     => 'service-the-hills',
			'title'    => 'Service The Hills',
			'image'    => 'sthills-hero.png',
			'excerpt'  => 'The tool, not the column',
			'subtitle' => 'The tool, not the column',
			'client'   => 'Hills renovation firm',
			'services' => 'Identity · signage · stationery',
			'year'     => '2024',
			'location' => 'Bernardsville / Far Hills, NJ',
			'content'  => '<p>The Hills already looks like money. The mark had to hold grit and glamour: a saw blade in bronze, not a colonial seal in navy.</p><p>The blade is the tool — precision, wood, the work. Bronze instead of hazard orange elevates a contractor to a studio the house can live with on the lawn. Serif SERVICE is authority. Script The Hills is the place.</p>',
		),
		array(
			'slug'     => 'magic-buds',
			'title'    => 'Magic Buds',
			'image'    => 'magicbuds-hero.png',
			'excerpt'  => 'Sleep without the circus',
			'subtitle' => 'Sleep without the circus',
			'client'   => 'wellness brand',
			'services' => 'Identity · packaging · retail print',
			'year'     => '2026',
			'location' => 'Northern New Jersey',
			'content'  => '<p>Sleep is the product. The photograph sells the result; the label has to feel calm and expensive — not like a party and not like a clinic.</p><p>High-key white is trust and quiet. Deep purple is night without looking like a head shop. There is no cannabis leaf: this is rest. Gold on purple is the only luxury move.</p>',
		),
		array(
			'slug'     => 'philhower-okrogly',
			'title'    => 'Philhower & O’Krogly',
			'image'    => 'pok-hero.png',
			'excerpt'  => 'The 2025 embroidery is the lockup',
			'subtitle' => 'The 2025 embroidery is the lockup',
			'client'   => 'design-build',
			'services' => 'Identity · embroidery · vehicle · signage',
			'year'     => '2025',
			'location' => 'Northern New Jersey',
			'content'  => '<p>The mark that goes on the shirt is the mark. Gothic gold in a blue diamond, Philhower &amp; O’Krogly in gold serif, Design + Build in the same formal script as The Hills, (908)-581-5385. That is the 2025 embroidery file — one lockup, used as the logo, not redrawn for the van or the lawn.</p><p>Black is the field so gold thread reads on a polo. Blue is only the diamond. Hazard orange would make it a cone. The phone is in the lockup because a design-build crew is called, not scanned.</p>',
		),
		array(
			'slug'     => 'cafe-robust',
			'title'    => 'Cafe Robust',
			'image'    => 'cafe-robust-hero.png',
			'excerpt'  => 'The board you read before you order',
			'subtitle' => 'The board you read before you order',
			'client'   => 'neighborhood coffee shop',
			'services' => 'Identity · menu · packaging · window',
			'year'     => '2026',
			'location' => 'Morris County, NJ',
			'content'  => '<p>A chalkboard that tries to look handmade usually looks cheap. This one is drawn as a sign: gold filigree, a cup from above, and a list you can read from the door.</p><p>The circular CR mark is the drink seen from above. Cups and the window carry the same seal so the board is not a one-off poster.</p>',
		),
		array(
			'slug'     => 'expresso',
			'title'    => 'EXPresso',
			'image'    => 'expresso-hero.png',
			'excerpt'  => 'The pour is the mark',
			'subtitle' => 'The pour is the mark',
			'client'   => 'espresso brand',
			'services' => 'Identity · packaging · window',
			'year'     => '2026',
			'location' => 'Northern New Jersey',
			'content'  => '<p>The name is a pun you can see. EX sits left of the cup, Presso sits right, and the pour is the hyphen. Yellow on roasted beans is the only loud color.</p><p>The coaster is the same lockup, round: EX, the pour, Presso — not a generic Coffee word-cloud. Window and bag keep the yellow so takeaway still reads as EXPresso.</p>',
		),
	);

	foreach ( array( 'restaurant-brand-systems', 'custom-website-design', 'print-and-packaging', 'hospitality-storytelling', 'packaging-systems' ) as $old_slug ) {
		$old = get_page_by_path( $old_slug, OBJECT, 'dps_work' );
		if ( $old ) {
			wp_delete_post( $old->ID, true );
		}
	}

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
	update_option( 'dps_images_version', 'brands-print-7' );
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
