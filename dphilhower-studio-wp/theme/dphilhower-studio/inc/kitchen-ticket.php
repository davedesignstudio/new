<?php
/**
 * Restaurant order ticket and printer send.
 *
 * WordPress is optional. The preview receiver and the test script load this file directly.
 *
 * @package DPhilhowerStudio
 */

/**
 * Studio sample menu. Prices live here so the browser cannot set them.
 *
 * Ember Pie Co. is a studio identity, not a live account.
 *
 * @return array<string, array{name:string, kitchen:string, price:float, category:string}>
 */
function dps_sample_menu_catalog() {
	return array(
		'ember-plain'      => array(
			'name'     => 'Plain pie',
			'kitchen'  => 'Plain pie',
			'price'    => 16.00,
			'category' => 'Pies',
		),
		'ember-pepperoni'  => array(
			'name'     => 'Pepperoni pie',
			'kitchen'  => 'Pepperoni pie',
			'price'    => 18.00,
			'category' => 'Pies',
		),
		'ember-margherita' => array(
			'name'     => 'Margherita pie',
			'kitchen'  => 'Margherita pie',
			'price'    => 19.00,
			'category' => 'Pies',
		),
		'ember-slice'      => array(
			'name'     => 'Cheese slice',
			'kitchen'  => 'Cheese slice',
			'price'    => 4.00,
			'category' => 'After 4',
		),
		'ember-salad'      => array(
			'name'     => 'Green salad',
			'kitchen'  => 'Green salad',
			'price'    => 8.00,
			'category' => 'After 4',
		),
	);
}

/**
 * Layers used to build a restaurant brand through to the kitchen printer.
 *
 * @return array<int, array{num:string, title:string, copy:string}>
 */
function dps_restaurant_system_layers() {
	return array(
		array(
			'num'   => '01',
			'title' => 'Identity',
			'copy'  => 'Lock the mark, the colors, and the type. The same kit has to read on the window, the menu, and the phone.',
		),
		array(
			'num'   => '02',
			'title' => 'Menu',
			'copy'  => 'Categories, kitchen names, and prices. The server owns the price. The cart only sends a sku and a quantity.',
		),
		array(
			'num'   => '03',
			'title' => 'Order',
			'copy'  => 'WooCommerce takes the order: guest name, phone, ready window, and a note. Pickup. No shipping.',
		),
		array(
			'num'   => '04',
			'title' => 'Ticket',
			'copy'  => 'One kitchen ticket per order. Item, quantity, total, and the note. Nothing else.',
		),
		array(
			'num'   => '05',
			'title' => 'Printer',
			'copy'  => 'The ticket is sent to the printer at the restaurant (port 9100) when the order is placed. A second status change does not print it again.',
		),
	);
}

/**
 * @param float $amount Amount.
 * @return string
 */
function dps_kitchen_money( $amount ) {
	return '$' . number_format( (float) $amount, 2 );
}

/**
 * @param string $text  Text.
 * @param int    $width Columns.
 * @return string
 */
function dps_kitchen_center( $text, $width ) {
	$text = (string) $text;
	if ( strlen( $text ) >= $width ) {
		return substr( $text, 0, $width );
	}
	$pad  = $width - strlen( $text );
	$left = (int) floor( $pad / 2 );
	return str_repeat( ' ', $left ) . $text;
}

/**
 * @param string $left  Left column.
 * @param string $right Right column.
 * @param int    $width Columns.
 * @return string
 */
function dps_kitchen_pad( $left, $right, $width ) {
	$left  = (string) $left;
	$right = (string) $right;
	$space = $width - strlen( $left ) - strlen( $right );
	if ( $space < 1 ) {
		$keep = max( 1, $width - strlen( $right ) - 1 );
		return substr( $left, 0, $keep ) . ' ' . $right;
	}
	return $left . str_repeat( ' ', $space ) . $right;
}

/**
 * Plain-text kitchen ticket, 32 columns, thermal-printer width.
 *
 * @param array $order Order payload.
 * @return string
 */
