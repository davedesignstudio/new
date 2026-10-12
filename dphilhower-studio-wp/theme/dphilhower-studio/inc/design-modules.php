<?php
/**
 * Modular brand pieces.
 *
 * A mark, a color chord, a menu sheet, a window band, a pack label, and a
 * kitchen ticket share one frame. Swap the mark or the chord and the other
 * pieces stay fitted. WordPress is optional: the preview and the tests load
 * this file directly.
 *
 * The restaurants here are studio identities, not live accounts.
 *
 * @package DPhilhowerStudio
 */

if ( ! function_exists( 'dps_kitchen_ticket_plain' ) ) {
	require_once __DIR__ . '/kitchen-ticket.php';
}

/**
 * @param string $value Candidate color.
 * @return string
 */
function dps_design_hex( $value ) {
	$value = strtoupper( (string) $value );
	return preg_match( '/^#[0-9A-F]{6}$/', $value ) ? $value : '#1A1714';
}

/**
 * @param string $text Text.
 * @return string
 */
function dps_design_esc( $text ) {
	$text = (string) $text;
	if ( function_exists( 'esc_html' ) ) {
		return esc_html( $text );
	}
	return htmlspecialchars( $text, ENT_QUOTES, 'UTF-8' );
}

/**
 * @param float $amount Amount.
 * @return string
 */
function dps_design_money( $amount ) {
	if ( function_exists( 'dps_kitchen_money' ) ) {
		return dps_kitchen_money( $amount );
	}
	return '$' . number_format( (float) $amount, 2 );
}

/**
 * Three marks. The letters and the name come from the restaurant.
 *
 * @return array<int, array<string, string>>
 */
function dps_design_marks() {
	return array(
		array(
			'id'    => 'seal',
			'label' => 'Seal',
			'note'  => 'Double ring and two letters. Reads on a window and a box.',
		),
		array(
			'id'    => 'wordmark',
			'label' => 'Wordmark',
			'note'  => 'The name, large, with a metal rule under it.',
		),
		array(
			'id'    => 'monogram',
			'label' => 'Monogram',
			'note'  => 'Two letters in the heat color, the name set small.',
		),
	);
}

/**
 * Color chords. Metal and heat have to read on the stock field.
 *
 * @return array<int, array<string, string>>
 */
function dps_design_chords() {
	return array(
		array(
			'id'    => 'heat',
			'label' => 'Heat',
			'plate' => '#1A1714',
			'stock' => '#F3EAD8',
			'heat'  => '#C4452D',
			'metal' => '#C9A24A',
		),
		array(
			'id'    => 'wine',
			'label' => 'Wine',
			'plate' => '#2A1216',
			'stock' => '#F4EFE4',
			'heat'  => '#6B1324',
			'metal' => '#C9A24A',
		),
		array(
			'id'    => 'harbor',
			'label' => 'Harbor',
			'plate' => '#0B1F33',
			'stock' => '#F2EDE4',
			'heat'  => '#8B5A2B',
			'metal' => '#C4A35A',
		),
		array(
			'id'    => 'night',
			'label' => 'Night',
			'plate' => '#1B2A4A',
			'stock' => '#F3F0EA',
			'heat'  => '#C73E2A',
			'metal' => '#C45A3A',
		),
		array(
			'id'    => 'kiln',
			'label' => 'Kiln',
			'plate' => '#1C1C1C',
			'stock' => '#F7F1E6',
			'heat'  => '#E85C28',
			'metal' => '#8A847A',
		),
		array(
			'id'    => 'grove',
			'label' => 'Grove',
			'plate' => '#1C2430',
			'stock' => '#F3EFE6',
			'heat'  => '#6B7F6A',
			'metal' => '#C4A35A',
		),
	);
}

/**
 * The six pieces that share the frame.
 *
 * @return array<int, array<string, string>>
 */
function dps_design_pieces() {
	return array(
		array(
			'id'    => 'mark',
			'title' => 'Mark',
			'copy'  => 'Seal, wordmark, or monogram. The name stays. The drawing changes.',
		),
		array(
			'id'    => 'chord',
			'title' => 'Color chord',
			'copy'  => 'Plate, stock, heat, and metal. Every piece reads them from one set.',
		),
		array(
			'id'    => 'menu',
			'title' => 'Menu sheet',
			'copy'  => 'The dishes and the prices for this room. They stay when the mark changes.',
		),
		array(
			'id'    => 'window',
			'title' => 'Window band',
			'copy'  => 'The name, the line, and the hours, sized for glass.',
		),
		array(
			'id'    => 'pack',
			'title' => 'Pack label',
			'copy'  => 'What leaves the door: the box, the tin, the sleeve.',
		),
		array(
			'id'    => 'ticket',
			'title' => 'Kitchen ticket',
			'copy'  => 'The same 32-column ticket the printer receives, fitted to this name.',
		),
	);
}

