<?php
/**
 * Portfolio custom post type.
 *
 * @package DPhilhowerStudio
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register Work CPT.
 */
function dps_register_cpt() {
	$labels = array(
		'name'               => __( 'Work', 'dphilhower-studio' ),
		'singular_name'      => __( 'Project', 'dphilhower-studio' ),
		'add_new'            => __( 'Add Project', 'dphilhower-studio' ),
		'add_new_item'       => __( 'Add New Project', 'dphilhower-studio' ),
		'edit_item'          => __( 'Edit Project', 'dphilhower-studio' ),
		'new_item'           => __( 'New Project', 'dphilhower-studio' ),
		'view_item'          => __( 'View Project', 'dphilhower-studio' ),
		'search_items'       => __( 'Search Work', 'dphilhower-studio' ),
		'not_found'          => __( 'No projects found', 'dphilhower-studio' ),
		'not_found_in_trash' => __( 'No projects in trash', 'dphilhower-studio' ),
		'all_items'          => __( 'All Work', 'dphilhower-studio' ),
		'menu_name'          => __( 'Work', 'dphilhower-studio' ),
	);

	register_post_type(
		'dps_work',
		array(
			'labels'              => $labels,
			'public'              => true,
			'has_archive'         => true,
			'rewrite'             => array(
				'slug'       => 'work',
				'with_front' => false,
			),
			'menu_icon'           => 'dashicons-art',
			'supports'            => array( 'title', 'editor', 'excerpt', 'thumbnail' ),
			'show_in_rest'        => true,
			'exclude_from_search' => false,
		)
	);
}
add_action( 'init', 'dps_register_cpt' );

/**
 * Project meta boxes.
 */
function dps_work_meta_boxes() {
	add_meta_box(
		'dps_work_details',
		__( 'Project details', 'dphilhower-studio' ),
		'dps_work_meta_box_html',
		'dps_work',
		'side',
		'high'
	);
}
add_action( 'add_meta_boxes', 'dps_work_meta_boxes' );

/**
 * Meta box markup.
 *
 * @param WP_Post $post Post.
 */
function dps_work_meta_box_html( $post ) {
	wp_nonce_field( 'dps_work_meta', 'dps_work_meta_nonce' );
	$fields = array(
		'_dps_client'   => __( 'Client', 'dphilhower-studio' ),
		'_dps_services' => __( 'Services', 'dphilhower-studio' ),
		'_dps_subtitle' => __( 'Card subtitle', 'dphilhower-studio' ),
		'_dps_year'     => __( 'Year', 'dphilhower-studio' ),
		'_dps_location' => __( 'Location', 'dphilhower-studio' ),
	);
	foreach ( $fields as $key => $label ) {
		$value = get_post_meta( $post->ID, $key, true );
		printf(
			'<p><label for="%1$s">%2$s</label><br><input type="text" class="widefat" id="%1$s" name="%1$s" value="%3$s"></p>',
			esc_attr( $key ),
			esc_html( $label ),
			esc_attr( $value )
		);
	}
}

/**
 * Save project meta.
 *
 * @param int $post_id Post ID.
 */
function dps_save_work_meta( $post_id ) {
	if ( ! isset( $_POST['dps_work_meta_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['dps_work_meta_nonce'] ) ), 'dps_work_meta' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	$keys = array( '_dps_client', '_dps_services', '_dps_subtitle', '_dps_year', '_dps_location' );
	foreach ( $keys as $key ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta( $post_id, $key, sanitize_text_field( wp_unslash( $_POST[ $key ] ) ) );
		}
	}
}
add_action( 'save_post_dps_work', 'dps_save_work_meta' );