function dps_kitchen_ticket_plain( array $order ) {
	$width = 32;
	$rule  = str_repeat( '-', $width );
	$name  = isset( $order['restaurant'] ) ? (string) $order['restaurant'] : 'Restaurant';
	$lines = array(
		dps_kitchen_center( $name, $width ),
		dps_kitchen_center( 'KITCHEN', $width ),
		$rule,
		'Order ' . ( isset( $order['number'] ) ? $order['number'] : '' ),
		'Time  ' . ( isset( $order['placed_at'] ) ? $order['placed_at'] : '' ),
		'Name  ' . ( isset( $order['guest'] ) ? $order['guest'] : '' ),
		'Phone ' . ( isset( $order['phone'] ) ? $order['phone'] : '' ),
		'For   ' . ( isset( $order['fulfillment'] ) ? $order['fulfillment'] : 'Pickup' ),
	);
	if ( ! empty( $order['ready'] ) ) {
		$lines[] = 'Ready ' . $order['ready'];
	}
	$lines[] = $rule;
	$total   = 0.0;
	$items   = isset( $order['items'] ) && is_array( $order['items'] ) ? $order['items'] : array();
	foreach ( $items as $item ) {
		$qty    = isset( $item['qty'] ) ? (int) $item['qty'] : 0;
		$price  = isset( $item['price'] ) ? (float) $item['price'] : 0.0;
		$line   = $qty * $price;
		$total += $line;
		$label  = $qty . '  ' . ( isset( $item['name'] ) ? $item['name'] : '' );
		$lines[] = dps_kitchen_pad( $label, dps_kitchen_money( $line ), $width );
	}
	$lines[] = $rule;
	$lines[] = dps_kitchen_pad( 'TOTAL', dps_kitchen_money( $total ), $width );
	if ( ! empty( $order['note'] ) ) {
		$lines[] = $rule;
		$lines[] = 'NOTE';
		$lines[] = (string) $order['note'];
	}
	$lines[] = $rule;
	$lines[] = dps_kitchen_center( '** END **', $width );
	return implode( "\n", $lines ) . "\n";
}

/**
 * ESC/POS bytes for a 80mm thermal printer: init, ticket, feed, full cut.
 *
 * @param array $order Order payload.
 * @return string
 */
function dps_kitchen_ticket_escpos( array $order ) {
	$init  = "\x1B\x40";
	$plain = dps_kitchen_ticket_plain( $order );
	$feed  = "\n\n\n";
	$cut   = "\x1D\x56\x00";
	return $init . $plain . $feed . $cut;
}

/**
 * Validate a guest submission against the catalog.
 *
 * @param array  $input  Raw request.
 * @param string $number Order number.
 * @return array{ok:bool, error?:string, order?:array}
 */
function dps_order_from_request( array $input, $number ) {
	$catalog = dps_sample_menu_catalog();
	if ( empty( $input['items'] ) || ! is_array( $input['items'] ) ) {
		return array(
			'ok'    => false,
			'error' => 'Add at least one item.',
		);
	}
	$items = array();
	foreach ( $input['items'] as $row ) {
		if ( ! is_array( $row ) ) {
			return array(
				'ok'    => false,
				'error' => 'That item is not on the menu.',
			);
		}
		$sku = isset( $row['sku'] ) ? (string) $row['sku'] : '';
		$qty = isset( $row['qty'] ) ? (int) $row['qty'] : 0;
		if ( ! isset( $catalog[ $sku ] ) || $qty < 1 || $qty > 20 ) {
			return array(
				'ok'    => false,
				'error' => 'That item is not on the menu.',
			);
		}
		$item    = $catalog[ $sku ];
		$items[] = array(
			'sku'   => $sku,
			'name'  => $item['kitchen'],
			'qty'   => $qty,
			'price' => (float) $item['price'],
		);
	}
	$guest = trim( (string) ( isset( $input['guest'] ) ? $input['guest'] : '' ) );
	if ( '' === $guest || strlen( $guest ) > 80 ) {
		return array(
			'ok'    => false,
			'error' => 'Add a name for the ticket.',
		);
	}
	$phone = preg_replace( '/[^0-9+\-(). ]/', '', (string) ( isset( $input['phone'] ) ? $input['phone'] : '' ) );
	$phone = substr( (string) $phone, 0, 24 );
	$note  = trim( (string) ( isset( $input['note'] ) ? $input['note'] : '' ) );
	$note  = substr( $note, 0, 240 );
	$ready = trim( (string) ( isset( $input['ready'] ) ? $input['ready'] : '' ) );
	$ready = substr( $ready, 0, 40 );
	$when  = new DateTime( 'now', new DateTimeZone( 'America/New_York' ) );

	return array(
		'ok'    => true,
		'order' => array(
			'restaurant'  => 'Ember Pie Co.',
			'number'      => (string) $number,
			'placed_at'   => $when->format( 'M j, g:i A' ),
			'guest'       => $guest,
			'phone'       => $phone,
			'fulfillment' => 'Pickup',
			'ready'       => $ready,
			'note'        => $note,
			'items'       => $items,
		),
	);
}

