<?php
/**
 * Shared helpers.
 *
 * @package DPhilhowerStudio
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Theme image URL.
 *
 * @param string $file File name in assets/images.
 * @return string
 */
function dps_image_url( $file ) {
	return DPS_URI . '/assets/images/' . ltrim( $file, '/' );
}

/**
 * Theme image filesystem path.
 *
 * @param string $file File name.
 * @return string
 */
function dps_image_path( $file ) {
	return DPS_DIR . '/assets/images/' . ltrim( $file, '/' );
}

/**
 * Customizer / option string with fallback.
 *
 * @param string $mod     Theme mod key.
 * @param string $default Default.
 * @return string
 */
function dps_mod( $mod, $default = '' ) {
	$value = get_theme_mod( $mod, $default );
	return ( is_string( $value ) && '' !== $value ) ? $value : $default;
}

/**
 * Studio email.
 *
 * @return string
 */
function dps_contact_email() {
	return sanitize_email( dps_mod( 'dps_email', 'hello@dphilhower.com' ) );
}

/**
 * Primary navigation with a designed fallback.
 */
function dps_primary_nav() {
	if ( has_nav_menu( 'primary' ) ) {
		wp_nav_menu(
			array(
				'theme_location' => 'primary',
				'container'      => false,
				'menu_class'     => 'nav',
				'menu_id'        => 'site-nav',
				'fallback_cb'    => false,
				'depth'          => 1,
			)
		);
		return;
	}

	$work_url = get_post_type_archive_link( 'dps_work' );
	if ( ! $work_url ) {
		$work_url = home_url( '/work/' );
	}
	?>
	<ul class="nav" id="site-nav">
		<li><a href="<?php echo esc_url( $work_url ); ?>"><?php esc_html_e( 'Brands', 'dphilhower-studio' ); ?></a></li>
		<li><a href="<?php echo esc_url( home_url( '/services/' ) ); ?>"><?php esc_html_e( 'Services', 'dphilhower-studio' ); ?></a></li>
		<li><a href="<?php echo esc_url( home_url( '/about/' ) ); ?>"><?php esc_html_e( 'About', 'dphilhower-studio' ); ?></a></li>
		<li class="cta"><a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"><?php esc_html_e( 'Start a project', 'dphilhower-studio' ); ?></a></li>
	</ul>
	<?php
}

/**
 * Work subtitle from meta or excerpt.
 *
 * @param int $post_id Post ID.
 * @return string
 */
function dps_work_subtitle( $post_id = 0 ) {
	$post_id = $post_id ? $post_id : get_the_ID();
	$meta    = get_post_meta( $post_id, '_dps_subtitle', true );
	if ( $meta ) {
		return $meta;
	}
	$services = get_post_meta( $post_id, '_dps_services', true );
	if ( $services ) {
		return $services;
	}
	return wp_trim_words( get_the_excerpt( $post_id ), 12, '' );
}

/**
 * Hospitality-first brand order for the homepage grid.
 *
 * @return string[]
 */
function dps_work_home_slugs() {
	return array(
		'bville-pizza-grill',
		'cala',
		'ember-pie-co',
		'cafe-robust',
		'ritual-cafe',
		'expresso',
		'bernardsville-deli',
		'cow-lick',
	);
}

/**
 * Full Brands archive: rooms and food first, then the rest of the marks.
 *
 * @return string[]
 */
function dps_work_archive_slugs() {
	return array_merge(
		dps_work_home_slugs(),
		array(
			'service-the-hills',
			'philhower-okrogly',
			'magic-buds',
			'fitness-kick-boxing',
			'pattern-studies',
		)
	);
}

/**
 * Card stills that match the restaurant story. Case heroes stay the lockups.
 *
 * @return array<string, array{file:string, alt:string}>
 */
function dps_work_card_stills() {
	return array(
		'bville-pizza-grill' => array(
			'file' => 'bville-field-glass.png',
			'alt'  => __( 'Bville Pizza & Grill dusk window with the lockup on glass', 'dphilhower-studio' ),
		),
		'cala'               => array(
			'file' => 'cala-print-window.png',
			'alt'  => __( 'Whitewashed Cala storefront at dusk with the terracotta arch on glass', 'dphilhower-studio' ),
		),
		'ember-pie-co'       => array(
			'file' => 'ember-window-after.png',
			'alt'  => __( 'Pizza shop storefront with a gold window mark at dusk', 'dphilhower-studio' ),
		),
		'cafe-robust'        => array(
			'file' => 'cafe-robust-field-cups.png',
			'alt'  => __( 'Cafe Robust cups and House Blend bag on a cafe counter', 'dphilhower-studio' ),
		),
		'ritual-cafe'        => array(
			'file' => 'ritual-print-cups.png',
			'alt'  => __( 'Ritual Café cups and kraft bag on a cafe counter', 'dphilhower-studio' ),
		),
		'expresso'           => array(
			'file' => 'expresso-hero.png',
			'alt'  => __( 'EXPresso yellow wordmark and pouring cup', 'dphilhower-studio' ),
		),
		'bernardsville-deli' => array(
			'file' => 'bvdeli-print-cup.png',
			'alt'  => __( 'Bernardsville Deli paper cup with the stacked wordmark', 'dphilhower-studio' ),
		),
		'cow-lick'           => array(
			'file' => 'cowlick-field-freezer.png',
			'alt'  => __( 'Cow Lick freezer door with the cow mark and pints behind the glass', 'dphilhower-studio' ),
		),
		'service-the-hills'  => array(
			'file' => 'sthills-hero.png',
			'alt'  => __( 'Service The Hills bronze saw-blade mark', 'dphilhower-studio' ),
		),
		'magic-buds'         => array(
			'file' => 'magicbuds-hero.png',
			'alt'  => __( 'Magic Buds sleep lifestyle packaging', 'dphilhower-studio' ),
		),
		'philhower-okrogly'  => array(
			'file' => 'pok-hero.png',
			'alt'  => __( 'Philhower & O’Krogly saw-blade lockup: Design + Build', 'dphilhower-studio' ),
		),
		'fitness-kick-boxing' => array(
			'file' => 'kickbox-hero.png',
			'alt'  => __( 'Fitness Kick Boxing trial poster: punch, Trial, 3 classes, free gloves', 'dphilhower-studio' ),
		),
		'pattern-studies'    => array(
			'file' => 'ember-print-box.png',
			'alt'  => __( 'Kraft pizza box stamped from the uploaded marks', 'dphilhower-studio' ),
		),
	);
}