/**
 * Studio restaurants. Each one is a starting fit, not a live account.
 *
 * @return array<int, array<string, mixed>>
 */
function dps_design_restaurants() {
	return array(
		array(
			'id'      => 'ember',
			'name'    => 'Ember Pie Co.',
			'letters' => 'EP',
			'line'    => 'Good pizza built on fire',
			'mark'    => 'seal',
			'chord'   => 'heat',
			'street'  => 'Wood-fired pies',
			'hours'   => 'Open · 4 to close',
			'pack'    => 'Pie box',
			'pack_line' => 'Carry it flat',
			'menu'    => array(
				array( 'group' => 'Pies', 'name' => 'Plain pie', 'price' => 16 ),
				array( 'group' => 'Pies', 'name' => 'Pepperoni pie', 'price' => 18 ),
				array( 'group' => 'Pies', 'name' => 'Margherita pie', 'price' => 19 ),
				array( 'group' => 'After 4', 'name' => 'Cheese slice', 'price' => 4 ),
				array( 'group' => 'After 4', 'name' => 'Green salad', 'price' => 8 ),
			),
			'ticket'  => array(
				'number'    => '1048',
				'placed_at' => '6:12 PM',
				'guest'     => 'Alex Rivera',
				'phone'     => '908-555-0148',
				'ready'     => '6:30 PM',
				'note'      => 'Slice the pie.',
				'items'     => array(
					array( 'name' => 'Pepperoni pie', 'qty' => 1, 'price' => 18 ),
					array( 'name' => 'Green salad', 'qty' => 1, 'price' => 8 ),
				),
			),
		),
		array(
			'id'      => 'casa',
			'name'    => 'Casa Forno',
			'letters' => 'CF',
			'line'    => 'Trattoria · Forno · Vino',
			'mark'    => 'monogram',
			'chord'   => 'wine',
			'street'  => 'Dinner service',
			'hours'   => 'Open · 5 to 10',
			'pack'    => 'Wine sleeve',
			'pack_line' => 'Keep the bottle upright',
			'menu'    => array(
				array( 'group' => 'Primi', 'name' => 'Tagliatelle', 'price' => 22 ),
				array( 'group' => 'Forno', 'name' => 'Margherita', 'price' => 18 ),
				array( 'group' => 'Grill', 'name' => 'Bistecca', 'price' => 34 ),
				array( 'group' => 'Dolci', 'name' => 'Tiramisu', 'price' => 10 ),
			),
			'ticket'  => array(
				'number'    => '2204',
				'placed_at' => '6:40 PM',
				'guest'     => 'Giulia Conti',
				'phone'     => '973-555-0162',
				'ready'     => '7:15 PM',
				'note'      => 'No cheese.',
				'items'     => array(
					array( 'name' => 'Tagliatelle', 'qty' => 1, 'price' => 22 ),
					array( 'name' => 'Tiramisu', 'qty' => 1, 'price' => 10 ),
				),
			),
		),
		array(
			'id'      => 'salt',
			'name'    => 'Salt & Cedar',
			'letters' => 'SC',
			'line'    => 'Oysters · Bar · Harbor',
			'mark'    => 'seal',
			'chord'   => 'harbor',
			'street'  => 'Raw bar',
			'hours'   => 'Open · noon to late',
			'pack'    => 'Oyster tin',
			'pack_line' => 'Ice under the lid',
			'menu'    => array(
				array( 'group' => 'Raw', 'name' => 'Dozen oysters', 'price' => 36 ),
				array( 'group' => 'Pots', 'name' => 'Chowder', 'price' => 14 ),
				array( 'group' => 'Plates', 'name' => 'Grilled fish', 'price' => 28 ),
				array( 'group' => 'Bar', 'name' => 'Bar snack', 'price' => 9 ),
			),
			'ticket'  => array(
				'number'    => '3310',
				'placed_at' => '7:05 PM',
				'guest'     => 'Sam Ellis',
				'phone'     => '732-555-0194',
				'ready'     => '8:00 PM',
				'note'      => 'Lemon, no mignonette.',
				'items'     => array(
					array( 'name' => 'Dozen oysters', 'qty' => 1, 'price' => 36 ),
				),
			),
		),
		array(
			'id'      => 'mizu',
			'name'    => 'Mizu',
			'letters' => 'MZ',
			'line'    => 'Ramen · Steam · Night',
			'mark'    => 'wordmark',
			'chord'   => 'night',
			'street'  => 'Noodle bar',
			'hours'   => 'Open · 5 to midnight',
			'pack'    => 'Noodle cup',
			'pack_line' => 'Steam still on',
			'menu'    => array(
				array( 'group' => 'Bowls', 'name' => 'Tonkotsu', 'price' => 16 ),
				array( 'group' => 'Bowls', 'name' => 'Shoyu', 'price' => 15 ),
				array( 'group' => 'Small', 'name' => 'Gyoza', 'price' => 8 ),
				array( 'group' => 'Small', 'name' => 'Rice', 'price' => 3 ),
			),
			'ticket'  => array(
				'number'    => '4412',
				'placed_at' => '8:44 PM',
				'guest'     => 'Kenji Arai',
				'phone'     => '201-555-0177',
				'ready'     => '9:10 PM',
				'note'      => 'Extra menma.',
				'items'     => array(
					array( 'name' => 'Tonkotsu', 'qty' => 1, 'price' => 16 ),
					array( 'name' => 'Gyoza', 'qty' => 2, 'price' => 8 ),
				),
			),
		),
		array(
			'id'      => 'juniper',
			'name'    => 'Juniper',
			'letters' => 'JN',
			'line'    => 'Gin · Bar · Night',
			'mark'    => 'seal',
			'chord'   => 'grove',
			'street'  => 'Cocktail bar',
			'hours'   => 'Open · 4 to 1',
			'pack'    => 'Bottle tag',
			'pack_line' => 'Keep it cold',
			'menu'    => array(
				array( 'group' => 'Spirits', 'name' => 'House gin', 'price' => 14 ),
				array( 'group' => 'Spirits', 'name' => 'Negroni', 'price' => 15 ),
				array( 'group' => 'Bar', 'name' => 'Olives', 'price' => 7 ),
				array( 'group' => 'Plates', 'name' => 'Steak frites', 'price' => 28 ),
			),
			'ticket'  => array(
				'number'    => '5501',
				'placed_at' => '9:20 PM',
				'guest'     => 'June Hart',
				'phone'     => '908-555-0133',
				'ready'     => '10:00 PM',
				'note'      => 'Stirred, not shaken.',
				'items'     => array(
					array( 'name' => 'Negroni', 'qty' => 1, 'price' => 15 ),
					array( 'name' => 'Olives', 'qty' => 1, 'price' => 7 ),
				),
			),
		),
		array(
			'id'      => 'kiln',
			'name'    => 'Kiln',
			'letters' => 'KL',
			'line'    => 'Fire · Dough · Night',
			'mark'    => 'monogram',
			'chord'   => 'kiln',
			'street'  => 'Night pies',
			'hours'   => 'Open · 5 to 11',
			'pack'    => 'Pizza box',
			'pack_line' => 'Vent the lid',
			'menu'    => array(
				array( 'group' => 'Pies', 'name' => 'Margherita', 'price' => 17 ),
				array( 'group' => 'Pies', 'name' => 'Diavola', 'price' => 19 ),
				array( 'group' => 'Pies', 'name' => 'Bianca', 'price' => 18 ),
				array( 'group' => 'Greens', 'name' => 'Salad', 'price' => 9 ),
			),
			'ticket'  => array(
				'number'    => '6608',
				'placed_at' => '7:02 PM',
				'guest'     => 'Luis Ortega',
				'phone'     => '862-555-0188',
				'ready'     => '7:45 PM',
				'note'      => 'Well done.',
				'items'     => array(
					array( 'name' => 'Diavola', 'qty' => 1, 'price' => 19 ),
				),
			),
		),
	);
}

