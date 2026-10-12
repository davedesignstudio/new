<?php
/**
 * Router for the PHP built-in server: POST /api/order prints a kitchen ticket.
 */
$uri = parse_url( $_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH );
if ( '/order/api/order' === $uri || '/api/order' === $uri ) {
	require __DIR__ . '/receive.php';
	return true;
}
return false;
