<?php
/**
 * Named-brand print systems for work case studies.
 *
 * @package DPhilhowerStudio
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Print-kit copy keyed by work slug.
 *
 * @return array
 */
function dps_brand_kits() {
	return array(
		'pattern-studies'          => array(
			'label'  => __( 'Pattern studies', 'dphilhower-studio' ),
			'title'  => __( 'Fifteen designs from the uploaded marks', 'dphilhower-studio' ),
			'intro'  => __( 'Each piece takes a rule already in the logo — the color split, the cup from above, the sticker halo, the saw blade, the B flourish, the gold script — and puts it on something a guest actually holds.', 'dphilhower-studio' ),
			'pieces' => array(
				array(
					'file'    => 'bville-print-window.png',
					'alt'     => __( 'Bville Pizza & Grill window with orange and green script stamp', 'dphilhower-studio' ),
					'heading' => __( '1. Bville window', 'dphilhower-studio' ),
					'story'   => __( 'Orange B is heat. Green ville is the town. Gold outline is the sign, now on glass.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'bville-print-loyalty.png',
					'alt'     => __( 'Cream Bville loyalty card with orange script and swoosh punches', 'dphilhower-studio' ),
					'heading' => __( '2. Bville loyalty', 'dphilhower-studio' ),
					'story'   => __( 'Swoosh punches instead of circles — the framing arcs from the logo, used as a visit.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'bville-print-matches.png',
					'alt'     => __( 'Forest green Bville napkin band and gold-stamp matchbook', 'dphilhower-studio' ),
					'heading' => __( '3. Bville napkin band', 'dphilhower-studio' ),
					'story'   => __( 'Ville green around linen. Gold stamp is the outline, pocket scale.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'ritual-print-window.png',
					'alt'     => __( 'Ritual Café window with gold circular mark and cream hours', 'dphilhower-studio' ),
					'heading' => __( '4. Ritual window', 'dphilhower-studio' ),
					'story'   => __( 'The cup-from-above mark, shop scale. Gold on glass is the drink board.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'ritual-print-loyalty.png',
					'alt'     => __( 'Ritual Café cream loyalty card with cup-ring punches', 'dphilhower-studio' ),
					'heading' => __( '5. Ritual loyalty', 'dphilhower-studio' ),
					'story'   => __( 'Punches are cup rings. Coming back is still a ritual, not a scan.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'ritual-print-pastry.png',
					'alt'     => __( 'Kraft Ritual Café pastry bag with circular mark and croissant', 'dphilhower-studio' ),
					'heading' => __( '6. Ritual pastry bag', 'dphilhower-studio' ),
					'story'   => __( 'Same kraft as the coffee bag, same circular mark, second food.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'magicbuds-print-nightstand.png',
					'alt'     => __( 'Magic Buds bottle and printed sleep-mask sleeve on a nightstand', 'dphilhower-studio' ),
					'heading' => __( '7. Magic Buds nightstand', 'dphilhower-studio' ),
					'story'   => __( 'The bottle is small. A cream sleeve puts the gold script next to the pillow.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'magicbuds-print-insert.png',
					'alt'     => __( 'Purple Magic Buds insert card with gold script and 0 THC', 'dphilhower-studio' ),
					'heading' => __( '8. Magic Buds insert', 'dphilhower-studio' ),
					'story'   => __( 'The shelf talker that goes home. One line, gold script, 0 THC in caps.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'cowlick-print-napkin.png',
					'alt'     => __( 'Cow Lick napkin with die-cut cow sticker and waffle cone', 'dphilhower-studio' ),
					'heading' => __( '9. Cow Lick napkin', 'dphilhower-studio' ),
					'story'   => __( 'The sticker halo exists so the cow can live on a napkin without redrawing the animal.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'cowlick-print-cling.png',
					'alt'     => __( 'Cow Lick die-cut cow vinyl cling on a freezer door', 'dphilhower-studio' ),
					'heading' => __( '10. Cow Lick freezer cling', 'dphilhower-studio' ),
					'story'   => __( 'Same die-cut, freezer scale. Frost is unkind; the halo keeps the cow.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'cowlick-print-spoon.png',
					'alt'     => __( 'Cow Lick wooden tasting spoon in a kraft sleeve', 'dphilhower-studio' ),
					'heading' => __( '11. Cow Lick tasting spoon', 'dphilhower-studio' ),
					'story'   => __( 'The smallest scale of the joke. If it fails at two inches, the name is just two words.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'sthills-print-truck.png',
					'alt'     => __( 'Black Service The Hills van with bronze saw-blade seal', 'dphilhower-studio' ),
					'heading' => __( '12. Service The Hills van', 'dphilhower-studio' ),
					'story'   => __( 'The yard sign, driving. Black field, bronze blade, the house behind it.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'sthills-print-sticker.png',
					'alt'     => __( 'Bronze Service The Hills saw-blade sticker on a steel toolbox', 'dphilhower-studio' ),
					'heading' => __( '13. Service The Hills toolbox', 'dphilhower-studio' ),
					'story'   => __( 'The blade as a tool on steel. Grit and glamour at the scale of a hand.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'bvdeli-print-cup.png',
					'alt'     => __( 'Bernardsville Deli paper cup with stacked gradient wordmark', 'dphilhower-studio' ),
					'heading' => __( '14. Bernardsville Deli cup', 'dphilhower-studio' ),
					'story'   => __( 'The B flourish wraps the cup. Warm Deli on top, cool Grocery below.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'bvdeli-print-tote.png',
					'alt'     => __( 'Navy Bernardsville Deli grocery tote with B flourish', 'dphilhower-studio' ),
					'heading' => __( '15. Bernardsville Deli tote', 'dphilhower-studio' ),
					'story'   => __( 'Grocery scale, one navy pass, same flourish. Cooler than the wrap on purpose.', 'dphilhower-studio' ),
				),
			),
		),
		'bville-pizza-grill'       => array(
			'label'  => __( 'Print system', 'dphilhower-studio' ),
			'title'  => __( 'How Bville leaves the building', 'dphilhower-studio' ),
			'intro'  => __( 'Locals already shorten Bernardsville to Bville. The mark has to work as a script on slate and as one ink hit on kraft — orange for heat, green for the town, gold so it reads as a sign instead of a clipart pizza.', 'dphilhower-studio' ),
			'pieces' => array(
				array(
					'file'    => 'bville-print-menu.png',
					'alt'     => __( 'Bville Pizza & Grill cream menu with orange and green type', 'dphilhower-studio' ),
					'heading' => __( 'Menu', 'dphilhower-studio' ),
					'story'   => __( 'Cream stock, not yellow special-paper. Names in forest green, prices in orange — the same split as the wordmark. No food photos: the kitchen is twenty feet away. Hierarchy does the work a stock pepperoni picture used to fake.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'bville-print-box.png',
					'alt'     => __( 'Kraft Bville pizza box with script logo and gold swoosh', 'dphilhower-studio' ),
					'heading' => __( 'Pizza box', 'dphilhower-studio' ),
					'story'   => __( 'Kraft is the oven, not a coupon. The script and gold swoosh are the only print so a delivery still reads as Bville under a porch light. No pizza photo on the lid: the food is inside.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'bville-print-window.png',
					'alt'     => __( 'Bville Pizza & Grill window with orange and green script stamp', 'dphilhower-studio' ),
					'heading' => __( 'Window', 'dphilhower-studio' ),
					'story'   => __( 'The uploaded mark is a sign, so the glass gets the sign. Orange B is heat from the lot. Green ville is the town. Gold outline lifts the script off brick the way it lifts off slate. Cream hours because the menu is cream.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'bville-print-loyalty.png',
					'alt'     => __( 'Cream Bville loyalty card with orange script and swoosh punches', 'dphilhower-studio' ),
					'heading' => __( 'Loyalty card', 'dphilhower-studio' ),
					'story'   => __( 'Swoosh punches instead of circles so every visit restates the framing arcs from the logo. Same cream stock as the menu. Ten pies, one on the house — hospitality, not a coupon burst.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'bville-print-matches.png',
					'alt'     => __( 'Forest green Bville napkin band and gold-stamp matchbook', 'dphilhower-studio' ),
					'heading' => __( 'Napkin band and matchbook', 'dphilhower-studio' ),
					'story'   => __( 'Forest green is the ville color taken off the wordmark and wrapped around linen. Gold stamp is the outline. The last thing on the table still reads as Bville.', 'dphilhower-studio' ),
				),
			),
		),
		'ritual-cafe'              => array(
			'label'  => __( 'Print system', 'dphilhower-studio' ),
			'title'  => __( 'The daily cup as a ritual', 'dphilhower-studio' ),
			'intro'  => __( 'Coffee here is supposed to feel like a pause, not a rush. Black, cream, kraft, and gold — a cup seen from above, serif type, and a board you can read before you order.', 'dphilhower-studio' ),
			'pieces' => array(
				array(
					'file'    => 'ritual-print-cups.png',
					'alt'     => __( 'Ritual Café cups and kraft bag with circular mark', 'dphilhower-studio' ),
					'heading' => __( 'Cups and bag', 'dphilhower-studio' ),
					'story'   => __( 'The circular mark is a cup from above, the ring broken like a pause. Same mark on black cup, cream cup, and kraft bag so takeaway is still the café — not three different vendor templates.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'ritual-print-cards.png',
					'alt'     => __( 'Black and cream Ritual Café business cards with gold foil', 'dphilhower-studio' ),
					'heading' => __( 'Business cards', 'dphilhower-studio' ),
					'story'   => __( 'Black and gold is the drink board, put in a pocket. Cream reverse is the sleeve stock. A name, a phone, a street. No QR stack — the ritual is coming in, not scanning out.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'ritual-print-window.png',
					'alt'     => __( 'Ritual Café window with gold circular mark and cream hours', 'dphilhower-studio' ),
					'heading' => __( 'Window', 'dphilhower-studio' ),
					'story'   => __( 'The circular mark is a cup from above, shop scale. Gold on glass is the drink board. Cream hours, no neon — the pause starts on the sidewalk.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'ritual-print-loyalty.png',
					'alt'     => __( 'Ritual Café cream loyalty card with cup-ring punches', 'dphilhower-studio' ),
					'heading' => __( 'Loyalty card', 'dphilhower-studio' ),
					'story'   => __( 'Punches are cup rings — the logo seen from above. Black and gold type is the board, cream stock is the sleeve. Coming back is still a ritual, not a scan.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'ritual-print-pastry.png',
					'alt'     => __( 'Kraft Ritual Café pastry bag with circular mark and croissant', 'dphilhower-studio' ),
					'heading' => __( 'Pastry bag', 'dphilhower-studio' ),
					'story'   => __( 'Same kraft as the coffee bag, same circular mark. One ink language for the drink and the croissant so takeaway is still the room you left.', 'dphilhower-studio' ),
				),
			),
		),
		'magic-buds'               => array(
			'label'  => __( 'Print system', 'dphilhower-studio' ),
			'title'  => __( 'Sleep is the product', 'dphilhower-studio' ),
			'intro'  => __( 'White room, purple label, gold script. The brand sells rest, so the print had to feel calm and expensive — not like a party or a clinic.', 'dphilhower-studio' ),
			'pieces' => array(
				array(
					'file'    => 'magicbuds-print-carton.png',
					'alt'     => __( 'Purple Magic Buds carton with gold script and beige bottle', 'dphilhower-studio' ),
					'heading' => __( 'Carton', 'dphilhower-studio' ),
					'story'   => __( 'The bottle is small on a shelf. The rigid purple carton is the billboard: gold script for the name, quiet sans-serif for the facts. No leaf, no neon. 0 THC sits in gold caps so the claim is design, not a sticker added later.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'magicbuds-print-shelf.png',
					'alt'     => __( 'Magic Buds purple shelf talker in a white retail bay', 'dphilhower-studio' ),
					'heading' => __( 'Shelf talker', 'dphilhower-studio' ),
					'story'   => __( 'Retailers write their own signs if you do not give them one. One line, the script, and 0 THC. White shelf, purple card — the same high-key contrast as the hero so the bay matches the ad.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'magicbuds-print-nightstand.png',
					'alt'     => __( 'Magic Buds bottle and printed sleep-mask sleeve on a nightstand', 'dphilhower-studio' ),
					'heading' => __( 'Nightstand', 'dphilhower-studio' ),
					'story'   => __( 'The bottle is small. A cream sleeve with the gold script puts the brand next to the pillow — rest, not a party. No leaf. The high-key white is the same quiet as the ad.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'magicbuds-print-insert.png',
					'alt'     => __( 'Purple Magic Buds insert card with gold script and 0 THC', 'dphilhower-studio' ),
					'heading' => __( 'Insert card', 'dphilhower-studio' ),
					'story'   => __( 'The shelf talker that goes home. Gold script, one line, 0 THC in caps. The claim is design, not a sticker added later.', 'dphilhower-studio' ),
				),
			),
		),
		'cow-lick'                 => array(
			'label'  => __( 'Print system', 'dphilhower-studio' ),
			'title'  => __( 'A joke you can print', 'dphilhower-studio' ),
			'intro'  => __( 'The cow licks. That is the brief. The sticker halo exists so the same die-cut can live on a pint, a window, and a freezer door without redrawing the animal.', 'dphilhower-studio' ),
			'pieces' => array(
				array(
					'file'    => 'cowlick-print-pint.png',
					'alt'     => __( 'Cow Lick ice cream pint with cow sticker logo', 'dphilhower-studio' ),
					'heading' => __( 'Pint', 'dphilhower-studio' ),
					'story'   => __( 'Freezer light is unkind. The thick sticker outline keeps the cow readable at arm’s length. Chocolate-to-tan type reads as ice cream, not a farm NGO. Flavor sits in a quiet brown so the tongue remains the joke.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'cowlick-print-window.png',
					'alt'     => __( 'Cow Lick parlor window with die-cut cow mark on the glass', 'dphilhower-studio' ),
					'heading' => __( 'Window', 'dphilhower-studio' ),
					'story'   => __( 'The same die-cut, shop scale. Cream band on the glass, hours in terracotta from the cow’s patches. No neon. You should know the flavor of the place before you read the chalkboard.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'cowlick-print-napkin.png',
					'alt'     => __( 'Cow Lick napkin with die-cut cow sticker and waffle cone', 'dphilhower-studio' ),
					'heading' => __( 'Napkin', 'dphilhower-studio' ),
					'story'   => __( 'The sticker halo exists so the cow can live on a napkin without redrawing the animal. Terracotta from the patches as a quiet rule. The tongue is still the joke.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'cowlick-print-cling.png',
					'alt'     => __( 'Cow Lick die-cut cow vinyl cling on a freezer door', 'dphilhower-studio' ),
					'heading' => __( 'Freezer cling', 'dphilhower-studio' ),
					'story'   => __( 'Same die-cut, freezer scale. Frost is unkind; the thick halo keeps the cow readable through the glass. Pints behind it already wear the mark.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'cowlick-print-spoon.png',
					'alt'     => __( 'Cow Lick wooden tasting spoon in a kraft sleeve', 'dphilhower-studio' ),
					'heading' => __( 'Tasting spoon', 'dphilhower-studio' ),
					'story'   => __( 'The smallest scale of the joke. Kraft sleeve, cow sticker, a smear of chocolate. If it is not funny at two inches, the name is just two words.', 'dphilhower-studio' ),
				),
			),
		),
		'service-the-hills'        => array(
			'label'  => __( 'Print system', 'dphilhower-studio' ),
			'title'  => __( 'The tool, not the column', 'dphilhower-studio' ),
			'intro'  => __( 'The Hills already looks like money. The mark had to hold grit and glamour: a saw blade in bronze, not a colonial seal in navy.', 'dphilhower-studio' ),
			'pieces' => array(
				array(
					'file'    => 'sthills-print-yard.png',
					'alt'     => __( 'Service The Hills black and bronze yard sign on a lawn', 'dphilhower-studio' ),
					'heading' => __( 'Yard sign', 'dphilhower-studio' ),
					'story'   => __( 'Black field, bronze blade, the house behind it. Hazard orange would look like a franchise. Bronze says the work is construction and the result is the house. Readable from the curb without a stock “we’re working here” banner.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'sthills-print-stationery.png',
					'alt'     => __( 'Service The Hills cream letterhead and black gold-foil business card', 'dphilhower-studio' ),
					'heading' => __( 'Estimate and card', 'dphilhower-studio' ),
					'story'   => __( 'The estimate is cream with a small blade — paper you can sign on a kitchen island. The card is black with gold foil, the same as the yard sign, so the first handshake matches the lawn. Serif for SERVICE, script for The Hills: authority, then the place.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'sthills-print-truck.png',
					'alt'     => __( 'Black Service The Hills van with bronze saw-blade seal', 'dphilhower-studio' ),
					'heading' => __( 'Van', 'dphilhower-studio' ),
					'story'   => __( 'The yard sign, driving. Black field, bronze blade, the house behind it. Hazard orange would look like a franchise. Readable from the next driveway.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'sthills-print-sticker.png',
					'alt'     => __( 'Bronze Service The Hills saw-blade sticker on a steel toolbox', 'dphilhower-studio' ),
					'heading' => __( 'Toolbox sticker', 'dphilhower-studio' ),
					'story'   => __( 'The blade is the tool. Die-cut bronze on steel so the crew’s kit matches the lawn. Grit and glamour at the scale of a hand.', 'dphilhower-studio' ),
				),
			),
		),
		'bernardsville-deli'       => array(
			'label'  => __( 'Print system', 'dphilhower-studio' ),
			'title'  => __( 'Warm deli, cool grocery', 'dphilhower-studio' ),
			'intro'  => __( 'Two businesses, one town name. Warm gradients for food you eat now, blue for the aisle you shop later. The B flourish is a signature so it still reads after the paper is crumpled.', 'dphilhower-studio' ),
			'pieces' => array(
				array(
					'file'    => 'bvdeli-print-wrap.png',
					'alt'     => __( 'Bernardsville Deli butcher paper and kraft bag with B flourish', 'dphilhower-studio' ),
					'heading' => __( 'Wrap and bag', 'dphilhower-studio' ),
					'story'   => __( 'Butcher paper gets crushed in a car. The long B tail is large on purpose so the town name survives the fold. Kraft bag in one navy pass — grocery scale, cheaper print, same flourish. Warm mark on the wrap, cooler bag: deli vs aisle.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'bvdeli-print-counter.png',
					'alt'     => __( 'Bernardsville Deli cream tent card of specials on a glass case', 'dphilhower-studio' ),
					'heading' => __( 'Counter card', 'dphilhower-studio' ),
					'story'   => __( 'Specials change; the card should not look like a new brand every Tuesday. Same stacked wordmark, blue for the list, orange for the price. Thin blue rule is the same horizon line as the logo. The case does the food photography.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'bvdeli-print-cup.png',
					'alt'     => __( 'Bernardsville Deli paper cup with stacked gradient wordmark', 'dphilhower-studio' ),
					'heading' => __( 'Cup', 'dphilhower-studio' ),
					'story'   => __( 'The B flourish wraps the cup so the town name survives a grip. Warm Deli on top, cool Grocery below, red ampersand as the only loud punctuation. Same stack as the wrap.', 'dphilhower-studio' ),
				),
				array(
					'file'    => 'bvdeli-print-tote.png',
					'alt'     => __( 'Navy Bernardsville Deli grocery tote with B flourish', 'dphilhower-studio' ),
					'heading' => __( 'Tote', 'dphilhower-studio' ),
					'story'   => __( 'Grocery scale, one navy pass, same flourish. Cooler than the wrap on purpose: the aisle, not the counter. The sandwich inside still wears the warm mark.', 'dphilhower-studio' ),
				),
			),
		),
	);
}

/**
 * Render a brand print system for a work slug.
 *
 * @param string $slug Work post slug.
 */
function dps_render_brand_kit( $slug ) {
	$kits = dps_brand_kits();
	if ( empty( $kits[ $slug ] ) ) {
		return;
	}
	$kit = $kits[ $slug ];
	?>
<section class="kit-band">
	<p class="section-label"><?php echo esc_html( $kit['label'] ); ?></p>
	<h2 class="section-title"><?php echo esc_html( $kit['title'] ); ?></h2>
	<p class="section-copy"><?php echo esc_html( $kit['intro'] ); ?></p>
	<div class="print-system">
		<?php foreach ( $kit['pieces'] as $piece ) : ?>
			<figure>
				<img src="<?php echo esc_url( dps_image_url( $piece['file'] ) ); ?>" alt="<?php echo esc_attr( $piece['alt'] ); ?>" width="1536" height="1024">
				<figcaption><strong><?php echo esc_html( $piece['heading'] ); ?></strong> <?php echo esc_html( $piece['story'] ); ?></figcaption>
			</figure>
		<?php endforeach; ?>
	</div>
</section>
	<?php
}