/**
 * Catalog passed to the assembler.
 *
 * @return array<string, array<int, array<string, mixed>>>
 */
function dps_design_catalog() {
	return array(
		'marks'       => dps_design_marks(),
		'chords'      => dps_design_chords(),
		'restaurants' => dps_design_restaurants(),
		'pieces'      => dps_design_pieces(),
	);
}

/**
 * @param array<int, array<string, mixed>> $list Rows with an id.
 * @param string                            $id   Id.
 * @return array<string, mixed>|null
 */
function dps_design_find( array $list, $id ) {
	foreach ( $list as $item ) {
		if ( isset( $item['id'] ) && (string) $item['id'] === (string) $id ) {
			return $item;
		}
	}
	return null;
}

/**
 * Fit a restaurant to a mark and a chord. Unknown ids do not assemble.
 *
 * @param string $restaurant_id Restaurant id.
 * @param string $mark_id       Mark id, or empty to use the preset.
 * @param string $chord_id      Chord id, or empty to use the preset.
 * @return array<string, mixed>|null
 */
function dps_design_resolve( $restaurant_id, $mark_id = '', $chord_id = '' ) {
	$catalog    = dps_design_catalog();
	$restaurant = dps_design_find( $catalog['restaurants'], $restaurant_id );
	if ( ! $restaurant ) {
		return null;
	}
	$mark_id  = '' !== (string) $mark_id ? (string) $mark_id : (string) $restaurant['mark'];
	$chord_id = '' !== (string) $chord_id ? (string) $chord_id : (string) $restaurant['chord'];
	$mark     = dps_design_find( $catalog['marks'], $mark_id );
	$chord    = dps_design_find( $catalog['chords'], $chord_id );
	if ( ! $mark || ! $chord ) {
		return null;
	}
	return array(
		'restaurant' => $restaurant,
		'mark'       => $mark,
		'chord'      => $chord,
		'preset'     => ( $mark_id === (string) $restaurant['mark'] && $chord_id === (string) $restaurant['chord'] ),
	);
}

