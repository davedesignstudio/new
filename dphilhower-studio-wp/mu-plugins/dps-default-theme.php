<?php
/**
 * Plugin Name: D Philhower Studio Defaults
 * Description: Uses the D Philhower Studio theme as the default after WordPress is installed.
 * Version: 1.0.0
 * Author: D Philhower Studio
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Switch to the studio theme once WordPress is installed.
 */
function dps_maybe_activate_default_theme() {
	if ( get_option( 'dps_default_theme_applied' ) ) {
		return;
	}
	if ( ! function_exists( 'is_blog_installed' ) || ! is_blog_installed() ) {
		return;
	}
	$theme = wp_get_theme( 'dphilhower-studio' );
	if ( ! $theme->exists() ) {
		return;
	}
	if ( get_stylesheet() !== 'dphilhower-studio' ) {
		switch_theme( 'dphilhower-studio' );
	}
	update_option( 'dps_default_theme_applied', '1' );
}
add_action( 'init', 'dps_maybe_activate_default_theme', 1 );
