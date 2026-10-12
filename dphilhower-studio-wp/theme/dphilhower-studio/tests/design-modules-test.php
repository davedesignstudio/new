<?php
/**
 * Modular pieces stay fitted. Run: php tests/design-modules-test.php
 *
 * @package DPhilhowerStudio
 */

require_once dirname( __DIR__ ) . '/inc/design-modules.php';

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

$catalog = dps_design_catalog();
dps_assert( 3 === count( $catalog['marks'] ), 'three marks' );
dps_assert( count( $catalog['chords'] ) >= 4, 'at least four chords' );
dps_assert( 6 === count( $catalog['pieces'] ), 'six pieces' );

$mark_ids  = array();
$chord_ids = array();
foreach ( $catalog['marks'] as $mark ) {
	$mark_ids[] = $mark['id'];
}
foreach ( $catalog['chords'] as $chord ) {
	$chord_ids[] = $chord['id'];
	foreach ( array( 'plate', 'stock', 'heat', 'metal' ) as $key ) {
		dps_assert( dps_design_hex( $chord[ $key ] ) === strtoupper( $chord[ $key ] ), $chord['id'] . ' ' . $key . ' is hex' );
	}
}
dps_assert( array( 'seal', 'wordmark', 'monogram' ) === $mark_ids, 'seal, wordmark, monogram' );

foreach ( $catalog['restaurants'] as $restaurant ) {
	$id  = $restaurant['id'];
	$fit = dps_design_resolve( $id );
	dps_assert( null !== $fit, $id . ' resolves' );
	dps_assert( ! empty( $fit['preset'] ), $id . ' preset uses its own mark and chord' );
	dps_assert( in_array( $restaurant['mark'], $mark_ids, true ), $id . ' mark exists' );
	dps_assert( in_array( $restaurant['chord'], $chord_ids, true ), $id . ' chord exists' );
	dps_assert( 2 === strlen( $restaurant['letters'] ), $id . ' monogram is two letters' );
	dps_assert( count( $restaurant['menu'] ) >= 3, $id . ' menu has dishes' );
	$plain = dps_design_ticket_plain( $restaurant );
	dps_assert( false !== strpos( $plain, $restaurant['name'] ), $id . ' name on ticket' );
	dps_assert( false !== strpos( $plain, '** END **' ), $id . ' ticket ends' );
	foreach ( explode( "\n", rtrim( $plain, "\n" ) ) as $line ) {
		dps_assert( strlen( $line ) <= 32, $id . ' ticket line fits 32 columns' );
	}
	foreach ( $restaurant['ticket']['items'] as $item ) {
		$found = false;
		foreach ( $restaurant['menu'] as $dish ) {
			if ( $dish['name'] === $item['name'] && (float) $dish['price'] === (float) $item['price'] ) {
				$found = true;
			}
		}
		dps_assert( $found, $id . ' ticket item is on the menu' );
	}
}

$base = dps_design_resolve( 'mizu' );
$mix  = dps_design_resolve( 'mizu', 'seal', 'harbor' );
dps_assert( null !== $mix, 'custom mix resolves' );
dps_assert( 'seal' === $mix['mark']['id'], 'mark swaps' );
dps_assert( 'harbor' === $mix['chord']['id'], 'chord swaps' );
dps_assert( ! $mix['preset'], 'mix is not the preset' );
dps_assert( $mix['restaurant']['menu'] === $base['restaurant']['menu'], 'menu stays fitted' );
dps_assert( $mix['restaurant']['pack'] === $base['restaurant']['pack'], 'pack stays fitted' );
dps_assert( $mix['restaurant']['hours'] === $base['restaurant']['hours'], 'window hours stay fitted' );
dps_assert( false !== strpos( dps_design_ticket_plain( $mix['restaurant'] ), 'Mizu' ), 'ticket keeps the restaurant' );

dps_assert( null === dps_design_resolve( 'nope' ), 'unknown restaurant is refused' );
dps_assert( null === dps_design_resolve( 'ember', 'crest', 'heat' ), 'unknown mark is refused' );
dps_assert( null === dps_design_resolve( 'ember', 'seal', 'neon' ), 'unknown chord is refused' );

$nasty            = dps_design_resolve( 'ember' );
$nasty['restaurant']['name'] = '<script>alert(1)</script>';
$nasty['chord']['plate']     = '#1A1714;color:red';
$html = dps_design_assembly_html( $nasty );
dps_assert( false === strpos( $html, '<script>' ), 'names are escaped' );
dps_assert( false !== strpos( $html, '&lt;script&gt;' ), 'script text is visible as text' );
dps_assert( false === strpos( $html, 'color:red' ), 'frame colors stay hex' );

$ember = dps_design_ticket_plain( dps_design_find( $catalog['restaurants'], 'ember' ) );
dps_assert( false !== strpos( $ember, 'Order 1048' ), 'ember ticket number' );
dps_assert( false !== strpos( $ember, '$26.00' ), 'ember ticket total' );

if ( $failed ) {
	fwrite( STDERR, "{$failed} failed\n" );
	exit( 1 );
}
echo "all design module checks passed\n";