/**
 * Sample kitchen ticket for a restaurant, 32 columns, same builder as the printer.
 *
 * @param array<string, mixed> $restaurant Restaurant row.
 * @return string
 */
function dps_design_ticket_plain( array $restaurant ) {
	$ticket = isset( $restaurant['ticket'] ) && is_array( $restaurant['ticket'] ) ? $restaurant['ticket'] : array();
	return dps_kitchen_ticket_plain(
		array(
			'restaurant'  => isset( $restaurant['name'] ) ? $restaurant['name'] : '',
			'number'      => isset( $ticket['number'] ) ? $ticket['number'] : '',
			'placed_at'   => isset( $ticket['placed_at'] ) ? $ticket['placed_at'] : '',
			'guest'       => isset( $ticket['guest'] ) ? $ticket['guest'] : '',
			'phone'       => isset( $ticket['phone'] ) ? $ticket['phone'] : '',
			'fulfillment' => 'Pickup',
			'ready'       => isset( $ticket['ready'] ) ? $ticket['ready'] : '',
			'note'        => isset( $ticket['note'] ) ? $ticket['note'] : '',
			'items'       => isset( $ticket['items'] ) && is_array( $ticket['items'] ) ? $ticket['items'] : array(),
		)
	);
}

/**
 * Inline custom properties for the shared frame.
 *
 * @param array<string, string> $chord Chord.
 * @return string
 */
function dps_design_frame_style( array $chord ) {
	$plate = dps_design_hex( isset( $chord['plate'] ) ? $chord['plate'] : '' );
	$stock = dps_design_hex( isset( $chord['stock'] ) ? $chord['stock'] : '' );
	$heat  = dps_design_hex( isset( $chord['heat'] ) ? $chord['heat'] : '' );
	$metal = dps_design_hex( isset( $chord['metal'] ) ? $chord['metal'] : '' );
	return '--plate:' . $plate . ';--stock:' . $stock . ';--heat:' . $heat . ';--metal:' . $metal . ';--ink:' . $plate . ';';
}

/**
 * @param string $letters Two letters.
 * @return string
 */
function dps_design_seal_svg( $letters ) {
	return '<svg class="seal" viewBox="0 0 120 120" aria-hidden="true"><circle class="seal-outer" cx="60" cy="60" r="52"></circle><circle class="seal-inner" cx="60" cy="60" r="44"></circle><text x="60" y="68" text-anchor="middle">' . dps_design_esc( $letters ) . '</text></svg>';
}

/**
 * @param array<string, mixed> $restaurant Restaurant.
 * @param array<string, string> $mark Mark.
 * @return string
 */
