<?php
/**
 * WooCommerce pickup orders → kitchen printer.
 *
 * @package DPhilhowerStudio
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once DPS_DIR . '/inc/kitchen-ticket.php';

/**
 * WooCommerce support and order hooks.
 */
function dps_woocommerce_setup() {
	add_theme_support( 'woocommerce' );
}
add_action( 'after_setup_theme', 'dps_woocommerce_setup' );

/**
 * Printer settings. File spool until a restaurant printer host is saved.
 *
 * @param WP_Customize_Manager $wp_customize Customizer.
 */
function dps_kitchen_customize_register( $wp_customize ) {
	$wp_customize->add_section(
		'dps_kitchen',
		array(
			'title'    => __( 'Kitchen printer', 'dphilhower-studio' ),
			'priority' => 35,
		)
	);

	$wp_customize->add_setting(
		'dps_printer_transport',
		array(
			'default'           => 'file',
			'sanitize_callback' => 'dps_sanitize_printer_transport',
		)
	);
	$wp_customize->add_control(
		'dps_printer_transport',
		array(
			'label'   => __( 'How tickets are sent', 'dphilhower-studio' ),
			'section' => 'dps_kitchen',
			'type'    => 'select',
			'choices' => array(
				'file' => __( 'Save a ticket file (no printer yet)', 'dphilhower-studio' ),
				'tcp'  => __( 'Restaurant printer on the network (port 9100)', 'dphilhower-studio' ),
			),
		)
	);

	$wp_customize->add_setting(
		'dps_printer_host',
		array(
			'default'           => '',
			'sanitize_callback' => 'sanitize_text_field',
		)
	);
	$wp_customize->add_control(
		'dps_printer_host',
		array(
			'label'       => __( 'Printer address', 'dphilhower-studio' ),
			'description' => __( 'IP or hostname of the receipt printer at the restaurant. Used when tickets are sent over the network.', 'dphilhower-studio' ),
			'section'     => 'dps_kitchen',
			'type'        => 'text',
		)
	);

	$wp_customize->add_setting(
		'dps_printer_port',
		array(
			'default'           => 9100,
			'sanitize_callback' => 'absint',
		)
	);
	$wp_customize->add_control(
		'dps_printer_port',
		array(
			'label'   => __( 'Printer port', 'dphilhower-studio' ),
			'section' => 'dps_kitchen',
			'type'    => 'number',
		)
	);
}
add_action( 'customize_register', 'dps_kitchen_customize_register' );

/**
 * @param string $value Transport.
 * @return string
 */
function dps_sanitize_printer_transport( $value ) {
	return in_array( $value, array( 'file', 'tcp' ), true ) ? $value : 'file';
}

/**
 * @param string $order_number Order number for the spool filename.
 * @return array
 */
function dps_kitchen_printer_config( $order_number = '' ) {
	$transport = get_theme_mod( 'dps_printer_transport', 'file' );
	$uploads   = wp_upload_dir();
	$spool     = empty( $uploads['error'] ) ? $uploads['basedir'] . '/dps-kitchen' : sys_get_temp_dir() . '/dps-kitchen';
	$config    = array(
		'transport'    => dps_sanitize_printer_transport( $transport ),
		'host'         => (string) get_theme_mod( 'dps_printer_host', '' ),
		'port'         => (int) get_theme_mod( 'dps_printer_port', 9100 ),
		'spool_dir'    => $spool,
		'order_number' => (string) $order_number,
		'timeout'      => 3,
	);
	return apply_filters( 'dps_kitchen_printer_config', $config, $order_number );
}

/**
 * Create the Order page once.
 */
function dps_ensure_order_page() {
	if ( 'dphilhower-studio' !== get_stylesheet() ) {
		return;
	}
	if ( get_page_by_path( 'order' ) ) {
		return;
	}
	$id = wp_insert_post(
		array(
			'post_title'  => __( 'Order', 'dphilhower-studio' ),
			'post_name'   => 'order',
			'post_status' => 'publish',
			'post_type'   => 'page',
			'post_content'=> '',
		)
	);
	if ( $id && ! is_wp_error( $id ) ) {
		update_post_meta( $id, '_wp_page_template', 'page-templates/template-order.php' );
	}
}
add_action( 'init', 'dps_ensure_order_page', 30 );

/**
 * Seed virtual WooCommerce products from the sample menu.
 */
function dps_seed_wc_menu() {
	if ( ! class_exists( 'WC_Product_Simple' ) || ! function_exists( 'wc_get_product_id_by_sku' ) ) {
		return;
	}
	if ( 'ember-1' === get_option( 'dps_wc_menu_seeded' ) ) {
		return;
	}
	$cat_ids = array();
	foreach ( dps_sample_menu_catalog() as $sku => $item ) {
		$cat = $item['category'];
		if ( ! isset( $cat_ids[ $cat ] ) ) {
			$term = term_exists( $cat, 'product_cat' );
			if ( ! $term ) {
				$term = wp_insert_term( $cat, 'product_cat' );
			}
			$cat_ids[ $cat ] = is_array( $term ) ? (int) $term['term_id'] : 0;
		}
		if ( wc_get_product_id_by_sku( $sku ) ) {
			continue;
		}
		$product = new WC_Product_Simple();
		$product->set_name( $item['name'] );
		$product->set_sku( $sku );
		$product->set_regular_price( (string) $item['price'] );
		$product->set_virtual( true );
		$product->set_sold_individually( false );
		$product->set_catalog_visibility( 'visible' );
		if ( $cat_ids[ $cat ] ) {
			$product->set_category_ids( array( $cat_ids[ $cat ] ) );
		}
		$product->save();
	}
	update_option( 'dps_wc_menu_seeded', 'ember-1' );
}
add_action( 'init', 'dps_seed_wc_menu', 40 );