/**
 * Work-card image URL.
 *
 * @param int $post_id Post ID.
 * @return string
 */
function dps_work_card_src( $post_id = 0 ) {
	$post_id = $post_id ? $post_id : get_the_ID();
	$slug    = get_post_field( 'post_name', $post_id );
	$stills  = dps_work_card_stills();
	if ( isset( $stills[ $slug ] ) ) {
		return dps_image_url( $stills[ $slug ]['file'] );
	}
	$thumb = get_the_post_thumbnail_url( $post_id, 'full' );
	return $thumb ? $thumb : dps_image_url( 'ember-window-after.png' );
}

/**
 * Work-card alt text.
 *
 * @param int $post_id Post ID.
 * @return string
 */
function dps_work_card_alt( $post_id = 0 ) {
	$post_id = $post_id ? $post_id : get_the_ID();
	$slug    = get_post_field( 'post_name', $post_id );
	$stills  = dps_work_card_stills();
	if ( isset( $stills[ $slug ] ) ) {
		return $stills[ $slug ]['alt'];
	}
	return get_the_title( $post_id );
}

/**
 * Case-hero stills that prefer the room over the lockup plate.
 *
 * @return array<string, array{file:string, alt:string}>
 */
function dps_work_hero_stills() {
	return array(
		'bville-pizza-grill' => array(
			'file' => 'bville-field-glass.png',
			'alt'  => __( 'Bville Pizza & Grill dusk storefront with the lockup on glass', 'dphilhower-studio' ),
		),
		'cala'               => array(
			'file' => 'cala-hero.png',
			'alt'  => __( 'Cala lockup on limewashed plaster with terracotta arch, cream wordmark, and the sea beyond', 'dphilhower-studio' ),
		),
		'cow-lick'           => array(
			'file' => 'cowlick-field-freezer.png',
			'alt'  => __( 'Cow Lick freezer door with the cow mark and pints behind the glass', 'dphilhower-studio' ),
		),
	);
}

/**
 * Case-hero image URL.
 *
 * @param int $post_id Post ID.
 * @return string
 */
function dps_work_hero_src( $post_id = 0 ) {
	$post_id = $post_id ? $post_id : get_the_ID();
	$slug    = get_post_field( 'post_name', $post_id );
	$heroes  = dps_work_hero_stills();
	if ( isset( $heroes[ $slug ] ) ) {
		return dps_image_url( $heroes[ $slug ]['file'] );
	}
	$thumb = get_the_post_thumbnail_url( $post_id, 'full' );
	return $thumb ? $thumb : dps_work_card_src( $post_id );
}

/**
 * Case-hero alt text.
 *
 * @param int $post_id Post ID.
 * @return string
 */
function dps_work_hero_alt( $post_id = 0 ) {
	$post_id = $post_id ? $post_id : get_the_ID();
	$slug    = get_post_field( 'post_name', $post_id );
	$heroes  = dps_work_hero_stills();
	if ( isset( $heroes[ $slug ] ) ) {
		return $heroes[ $slug ]['alt'];
	}
	return get_the_title( $post_id );
}

/**
 * Keep the Brands archive in hospitality-first order.
 *
 * @param WP_Query $query Query.
 */
function dps_order_work_archive( $query ) {
	if ( is_admin() || ! $query->is_main_query() || ! $query->is_post_type_archive( 'dps_work' ) ) {
		return;
	}
	$ids = array();
	foreach ( dps_work_archive_slugs() as $slug ) {
		$item = get_page_by_path( $slug, OBJECT, 'dps_work' );
		if ( $item ) {
			$ids[] = $item->ID;
		}
	}
	if ( $ids ) {
		$query->set( 'post__in', $ids );
		$query->set( 'orderby', 'post__in' );
		$query->set( 'posts_per_page', count( $ids ) );
	}
}
add_action( 'pre_get_posts', 'dps_order_work_archive' );
