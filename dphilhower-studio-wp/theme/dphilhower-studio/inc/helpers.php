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
		<li><a href="<?php echo esc_url( $work_url ); ?>"><?php esc_html_e( 'Work', 'dphilhower-studio' ); ?></a></li>
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