function dps_design_mark_html( array $restaurant, array $mark ) {
	$name    = dps_design_esc( $restaurant['name'] );
	$line    = dps_design_esc( $restaurant['line'] );
	$letters = dps_design_esc( $restaurant['letters'] );
	$kind    = isset( $mark['id'] ) ? (string) $mark['id'] : 'seal';
	$label   = dps_design_esc( isset( $mark['label'] ) ? $mark['label'] : '' );
	if ( 'wordmark' === $kind ) {
		$face = '<div class="mark-face mark-word"><h3 class="word-name">' . $name . '</h3><div class="word-rule"></div><p class="mark-line">' . $line . '</p></div>';
	} elseif ( 'monogram' === $kind ) {
		$face = '<div class="mark-face mark-mono"><p class="mono-letters">' . $letters . '</p><h3 class="mark-name">' . $name . '</h3><p class="mark-line">' . $line . '</p></div>';
	} else {
		$face = '<div class="mark-face mark-seal">' . dps_design_seal_svg( $restaurant['letters'] ) . '<div><h3 class="mark-name">' . $name . '</h3><p class="mark-line">' . $line . '</p></div></div>';
	}
	return '<article class="mod mod-mark" data-piece="mark"><p class="mod-kicker">Mark</p>' . $face . '<p class="mod-meta">' . $label . '</p></article>';
}

/**
 * @param array<int, array<string, mixed>> $menu Menu rows.
 * @return string
 */
function dps_design_menu_html( array $menu ) {
	$html  = '';
	$group = null;
	foreach ( $menu as $item ) {
		$next = isset( $item['group'] ) ? (string) $item['group'] : '';
		if ( $next !== $group ) {
			if ( null !== $group ) {
				$html .= '</ul>';
			}
			$html .= '<p class="menu-group-label">' . dps_design_esc( $next ) . '</p><ul>';
			$group = $next;
		}
		$html .= '<li><span>' . dps_design_esc( $item['name'] ) . '</span><span class="price">' . dps_design_esc( dps_design_money( $item['price'] ) ) . '</span></li>';
	}
	if ( null !== $group ) {
		$html .= '</ul>';
	}
	return $html;
}

/**
 * First-paint board. The assembler replaces this with the same pieces.
 *
 * @param array<string, mixed> $resolved Resolved assembly.
 * @return string
 */
function dps_design_assembly_html( array $resolved ) {
	$restaurant = $resolved['restaurant'];
	$mark       = $resolved['mark'];
	$chord      = $resolved['chord'];
	$name       = dps_design_esc( $restaurant['name'] );
	$line       = dps_design_esc( $restaurant['line'] );
	$swatches   = '';
	$roles      = array(
		'Plate' => 'plate',
		'Stock' => 'stock',
		'Heat'  => 'heat',
		'Metal' => 'metal',
	);
	foreach ( $roles as $label => $key ) {
		$hex   = dps_design_hex( $chord[ $key ] );
		$color = ( 'stock' === $key || 'metal' === $key ) ? dps_design_hex( $chord['plate'] ) : dps_design_hex( $chord['stock'] );
		$swatches .= '<div class="swatch" style="background:' . $hex . ';color:' . $color . '"><span>' . dps_design_esc( $label ) . '</span><span>' . dps_design_esc( $hex ) . '</span></div>';
	}
	$ticket = dps_design_ticket_plain( $restaurant );
	$html   = '<div class="assembly" id="assembly" data-restaurant="' . dps_design_esc( $restaurant['id'] ) . '" data-mark="' . dps_design_esc( $mark['id'] ) . '" data-chord="' . dps_design_esc( $chord['id'] ) . '" style="' . dps_design_frame_style( $chord ) . '">';
	$html  .= dps_design_mark_html( $restaurant, $mark );
	$html  .= '<article class="mod mod-window" data-piece="window"><p class="mod-kicker">Window</p><h3 class="mod-name">' . $name . '</h3><p class="mark-line">' . $line . '</p><p class="win-meta"><span>' . dps_design_esc( $restaurant['street'] ) . '</span><span>' . dps_design_esc( $restaurant['hours'] ) . '</span></p></article>';
	$html  .= '<article class="mod mod-menu" data-piece="menu"><p class="mod-kicker">Menu</p><h3 class="mod-title">' . $name . '</h3>' . dps_design_menu_html( $restaurant['menu'] ) . '</article>';
	$html  .= '<article class="mod mod-chord" data-piece="chord"><p class="mod-kicker">Chord</p><h3 class="mod-title">' . dps_design_esc( $chord['label'] ) . '</h3><div class="swatches">' . $swatches . '</div></article>';
	$html  .= '<article class="mod mod-pack" data-piece="pack"><p class="mod-kicker">Pack</p><div class="pack-face"><p class="pack-letters">' . dps_design_esc( $restaurant['letters'] ) . '</p><div><h3 class="mod-title">' . dps_design_esc( $restaurant['pack'] ) . '</h3><p class="mark-line">' . dps_design_esc( $restaurant['pack_line'] ) . '</p></div></div><p class="pack-bars" aria-hidden="true"><span></span><span></span><span></span><span></span></p></article>';
	$html  .= '<article class="mod mod-ticket" data-piece="ticket"><p class="mod-kicker">Ticket</p><pre>' . dps_design_esc( $ticket ) . '</pre></article>';
	$html  .= '<p class="assembly-rail">Same frame · stock field · metal rule · plate ink</p>';
	$html  .= '</div>';
	return $html;
}