/**
 * Ready window on the WooCommerce checkout.
 *
 * @param WC_Checkout $checkout Checkout.
 */
function dps_checkout_ready_field( $checkout ) {
	woocommerce_form_field(
		'dps_ready_window',
		array(
			'type'        => 'text',
			'label'       => __( 'Ready window', 'dphilhower-studio' ),
			'placeholder' => __( '6:30 PM', 'dphilhower-studio' ),
			'required'    => false,
		),
		$checkout->get_value( 'dps_ready_window' )
	);
}
add_action( 'woocommerce_after_order_notes', 'dps_checkout_ready_field' );

/**
 * @param int $order_id Order ID.
 */
function dps_checkout_save_ready( $order_id ) {
	if ( ! isset( $_POST['dps_ready_window'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing
		return;
	}
	$order = wc_get_order( $order_id );
	if ( ! $order ) {
		return;
	}
	$order->update_meta_data( '_dps_ready_window', sanitize_text_field( wp_unslash( $_POST['dps_ready_window'] ) ) );
	$order->save();
}
add_action( 'woocommerce_checkout_update_order_meta', 'dps_checkout_save_ready' );

/**
 * Map a WooCommerce order onto a kitchen ticket.
 *
 * @param WC_Order $order Order.
 * @return array
 */
function dps_wc_order_to_ticket( $order ) {
	$items = array();
	foreach ( $order->get_items() as $item ) {
		$items[] = array(
			'name'  => $item->get_name(),
			'qty'   => (int) $item->get_quantity(),
			'price' => (float) $order->get_item_total( $item, false, true ),
		);
	}
	$created = $order->get_date_created();
	$when    = $created ? $created->setTimezone( new DateTimeZone( 'America/New_York' ) )->format( 'M j, g:i A' ) : '';
	return array(
		'restaurant'  => 'Ember Pie Co.',
		'number'      => (string) $order->get_order_number(),
		'placed_at'   => $when,
		'guest'       => trim( $order->get_formatted_billing_full_name() ),
		'phone'       => (string) $order->get_billing_phone(),
		'fulfillment' => 'Pickup',
		'ready'       => (string) $order->get_meta( '_dps_ready_window' ),
		'note'        => (string) $order->get_customer_note(),
		'items'       => $items,
	);
}

/**
 * Send the ticket once. Later status changes do not print again unless forced.
 *
 * @param int  $order_id Order ID.
 * @param bool $force    Reprint.
 */
function dps_wc_print_new_order( $order_id, $force = false ) {
	if ( ! function_exists( 'wc_get_order' ) ) {
		return;
	}
	$order = wc_get_order( $order_id );
	if ( ! $order ) {
		return;
	}
	if ( ! $force && $order->get_meta( '_dps_kitchen_printed' ) ) {
		return;
	}
	$status = $order->get_status();
	if ( ! $force && ! in_array( $status, array( 'processing', 'completed' ), true ) ) {
		return;
	}
	$ticket = dps_wc_order_to_ticket( $order );
	$plain  = dps_kitchen_ticket_plain( $ticket );
	$result = dps_kitchen_print_send( dps_kitchen_ticket_escpos( $ticket ), dps_kitchen_printer_config( $order->get_order_number() ) );
	$order->update_meta_data( '_dps_kitchen_ticket_plain', $plain );
	if ( ! empty( $result['ok'] ) ) {
		$order->update_meta_data( '_dps_kitchen_printed', gmdate( 'c' ) );
		$order->add_order_note( __( 'Kitchen ticket sent to the restaurant printer.', 'dphilhower-studio' ) );
	} else {
		$order->add_order_note(
			sprintf(
				/* translators: %s printer error */
				__( 'Kitchen printer did not receive the ticket: %s', 'dphilhower-studio' ),
				isset( $result['error'] ) ? $result['error'] : ''
			)
		);
	}
	$order->save();
}
add_action( 'woocommerce_checkout_order_processed', 'dps_wc_print_new_order', 20, 1 );
add_action( 'woocommerce_order_status_processing', 'dps_wc_print_new_order', 20, 1 );
add_action( 'woocommerce_order_status_completed', 'dps_wc_print_new_order', 20, 1 );

/**
 * @param array $actions Order actions.
 * @return array
 */
function dps_order_reprint_action( $actions ) {
	$actions['dps_reprint_kitchen'] = __( 'Send ticket to kitchen printer', 'dphilhower-studio' );
	return $actions;
}
add_filter( 'woocommerce_order_actions', 'dps_order_reprint_action' );

/**
 * @param WC_Order $order Order.
 */
function dps_order_reprint( $order ) {
	if ( $order instanceof WC_Order ) {
		dps_wc_print_new_order( $order->get_id(), true );
	}
}
add_action( 'woocommerce_order_action_dps_reprint_kitchen', 'dps_order_reprint' );

/**
 * Place a pickup order from the design-system form.
 */
function dps_handle_place_order() {
	if ( ! isset( $_POST['dps_order_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['dps_order_nonce'] ) ), 'dps_place_order' ) ) {
		wp_die( esc_html__( 'The order form expired. Go back and try again.', 'dphilhower-studio' ), '', array( 'response' => 403 ) );
	}
	$raw_items = isset( $_POST['items'] ) ? wp_unslash( $_POST['items'] ) : array(); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
	if ( is_string( $raw_items ) ) {
		$decoded   = json_decode( $raw_items, true );
		$raw_items = is_array( $decoded ) ? $decoded : array();
	}
	$built = dps_order_from_request(
		array(
			'guest' => isset( $_POST['guest'] ) ? sanitize_text_field( wp_unslash( $_POST['guest'] ) ) : '',
			'phone' => isset( $_POST['phone'] ) ? sanitize_text_field( wp_unslash( $_POST['phone'] ) ) : '',
			'ready' => isset( $_POST['ready'] ) ? sanitize_text_field( wp_unslash( $_POST['ready'] ) ) : '',
			'note'  => isset( $_POST['note'] ) ? sanitize_textarea_field( wp_unslash( $_POST['note'] ) ) : '',
			'items' => $raw_items,
		),
		'pending'
	);
	$back = wp_get_referer() ? wp_get_referer() : home_url( '/order/' );
	if ( empty( $built['ok'] ) ) {
		wp_safe_redirect( add_query_arg( 'order_error', rawurlencode( $built['error'] ), $back ) );
		exit;
	}

	$order_number = '';
	$plain        = '';
	if ( function_exists( 'wc_create_order' ) && function_exists( 'wc_get_product_id_by_sku' ) ) {
		dps_seed_wc_menu();
		$wc_order = wc_create_order();
		foreach ( $built['order']['items'] as $item ) {
			$product_id = wc_get_product_id_by_sku( $item['sku'] );
			if ( ! $product_id ) {
				continue;
			}
			$wc_order->add_product( wc_get_product( $product_id ), $item['qty'] );
		}
		$parts = preg_split( '/\s+/', $built['order']['guest'], 2 );
		$wc_order->set_billing_first_name( $parts[0] );
		$wc_order->set_billing_last_name( isset( $parts[1] ) ? $parts[1] : '' );
		$wc_order->set_billing_phone( $built['order']['phone'] );
		$wc_order->set_customer_note( $built['order']['note'] );
		$wc_order->update_meta_data( '_dps_ready_window', $built['order']['ready'] );
		$wc_order->calculate_totals();
		$wc_order->update_status( 'processing', __( 'Pickup order from the restaurant menu.', 'dphilhower-studio' ), true );
		$order_number = (string) $wc_order->get_order_number();
		$plain        = (string) $wc_order->get_meta( '_dps_kitchen_ticket_plain' );
	} else {
		$order_number                 = (string) ( (int) get_option( 'dps_kitchen_seq', 1000 ) + 1 );
		update_option( 'dps_kitchen_seq', $order_number );
		$built['order']['number']     = $order_number;
		$plain                        = dps_kitchen_ticket_plain( $built['order'] );
		dps_kitchen_print_send( dps_kitchen_ticket_escpos( $built['order'] ), dps_kitchen_printer_config( $order_number ) );
	}

	$token = wp_generate_password( 16, false );
	set_transient(
		'dps_ticket_' . $token,
		array(
			'number' => $order_number,
			'plain'  => $plain,
		),
		15 * MINUTE_IN_SECONDS
	);
	wp_safe_redirect( add_query_arg( 'received', $token, remove_query_arg( 'order_error', $back ) ) );
	exit;
}
add_action( 'admin_post_nopriv_dps_place_order', 'dps_handle_place_order' );
add_action( 'admin_post_dps_place_order', 'dps_handle_place_order' );

/**
 * Order-page stylesheet.
 */
function dps_order_assets() {
	if ( ! is_page_template( 'page-templates/template-order.php' ) ) {
		return;
	}
	wp_enqueue_style( 'dps-order', DPS_URI . '/assets/css/order.css', array( 'dps-editorial' ), DPS_VERSION );
	wp_enqueue_script( 'dps-order', DPS_URI . '/assets/js/order.js', array(), DPS_VERSION, true );
	wp_localize_script(
		'dps-order',
		'dpsOrder',
		array(
			'mode'  => 'wordpress',
			'menu'  => dps_sample_menu_catalog(),
			'error' => isset( $_GET['order_error'] ) ? sanitize_text_field( wp_unslash( $_GET['order_error'] ) ) : '', // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		)
	);
}
add_action( 'wp_enqueue_scripts', 'dps_order_assets' );