/**
 * Send ticket bytes to a spool file or a raw network printer.
 *
 * @param string $payload ESC/POS or plain bytes.
 * @param array  $config  transport, host, port, spool_dir, order_number, timeout.
 * @return array{ok:bool, transport:string, error:string, path?:string, bytes?:int}
 */
function dps_kitchen_print_send( $payload, array $config ) {
	$transport = isset( $config['transport'] ) ? (string) $config['transport'] : 'file';
	if ( 'tcp' === $transport ) {
		return dps_kitchen_print_tcp(
			isset( $config['host'] ) ? (string) $config['host'] : '',
			isset( $config['port'] ) ? (int) $config['port'] : 9100,
			$payload,
			isset( $config['timeout'] ) ? (int) $config['timeout'] : 3
		);
	}
	$dir = isset( $config['spool_dir'] ) ? (string) $config['spool_dir'] : sys_get_temp_dir() . '/dps-kitchen';
	if ( ! is_dir( $dir ) && ! mkdir( $dir, 0755, true ) && ! is_dir( $dir ) ) {
		return array(
			'ok'        => false,
			'transport' => 'file',
			'error'     => 'Could not open the kitchen spool folder',
		);
	}
	$number = isset( $config['order_number'] ) ? (string) $config['order_number'] : 'order';
	$safe   = preg_replace( '/[^A-Za-z0-9_-]/', '', $number );
	$file   = $dir . '/ticket-' . $safe . '-' . gmdate( 'Ymd-His' ) . '.bin';
	$ok     = false !== file_put_contents( $file, $payload );
	return array(
		'ok'        => $ok,
		'transport' => 'file',
		'path'      => $file,
		'error'     => $ok ? '' : 'Could not write the kitchen ticket',
	);
}

/**
 * Raw print to a thermal printer (AppSocket / JetDirect, port 9100).
 *
 * @param string $host    Printer host or IP on the restaurant network.
 * @param int    $port    Port, usually 9100.
 * @param string $payload Bytes.
 * @param int    $timeout Seconds.
 * @return array{ok:bool, transport:string, error:string, bytes?:int, errno?:int}
 */
function dps_kitchen_print_tcp( $host, $port, $payload, $timeout = 3 ) {
	$host = trim( (string) $host );
	$port = (int) $port;
	if ( '' === $host || $port < 1 || $port > 65535 ) {
		return array(
			'ok'        => false,
			'transport' => 'tcp',
			'error'     => 'Printer host or port is not set',
		);
	}
	$errno  = 0;
	$errstr = '';
	$fp     = @fsockopen( $host, $port, $errno, $errstr, $timeout ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
	if ( ! $fp ) {
		return array(
			'ok'        => false,
			'transport' => 'tcp',
			'error'     => '' !== $errstr ? $errstr : 'Printer refused the connection',
			'errno'     => (int) $errno,
		);
	}
	stream_set_timeout( $fp, $timeout );
	$written = fwrite( $fp, $payload );
	fclose( $fp );
	$ok = false !== $written && (int) $written === strlen( $payload );
	return array(
		'ok'        => $ok,
		'transport' => 'tcp',
		'bytes'     => (int) $written,
		'error'     => $ok ? '' : 'Printer did not take the full ticket',
	);
}