/**
 * Preset and piece switches. Pressed state starts on Ember.
 *
 * @return string
 */
function dps_design_switches_html() {
	$catalog = dps_design_catalog();
	$html    = '<div class="piece-controls">';
	$html   .= '<fieldset><legend>Restaurant</legend><div class="piece-switch" id="switch-restaurant">';
	foreach ( $catalog['restaurants'] as $restaurant ) {
		$pressed = 'ember' === $restaurant['id'] ? 'true' : 'false';
		$html   .= '<button type="button" data-set="restaurant" data-value="' . dps_design_esc( $restaurant['id'] ) . '" aria-pressed="' . $pressed . '">' . dps_design_esc( $restaurant['name'] ) . '</button>';
	}
	$html .= '</div></fieldset>';
	$html .= '<fieldset><legend>Mark</legend><div class="piece-switch" id="switch-mark">';
	foreach ( $catalog['marks'] as $mark ) {
		$pressed = 'seal' === $mark['id'] ? 'true' : 'false';
		$html   .= '<button type="button" data-set="mark" data-value="' . dps_design_esc( $mark['id'] ) . '" aria-pressed="' . $pressed . '">' . dps_design_esc( $mark['label'] ) . '</button>';
	}
	$html .= '</div></fieldset>';
	$html .= '<fieldset><legend>Color chord</legend><div class="piece-switch" id="switch-chord">';
	foreach ( $catalog['chords'] as $chord ) {
		$pressed = 'heat' === $chord['id'] ? 'true' : 'false';
		$html   .= '<button type="button" data-set="chord" data-value="' . dps_design_esc( $chord['id'] ) . '" aria-pressed="' . $pressed . '">' . dps_design_esc( $chord['label'] ) . '</button>';
	}
	$html .= '</div></fieldset></div>';
	return $html;
}

/**
 * @param array<string, mixed> $resolved Assembly.
 * @return string
 */
function dps_design_readout( array $resolved ) {
	$restaurant = $resolved['restaurant'];
	$fit        = ! empty( $resolved['preset'] ) ? 'Preset fit.' : 'Custom mix. Menu, window, pack, and ticket stay fitted.';
	return $restaurant['name'] . ' is a studio identity. ' . $resolved['mark']['label'] . ' on the ' . $resolved['chord']['label'] . ' chord. ' . $fit;
}

if ( defined( 'ABSPATH' ) ) {
	/**
	 * Create the System page once.
	 */
	function dps_ensure_system_page() {
		if ( ! function_exists( 'get_stylesheet' ) || 'dphilhower-studio' !== get_stylesheet() ) {
			return;
		}
		if ( get_page_by_path( 'system' ) ) {
			return;
		}
		$id = wp_insert_post(
			array(
				'post_title'   => __( 'System', 'dphilhower-studio' ),
				'post_name'    => 'system',
				'post_status'  => 'publish',
				'post_type'    => 'page',
				'post_content' => '',
			)
		);
		if ( $id && ! is_wp_error( $id ) ) {
			update_post_meta( $id, '_wp_page_template', 'page-templates/template-modules.php' );
		}
	}
	add_action( 'init', 'dps_ensure_system_page', 30 );

	/**
	 * Assembler assets on the System page.
	 */
	function dps_modules_assets() {
		if ( ! function_exists( 'is_page_template' ) || ! is_page_template( 'page-templates/template-modules.php' ) ) {
			return;
		}
		wp_enqueue_style( 'dps-modules', DPS_URI . '/assets/css/modules.css', array( 'dps-editorial' ), DPS_VERSION );
		wp_enqueue_script( 'dps-modules', DPS_URI . '/assets/js/modules.js', array(), DPS_VERSION, true );
		wp_localize_script( 'dps-modules', 'dpsModules', dps_design_catalog() );
	}
	add_action( 'wp_enqueue_scripts', 'dps_modules_assets' );
}
