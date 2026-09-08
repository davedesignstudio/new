<?php
/**
 * Logo stories and pack-label facts for every brand system.
 *
 * Studio identities unless noted as in-house Bville work.
 *
 * @package DPhilhowerStudio
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Mark story + packaging / field-label rows keyed by work slug.
 *
 * @return array
 */
function dps_brand_label_systems() {
	return array(
		'bville-pizza-grill'  => array(
			'title' => __( 'Orange heat, green town', 'dphilhower-studio' ),
			'mark'  => __( 'Locals already say Bville. The orange script B is oven heat from the lot. Ville sits in forest green so the town stays in the name. Gold edge is the physical sign. Two swooshes frame it. No clipart pizza: the food is inside the box.', 'dphilhower-studio' ),
			'pack'  => array(
				array( 'label' => __( 'Product', 'dphilhower-studio' ), 'value' => __( '16″ House Pie', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Net wt', 'dphilhower-studio' ), 'value' => __( '42 oz (1.19 kg)', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Ingredients', 'dphilhower-studio' ), 'value' => __( 'Wheat flour, water, tomato, mozzarella, olive oil, salt, yeast.', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Contains', 'dphilhower-studio' ), 'value' => __( 'Wheat, milk.', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Keep', 'dphilhower-studio' ), 'value' => __( 'Heat and serve. Box is not a cutting board.', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Packed', 'dphilhower-studio' ), 'value' => __( 'Bernardsville, NJ — in-house design, 2018–2021', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Lot', 'dphilhower-studio' ), 'value' => 'BV-190814', ),
			),
		),
		'ember-pie-co'        => array(
			'title' => __( 'Flame in a seal, fire in the line', 'dphilhower-studio' ),
			'mark'  => __( 'A circular gold seal: Ember Pie Co. on the top arc, Wood Fired Pizza on the bottom, wheat at the sides, three tongues of fire in the center. Condensed charcoal wordmark under it. Tomato line: Good pizza built on fire. Kraft is the oven. Gold is the window stamp.', 'dphilhower-studio' ),
			'pack'  => array(
				array( 'label' => __( 'Product', 'dphilhower-studio' ), 'value' => __( 'Wood-fired pie, takeaway', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Box', 'dphilhower-studio' ), 'value' => __( '14″ kraft, gold foil seal', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Ingredients', 'dphilhower-studio' ), 'value' => __( 'Dough, crushed tomato, mozzarella, olive oil.', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Contains', 'dphilhower-studio' ), 'value' => __( 'Wheat, milk.', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Line', 'dphilhower-studio' ), 'value' => __( 'Good pizza built on fire.', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Packed', 'dphilhower-studio' ), 'value' => __( 'Studio system — Morris County, NJ', 'dphilhower-studio' ) ),
			),
		),
		'ritual-cafe'         => array(
			'title' => __( 'A cup from above, broken like a pause', 'dphilhower-studio' ),
			'mark'  => __( 'The circular mark is a cup seen from above: four interlaced ellipses, a diamond in the center, the ring broken like a pause. Serif for THE RITUAL CAFÉ because this is tradition, not a startup. Gold on slate is the drink board. Black, cream, and kraft are the three stocks.', 'dphilhower-studio' ),
			'pack'  => array(
				array( 'label' => __( 'Product', 'dphilhower-studio' ), 'value' => __( 'House Blend · whole bean', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Net wt', 'dphilhower-studio' ), 'value' => __( '12 oz (340 g)', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Roast', 'dphilhower-studio' ), 'value' => __( 'Medium', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Origin', 'dphilhower-studio' ), 'value' => __( 'Ethiopia Yirgacheffe · Colombia Huila', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Ingredients', 'dphilhower-studio' ), 'value' => __( 'Coffee. Contains caffeine.', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Brew', 'dphilhower-studio' ), 'value' => __( 'Pour over 1:16 at 200°F · 3:00', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Packed', 'dphilhower-studio' ), 'value' => __( 'Studio identity — Morristown, NJ', 'dphilhower-studio' ) ),
			),
		),
		'cafe-robust'         => array(
			'title' => __( 'Crema ring, gold CR', 'dphilhower-studio' ),
			'mark'  => __( 'The official seal is a cup from above: gold CR in the crema, silver CAFE / ROBUST on the arcs, stars at the sides, foam as the border. That badge is the pack. The board keeps the same cup-from-above so the sidewalk and the bag agree.', 'dphilhower-studio' ),
			'pack'  => array(
				array( 'label' => __( 'Product', 'dphilhower-studio' ), 'value' => __( 'House Blend · dark roast · whole bean', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Net wt', 'dphilhower-studio' ), 'value' => __( '12 oz (340 g)', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Notes', 'dphilhower-studio' ), 'value' => __( 'Dark chocolate · toasted almond · black cherry', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Origin', 'dphilhower-studio' ), 'value' => __( 'Colombia Huila · Ethiopia Sidamo · Brazil Cerrado', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Ingredients', 'dphilhower-studio' ), 'value' => __( 'Coffee. Contains caffeine. 100% arabica.', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Brew', 'dphilhower-studio' ), 'value' => __( 'Pour over 1:16 · espresso 1:2 · French press 1:15', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Roast / best by', 'dphilhower-studio' ), 'value' => __( '14 Aug 2026 / 14 Feb 2027', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Packed', 'dphilhower-studio' ), 'value' => __( 'Studio identity — Morristown, NJ 07960', 'dphilhower-studio' ) ),
				array( 'label' => __( 'UPC', 'dphilhower-studio' ), 'value' => '851234000126' ),
			),
		),
		'expresso'            => array(
			'title' => __( 'The pour is the hyphen', 'dphilhower-studio' ),
			'mark'  => __( 'EX sits left of the cup. Presso sits right. The pour is the hyphen. Yellow on roasted beans is the only loud color. The lockup is the pun — not a Coffee brush-script substitute, not a bean clipart field.', 'dphilhower-studio' ),
			'pack'  => array(
				array( 'label' => __( 'Product', 'dphilhower-studio' ), 'value' => __( 'Espresso roast · whole bean', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Net wt', 'dphilhower-studio' ), 'value' => __( '12 oz (340 g)', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Roast', 'dphilhower-studio' ), 'value' => __( 'Dark', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Notes', 'dphilhower-studio' ), 'value' => __( 'Cocoa husk · burnt sugar · lemon oil', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Ingredients', 'dphilhower-studio' ), 'value' => __( 'Coffee. Contains caffeine.', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Cup', 'dphilhower-studio' ), 'value' => __( '12 fl oz (355 mL) · contents may be hot', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Packed', 'dphilhower-studio' ), 'value' => __( 'Studio identity — Northern New Jersey', 'dphilhower-studio' ) ),
			),
		),
		'bernardsville-deli'  => array(
			'title' => __( 'Warm deli, cool grocery', 'dphilhower-studio' ),
			'mark'  => __( 'Two businesses, one town name. Deli in orange-to-red is appetite. Bernardsville is a cream flourish — a signature large enough to survive a grip. A blue rule is the horizon between the counter and the aisle. Grocery in blue-to-periwinkle is stable retail. The red ampersand is the only loud punctuation.', 'dphilhower-studio' ),
			'pack'  => array(
				array( 'label' => __( 'Cup', 'dphilhower-studio' ), 'value' => __( 'House coffee · 12 fl oz (355 mL)', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Caution', 'dphilhower-studio' ), 'value' => __( 'Contents may be hot. Paper cup — recycle.', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Tote', 'dphilhower-studio' ), 'value' => __( 'Kraft grocery bag, navy handles, reuse', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Ingredients', 'dphilhower-studio' ), 'value' => __( 'Coffee. Sandwich contents vary by order.', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Packed', 'dphilhower-studio' ), 'value' => __( 'Studio identity — Bernardsville, NJ', 'dphilhower-studio' ) ),
			),
		),
		'cow-lick'            => array(
			'title' => __( 'The tongue is the brief', 'dphilhower-studio' ),
			'mark'  => __( 'The cow licks. If the drawing is not funny, the name is just two words. A thick sticker halo — brown, terracotta, cream — exists so the same die-cut can live on a pint, a window, and a freezer door. Chocolate-to-tan type reads as ice cream, not a farm NGO.', 'dphilhower-studio' ),
			'pack'  => array(
				array( 'label' => __( 'Product', 'dphilhower-studio' ), 'value' => __( 'Chocolate ice cream · pint', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Net wt', 'dphilhower-studio' ), 'value' => __( '16 fl oz (473 mL)', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Ingredients', 'dphilhower-studio' ), 'value' => __( 'Cream, milk, cane sugar, cocoa, egg yolk, vanilla.', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Contains', 'dphilhower-studio' ), 'value' => __( 'Milk, egg.', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Keep', 'dphilhower-studio' ), 'value' => __( 'Keep frozen. 0°F (−18°C).', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Nutrition', 'dphilhower-studio' ), 'value' => __( '2/3 cup (95 g): 210 cal, 12 g fat, 22 g carb, 4 g protein', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Packed', 'dphilhower-studio' ), 'value' => __( 'Studio identity — Morris County, NJ', 'dphilhower-studio' ) ),
			),
		),
		'service-the-hills'   => array(
			'title' => __( 'The tool, not the column', 'dphilhower-studio' ),
			'mark'  => __( 'A bronze circular saw is the whole company. SERVICE in serif is authority. The Hills in script is the place. Renovate · Remodel · Restore rides the inner arc. Hazard orange would look like a franchise. Bronze says the work is construction and the result is the house.', 'dphilhower-studio' ),
			'pack'  => array(
				array( 'label' => __( 'Mark', 'dphilhower-studio' ), 'value' => __( 'Official bronze saw-blade seal', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Trade', 'dphilhower-studio' ), 'value' => __( 'Renovate · Remodel · Restore', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Field', 'dphilhower-studio' ), 'value' => __( 'Black yard sign, black van, cream estimate', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Ink', 'dphilhower-studio' ), 'value' => __( 'Bronze foil / bronze vinyl — never hazard orange', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Place', 'dphilhower-studio' ), 'value' => __( 'Studio identity — Bernardsville / Far Hills, NJ', 'dphilhower-studio' ) ),
			),
		),
		'philhower-okrogly'   => array(
			'title' => __( 'Hills blade, carpenter square, PK', 'dphilhower-studio' ),
			'mark'  => __( 'Same Hills blade as Service The Hills. PK in Old English sits on a pale carpenter-square diamond. PHILHOWER and O’Krogly take the diamond points. DESIGN + BUILD rides the bottom arc. The plus is joinery — two shops meeting — not a religious cross. Black outside the blade.', 'dphilhower-studio' ),
			'pack'  => array(
				array( 'label' => __( 'Mark', 'dphilhower-studio' ), 'value' => __( 'Circular saw seal · PK · carpenter square', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Trade', 'dphilhower-studio' ), 'value' => __( 'Design + Build', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Family', 'dphilhower-studio' ), 'value' => __( 'Mill-and-saw — not union shield, house-script, or truck gothic', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Scales', 'dphilhower-studio' ), 'value' => __( 'Polo · van · yard · card · fridge magnet', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Place', 'dphilhower-studio' ), 'value' => __( 'Studio identity — Northern New Jersey', 'dphilhower-studio' ) ),
			),
		),
		'magic-buds'          => array(
			'title' => __( 'Sleep is the product', 'dphilhower-studio' ),
			'mark'  => __( 'Gold script for the name. Quiet sans-serif for the facts. Deep purple is night without a head-shop leaf. High-key white is trust. Small stars make “magic” approachable. 0 THC sits in gold caps so the claim is design, not a sticker added later.', 'dphilhower-studio' ),
			'pack'  => array(
				array( 'label' => __( 'Product', 'dphilhower-studio' ), 'value' => __( 'Broad spectrum CBD · 300 mg', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Serving', 'dphilhower-studio' ), 'value' => __( '1 vegetarian capsule', 'dphilhower-studio' ) ),
				array( 'label' => __( 'THC', 'dphilhower-studio' ), 'value' => __( '0 THC', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Ingredients', 'dphilhower-studio' ), 'value' => __( 'Broad spectrum hemp extract, MCT oil, vegetarian capsule (cellulose).', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Use', 'dphilhower-studio' ), 'value' => __( 'One capsule daily, or as needed.', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Store', 'dphilhower-studio' ), 'value' => __( 'Cool, dry place. Away from light.', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Packed', 'dphilhower-studio' ), 'value' => __( 'Studio identity — Northern New Jersey', 'dphilhower-studio' ) ),
			),
		),
		'fitness-kick-boxing' => array(
			'title' => __( 'One offer. The punch is the picture', 'dphilhower-studio' ),
			'mark'  => __( 'The class is the picture: pink gloves on a black mitt. Trial is the door — a word you can read, not trail. Three classes and one pair of gloves is the offer, said once. The gloves in the photo are the gloves in the line.', 'dphilhower-studio' ),
			'pack'  => array(
				array( 'label' => __( 'Offer', 'dphilhower-studio' ), 'value' => __( 'Trial · 3 classes · gloves', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Picture', 'dphilhower-studio' ), 'value' => __( 'One punch. No second story.', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Stock', 'dphilhower-studio' ), 'value' => __( 'Poster square · gym bench still', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Note', 'dphilhower-studio' ), 'value' => __( 'Studio study — not a live gym account', 'dphilhower-studio' ) ),
			),
		),
		'casa-forno'          => array(
			'title' => __( 'Wheat at the sides, the oven in the name', 'dphilhower-studio' ),
			'mark'  => __( 'The official seal borrows the Cafe Robust badge: gold CF in the center, silver CASA / FORNO on the arcs, wheat instead of stars, a wine-burgundy plate, an olive-oil ring. No flag, no clipart pizza. The food is inside. Trattoria · Forno · Vino sits under the seal so the room, the oven, and the list agree.', 'dphilhower-studio' ),
			'pack'  => array(
				array( 'label' => __( 'Oil', 'dphilhower-studio' ), 'value' => __( 'Extra virgin · cold pressed · 16.9 fl oz (500 mL)', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Pasta', 'dphilhower-studio' ), 'value' => __( 'House ragù · 16 oz (454 g)', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Keep', 'dphilhower-studio' ), 'value' => __( 'Oil: cool, dark. Ragù: keep refrigerated.', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Menu', 'dphilhower-studio' ), 'value' => __( 'Primi · Secondi · Dolci', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Line', 'dphilhower-studio' ), 'value' => __( 'Trattoria · Forno · Vino', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Lot', 'dphilhower-studio' ), 'value' => 'CF-260908' ),
				array( 'label' => __( 'Packed', 'dphilhower-studio' ), 'value' => __( 'Studio identity — Morris County, NJ', 'dphilhower-studio' ) ),
			),
		),
		'pattern-studies'     => array(
			'title' => __( 'Six marks, fifteen holds', 'dphilhower-studio' ),
			'mark'  => __( 'Each piece takes a rule already in the logo — the color split, the cup from above, the sticker halo, the saw blade, the B flourish, the gold script — and puts it on something a guest actually holds. These are studio studies, not live jobs.', 'dphilhower-studio' ),
			'pack'  => array(
				array( 'label' => __( 'Source', 'dphilhower-studio' ), 'value' => __( 'Six identities, fifteen applications', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Rule', 'dphilhower-studio' ), 'value' => __( 'The mark stays itself. Print is how it leaves.', 'dphilhower-studio' ) ),
				array( 'label' => __( 'Note', 'dphilhower-studio' ), 'value' => __( 'Studio studies — not live jobs', 'dphilhower-studio' ) ),
			),
		),
	);
}

/**
 * Render mark story + pack label for a work slug.
 *
 * @param string $slug Work post slug.
 */
function dps_render_brand_system( $slug ) {
	$systems = dps_brand_label_systems();
	if ( empty( $systems[ $slug ] ) ) {
		return;
	}
	$sys = $systems[ $slug ];
	?>
<section class="brand-kit brand-system">
	<p class="section-label"><?php esc_html_e( 'Brand system', 'dphilhower-studio' ); ?></p>
	<h2 class="section-title"><?php echo esc_html( $sys['title'] ); ?></h2>
	<div class="brand-system-grid">
		<div class="brand-story">
			<h3><?php esc_html_e( 'The mark', 'dphilhower-studio' ); ?></h3>
			<p><?php echo esc_html( $sys['mark'] ); ?></p>
		</div>
		<div class="pack-label">
			<h3 class="pack-label-title"><?php esc_html_e( 'On the pack', 'dphilhower-studio' ); ?></h3>
			<dl>
			<?php foreach ( $sys['pack'] as $row ) : ?>
				<div class="pack-row">
					<dt><?php echo esc_html( $row['label'] ); ?></dt>
					<dd><?php echo esc_html( $row['value'] ); ?></dd>
				</div>
			<?php endforeach; ?>
			</dl>
		</div>
	</div>
</section>
	<?php
}
