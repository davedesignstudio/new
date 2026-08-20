<?php
/**
 * Theme customizer.
 *
 * @package DPhilhowerStudio
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register customizer settings.
 *
 * @param WP_Customize_Manager $wp_customize Customizer.
 */
function dps_customize_register( $wp_customize ) {
	$wp_customize->add_section(
		'dps_studio',
		array(
			'title'    => __( 'Studio details', 'dphilhower-studio' ),
			'priority' => 30,
		)
	);

	$fields = array(
		'dps_email'        => array(
			'label'   => __( 'Contact email', 'dphilhower-studio' ),
			'default' => 'hello@dphilhower.com',
			'type'    => 'email',
		),
		'dps_phone'        => array(
			'label'   => __( 'Phone (optional)', 'dphilhower-studio' ),
			'default' => '',
			'type'    => 'text',
		),
		'dps_location'     => array(
			'label'   => __( 'Location', 'dphilhower-studio' ),
			'default' => 'Morristown, NJ area',
			'type'    => 'text',
		),
		'dps_hero_title'   => array(
			'label'   => __( 'Hero title', 'dphilhower-studio' ),
			'default' => 'D Philhower Studio',
			'type'    => 'text',
		),
		'dps_hero_line'    => array(
			'label'   => __( 'Hero headline', 'dphilhower-studio' ),
			'default' => 'Graphic design and websites that feel like one system.',
			'type'    => 'textarea',
		),
		'dps_hero_support' => array(
			'label'   => __( 'Hero support copy', 'dphilhower-studio' ),
			'default' => 'A design studio serving Morristown and the surrounding Morris County area—identity, print, and custom web for local brands that want to look intentional.',
			'type'    => 'textarea',
		),
	);

	foreach ( $fields as $id => $field ) {
		$wp_customize->add_setting(
			$id,
			array(
				'default'           => $field['default'],
				'sanitize_callback' => 'email' === $field['type'] ? 'sanitize_email' : 'sanitize_text_field',
				'transport'         => 'refresh',
			)
		);
		$wp_customize->add_control(
			$id,
			array(
				'label'   => $field['label'],
				'section' => 'dps_studio',
				'type'    => $field['type'],
			)
		);
	}

	$wp_customize->add_setting( 'dps_hero_image', array( 'sanitize_callback' => 'absint' ) );
	$wp_customize->add_control(
		new WP_Customize_Media_Control(
			$wp_customize,
			'dps_hero_image',
			array(
				'label'     => __( 'Hero image', 'dphilhower-studio' ),
				'section'   => 'dps_studio',
				'mime_type' => 'image',
			)
		)
	);
}
add_action( 'customize_register', 'dps_customize_register' );
