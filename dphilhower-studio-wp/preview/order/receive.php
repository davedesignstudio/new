<?php
/**
 * Preview receiver: one order in, one ticket to the printer spool (or TCP).
 */
require_once dirname( __DIR__, 2 ) . '/theme/dphilhower-studio/inc/kitchen-ticket.php';

header( 'Content-Type: application/json; charset=utf-8' );

if ( 'POST' !== ( $_SERVER['REQUEST_METHOD'] ?? '' ) ) {
	http_response_code( 405 );
	echo json_encode( array( 'ok' => false, 'error' => 'Send the order with POST.' ) );
	exit;
}

$raw   = file_get_contents( 'php://input' );
$input = json_decode( $raw ? $raw : '', true );
if ( ! is_array( $input ) ) {
	http_response_code( 400 );
	echo json_encode( array( 'ok' => false, 'error' => 'The order was not readable.' ) );
	exit;
}

$spool = getenv( 'DPS_KITCHEN_SPOOL' );
if ( ! $spool ) {
	$spool = sys_get_temp_dir() . '/dps-kitchen-preview';
}
if ( ! is_dir( $spool ) ) {
	mkdir( $spool, 0755, true );
}
$seq_file = $spool . '/seq.txt';
$seq      = is_file( $seq_file ) ? (int) file_get_contents( $seq_file ) : 1041;
$seq++;
file_put_contents( $seq_file, (string) $seq );

$built = dps_order_from_request( $input, (string) $seq );
if ( empty( $built['ok'] ) ) {
	http_response_code( 422 );
	echo json_encode( array( 'ok' => false, 'error' => $built['error'] ) );
	exit;
}

$host      = getenv( 'DPS_PRINTER_HOST' ) ?: '';
$transport = $host !== '' ? 'tcp' : 'file';
$result    = dps_kitchen_print_send(
	dps_kitchen_ticket_escpos( $built['order'] ),
	array(
		'transport'    => $transport,
		'host'         => $host,
		'port'         => (int) ( getenv( 'DPS_PRINTER_PORT' ) ?: 9100 ),
		'spool_dir'    => $spool,
		'order_number' => (string) $seq,
	)
);
$plain = dps_kitchen_ticket_plain( $built['order'] );
file_put_contents( $spool . '/last-ticket.txt', $plain );

if ( empty( $result['ok'] ) ) {
	http_response_code( 502 );
	echo json_encode(
		array(
			'ok'    => false,
			'error' => $result['error'],
		)
	);
	exit;
}

echo json_encode(
	array(
		'ok'        => true,
		'number'    => (string) $seq,
		'ticket'    => $plain,
		'transport' => $result['transport'],
	)
);
