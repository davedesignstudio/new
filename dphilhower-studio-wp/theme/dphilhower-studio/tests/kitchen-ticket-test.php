<?php
/**
 * Kitchen ticket and printer receive checks. Run: php tests/kitchen-ticket-test.php
 *
 * @package DPhilhowerStudio
 */

require_once dirname( __DIR__ ) . '/inc/kitchen-ticket.php';

$failed = 0;

function dps_assert( $cond, $message ) {
	global $failed;
	if ( ! $cond ) {
		fwrite( STDERR, "FAIL {$message}\n" );
		$failed++;
		return;
	}
	echo "ok   {$message}\n";
}

$built = dps_order_from_request(
	array(
		'guest' => 'Alex Rivera',
		'phone' => '908-555-0148',
		'ready' => '6:30 PM',
		'note'  => 'Slice the pie.',
		'items' => array(
			array( 'sku' => 'ember-pepperoni', 'qty' => 1, 'price' => 1 ),
			array( 'sku' => 'ember-salad', 'qty' => 2 ),
		),
	),
	'1042'
);
dps_assert( ! empty( $built['ok'] ), 'order accepted' );
dps_assert( 18.0 === $built['order']['items'][0]['price'], 'client price is ignored' );
dps_assert( 8.0 === $built['order']['items'][1]['price'], 'salad price comes from the menu' );

$plain = dps_kitchen_ticket_plain( $built['order'] );
dps_assert( false !== strpos( $plain, 'Ember Pie Co.' ), 'restaurant name on ticket' );
dps_assert( false !== strpos( $plain, 'Order 1042' ), 'order number on ticket' );
dps_assert( false !== strpos( $plain, 'Alex Rivera' ), 'guest on ticket' );
dps_assert( false !== strpos( $plain, '1  Pepperoni pie' ), 'pie line' );
dps_assert( false !== strpos( $plain, '2  Green salad' ), 'salad line' );
dps_assert( false !== strpos( $plain, '$34.00' ), 'total is 18 + 16' );
dps_assert( false !== strpos( $plain, 'Slice the pie.' ), 'kitchen note' );

$rejected = dps_order_from_request( array( 'guest' => 'A', 'items' => array( array( 'sku' => 'nope', 'qty' => 1 ) ) ), '1' );
dps_assert( empty( $rejected['ok'] ), 'unknown sku rejected' );

$bytes = dps_kitchen_ticket_escpos( $built['order'] );
dps_assert( "\x1B\x40" === substr( $bytes, 0, 2 ), 'ESC/POS init' );
dps_assert( "\x1D\x56\x00" === substr( $bytes, -3 ), 'ESC/POS cut' );

$spool = sys_get_temp_dir() . '/dps-kitchen-test-' . getmypid();
$file  = dps_kitchen_print_send(
	$bytes,
	array(
		'transport'    => 'file',
		'spool_dir'    => $spool,
		'order_number' => '1042',
	)
);
dps_assert( ! empty( $file['ok'] ), 'file printer accepted the ticket' );
$saved = file_get_contents( $file['path'] );
dps_assert( $saved === $bytes, 'spool file matches the ticket bytes' );

$port = 0;
$listen = @stream_socket_server( 'tcp://127.0.0.1:0', $errno, $errstr );
dps_assert( false !== $listen, 'local printer socket opened' );
$name = stream_socket_get_name( $listen, false );
$port = (int) substr( $name, strrpos( $name, ':' ) + 1 );
$out  = $spool . '/tcp-received.bin';
$cmd  = 'php -r ' . escapeshellarg(
	'$s=@stream_socket_server("tcp://127.0.0.1:' . $port . '");' .
	'$c=@stream_socket_accept($s, 5);' .
	'$d=stream_get_contents($c);' .
	'file_put_contents(' . var_export( $out, true ) . ',$d);'
);
fclose( $listen );

$proc = proc_open(
	$cmd,
	array( 1 => array( 'pipe', 'w' ), 2 => array( 'pipe', 'w' ) ),
	$pipes
);
usleep( 200000 );
$tcp = dps_kitchen_print_tcp( '127.0.0.1', $port, $bytes, 3 );
if ( is_resource( $proc ) ) {
	fclose( $pipes[1] );
	fclose( $pipes[2] );
	proc_close( $proc );
}
dps_assert( ! empty( $tcp['ok'] ), 'network printer accepted the ticket' );
dps_assert( is_file( $out ) && file_get_contents( $out ) === $bytes, 'printer received the same bytes' );

if ( $failed ) {
	fwrite( STDERR, "{$failed} failed\n" );
	exit( 1 );
}
echo "all kitchen printer checks passed\n";
