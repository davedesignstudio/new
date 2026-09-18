<?php
/**
 * Full process + identity kits for the three restaurant systems.
 *
 * Bville Pizza & Grill (in-house 2018–2021), Ember Pie Co., Casa Forno.
 *
 * @package DPhilhowerStudio
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Four-step process copy keyed by restaurant slug.
 *
 * @return array
 */
function dps_brand_processes() {
	return array(
		'bville-pizza-grill' => array(
			'title' => __( 'From the lot to the lid', 'dphilhower-studio' ),
			'intro' => __( 'In-house at Bville, 2018–2021. The process was the same one the studio still uses: sit in the room, write what the town already says, draw the lockup that can live on glass, then print until the box matches the window.', 'dphilhower-studio' ),
			'steps' => array(
				array(
					'num'   => __( '01 · Sit down', 'dphilhower-studio' ),
					'title' => __( 'A two-top in Bernardsville', 'dphilhower-studio' ),
					'copy'  => __( 'The lot is orange at dusk. Locals already shorten the town to Bville. The first conversation was not a logo contest — it was who walks in from Claremont, what they order, and what has to read from the sidewalk.', 'dphilhower-studio' ),
				),
				array(
					'num'   => __( '02 · Write it back', 'dphilhower-studio' ),
					'title' => __( 'Orange heat, green town', 'dphilhower-studio' ),
					'copy'  => __( 'The brief: keep the nickname, put the town in the name, do not draw a pizza. Heat is orange. Ville is forest green. Gold is the physical sign. The food stays inside the box.', 'dphilhower-studio' ),
				),
				array(
					'num'   => __( '03 · Draw', 'dphilhower-studio' ),
					'title' => __( 'Script B, two swooshes, slate', 'dphilhower-studio' ),
					'copy'  => __( 'Orange script B. Green ville. Pizza & Grill in the same orange. Gold and green swooshes on slate. That lockup is the logo — no redraw for a circular white-script substitute.', 'dphilhower-studio' ),
				),
				array(
					'num'   => __( '04 · Build', 'dphilhower-studio' ),
					'title' => __( 'Window, menu, box, phone', 'dphilhower-studio' ),
					'copy'  => __( 'Glass gets the sign. Cream menu splits names in green and prices in orange. Burgundy lid. Loyalty, coasters, poster, matchbook, cards, and a homepage that uses the same split. One kit, every surface.', 'dphilhower-studio' ),
				),
			),
		),
		'ember-pie-co'       => array(
			'title' => __( 'From the oven to the porch light', 'dphilhower-studio' ),
			'intro' => __( 'A Morris County pie shop built as a full system, not five separate jobs. Sit in the wood-fired room, write the line the window can hold, draw the gold seal, then print kraft, cream, and foil until a delivery still reads as Ember.', 'dphilhower-studio' ),
			'steps' => array(
				array(
					'num'   => __( '01 · Sit down', 'dphilhower-studio' ),
					'title' => __( 'Stand at the oven', 'dphilhower-studio' ),
					'copy'  => __( 'The room is heat, wheat, and a gold stamp that has to work at dusk. First talk is who walks in for a pie, what the block already thinks a pizza shop looks like, and what has to live on glass without tape.', 'dphilhower-studio' ),
				),
				array(
					'num'   => __( '02 · Write it back', 'dphilhower-studio' ),
					'title' => __( 'Good pizza built on fire', 'dphilhower-studio' ),
					'copy'  => __( 'The brief: kraft is the oven, gold is the window stamp, tomato is the only loud color. No pizza photo on the lid. The line has to read from a table and from a porch light.', 'dphilhower-studio' ),
				),
				array(
					'num'   => __( '03 · Draw', 'dphilhower-studio' ),
					'title' => __( 'Flame in a seal', 'dphilhower-studio' ),
					'copy'  => __( 'Circular gold seal: Ember Pie Co. on the top arc, Wood Fired Pizza on the bottom, wheat at the sides, fire in the center. Condensed charcoal wordmark under it. Forest green for the awning, cream for dough.', 'dphilhower-studio' ),
				),
				array(
					'num'   => __( '04 · Build', 'dphilhower-studio' ),
					'title' => __( 'One stamp, every hold', 'dphilhower-studio' ),
					'copy'  => __( 'Window and menu set the rules. Box, cards, coasters, loyalty, poster, matches, bag, and the homepage use the same stamp, the same green, the same tomato. Nothing is a one-off layout.', 'dphilhower-studio' ),
				),
			),
		),
		'casa-forno'         => array(
			'title' => __( 'From the oven to the oil', 'dphilhower-studio' ),
			'intro' => __( 'A trattoria system written for a room with an oven. Sit at the two-top, write Trattoria · Forno · Vino, draw the CF seal, then put that badge on glass, the cream list, the oil bottle, and the phone.', 'dphilhower-studio' ),
			'steps' => array(
				array(
					'num'   => __( '01 · Sit down', 'dphilhower-studio' ),
					'title' => __( 'Brick, linen, a wood oven', 'dphilhower-studio' ),
					'copy'  => __( 'The sidewalk should know the room before the door. First conversation is who stays for primi, who takes ragù home, and what has to live on glass in gold — not a flag, not clipart pizza.', 'dphilhower-studio' ),
				),
				array(
					'num'   => __( '02 · Write it back', 'dphilhower-studio' ),
					'title' => __( 'Trattoria · Forno · Vino', 'dphilhower-studio' ),
					'copy'  => __( 'The brief: wheat instead of stars, wine enamel instead of espresso, an olive-oil ring instead of crema. The food is inside. The line under the seal has to agree with the menu and the bottle.', 'dphilhower-studio' ),
				),
				array(
					'num'   => __( '03 · Draw', 'dphilhower-studio' ),
					'title' => __( 'Gold CF, silver arcs', 'dphilhower-studio' ),
					'copy'  => __( 'Official circular seal: gold CF, silver CASA / FORNO, wheat at the sides, wine-burgundy plate. Trajan-like caps for the name. Quiet serif for the list. Gold rules, cream stock.', 'dphilhower-studio' ),
				),
				array(
					'num'   => __( '04 · Build', 'dphilhower-studio' ),
					'title' => __( 'Seal, room, pack, phone', 'dphilhower-studio' ),
					'copy'  => __( 'Dusk window, cream menu (primi · secondi · dolci), oil and ragù, cards, coasters, loyalty, poster, matchbook, and a homepage that uses the same wine and gold. Studio identity — not a live account.', 'dphilhower-studio' ),
				),
			),
		),
	);
}

/**
 * Mark / color / type boards for the three restaurants.
 *
 * @return array
 */
function dps_identity_kits() {
	return array(
		'bville-pizza-grill' => array(
			'wordmark'       => 'Bville',
			'wordmark_span'  => 'Pizza & Grill',
			'blurb'          => __( 'Script B for heat. Green ville for the town. Gold edge is the sign. Condensed orange for Pizza & Grill. Cream menu, burgundy box, slate lockup — no clipart pizza.', 'dphilhower-studio' ),
			'board'          => 'bville-kit.png',
			'board_alt'      => __( 'Bville Pizza & Grill identity board: official lockup, orange heat, ville green, gold, slate, cream card', 'dphilhower-studio' ),
			'swatches'       => array(
				array( 'class' => 'swatch-bville-orange', 'name' => 'Heat', 'hex' => '#E86A1F' ),
				array( 'class' => 'swatch-bville-green', 'name' => 'Ville', 'hex' => '#5B7A2A' ),
				array( 'class' => 'swatch-bville-gold', 'name' => 'Sign', 'hex' => '#D4AF37' ),
				array( 'class' => 'swatch-bville-slate', 'name' => 'Slate', 'hex' => '#1C1C1C' ),
			),
			'display_label'  => __( 'Display — script B', 'dphilhower-studio' ),
			'display_sample' => 'BVILLE',
			'display_note'   => __( 'The B is the appetite. Never for a paragraph of specials.', 'dphilhower-studio' ),
			'body_label'     => __( 'Body — condensed sans', 'dphilhower-studio' ),
			'body_note'      => __( 'Names in forest green, prices in orange — the same split as the wordmark. Quiet enough for a cream sheet.', 'dphilhower-studio' ),
		),
		'ember-pie-co'       => array(
			'wordmark'       => 'Ember',
			'wordmark_span'  => 'Pie Co.',
			'blurb'          => __( 'Condensed display for the window. Quiet body type for the menu. Tomato for heat, cream for dough, brass for the edge of a pie pan.', 'dphilhower-studio' ),
			'board'          => 'ember-kit.png',
			'board_alt'      => __( 'Ember Pie Co. identity board with logo, type, and color', 'dphilhower-studio' ),
			'swatches'       => array(
				array( 'class' => 'swatch-ink', 'name' => 'Ink', 'hex' => '#1A1714' ),
				array( 'class' => 'swatch-cream', 'name' => 'Dough', 'hex' => '#F3EAD8' ),
				array( 'class' => 'swatch-tomato', 'name' => 'Ember', 'hex' => '#C4452D' ),
				array( 'class' => 'swatch-brass', 'name' => 'Pan', 'hex' => '#9A7B45' ),
			),
			'display_label'  => __( 'Display — Syne', 'dphilhower-studio' ),
			'display_sample' => 'EMBER PIE',
			'display_note'   => __( 'Windows, boxes, homepage hero. Never for a paragraph of specials.', 'dphilhower-studio' ),
			'body_label'     => __( 'Body — Karla', 'dphilhower-studio' ),
			'body_note'      => __( 'Plain pies, salads, slices after 4. Prices sit in a second column so the eye can order without hunting.', 'dphilhower-studio' ),
		),
		'casa-forno'         => array(
			'wordmark'       => 'Casa',
			'wordmark_span'  => 'Forno',
			'blurb'          => __( 'Trajan-like caps for the seal. Quiet serif for primi, secondi, dolci. Wine plate, gold CF, silver arcs, wheat at the sides. Cream stock, gold rules.', 'dphilhower-studio' ),
			'board'          => 'casa-forno-kit.png',
			'board_alt'      => __( 'Casa Forno identity board: official CF seal, wine, gold, silver, cream, ink', 'dphilhower-studio' ),
			'swatches'       => array(
				array( 'class' => 'swatch-casa-wine', 'name' => 'Wine', 'hex' => '#6B1324' ),
				array( 'class' => 'swatch-casa-gold', 'name' => 'Gold', 'hex' => '#D4AF37' ),
				array( 'class' => 'swatch-casa-silver', 'name' => 'Silver', 'hex' => '#C5C7C9' ),
				array( 'class' => 'swatch-casa-cream', 'name' => 'Cream', 'hex' => '#F4EFE4' ),
			),
			'display_label'  => __( 'Display — Trajan-like caps', 'dphilhower-studio' ),
			'display_sample' => 'CASA FORNO',
			'display_note'   => __( 'Seal, window vinyl, poster. Never a paragraph of specials.', 'dphilhower-studio' ),
			'body_label'     => __( 'Body — quiet serif', 'dphilhower-studio' ),
			'body_note'      => __( 'Primi, secondi, dolci. Prices in a column. The kitchen is twenty feet away — no food photos.', 'dphilhower-studio' ),
		),
	);
}

/**
 * Bag / window / phone stills after the print system.
 *
 * @return array
 */
function dps_brand_touchpoints() {
	return array(
		'bville-pizza-grill' => array(
			'title' => __( 'Window, box, homepage', 'dphilhower-studio' ),
			'copy'  => __( 'The dusk window is the sign. The burgundy lid is the delivery. The homepage uses the same orange/green split as the menu. Nothing is a one-off layout.', 'dphilhower-studio' ),
			'items' => array(
				array(
					'file'  => 'bville-print-window.png',
					'alt'   => __( 'Bville Pizza & Grill dusk window with the official lockup on glass', 'dphilhower-studio' ),
					'phone' => false,
				),
				array(
					'file'  => 'bville-phone.png',
					'alt'   => __( 'Phone showing the Bville Pizza & Grill homepage', 'dphilhower-studio' ),
					'phone' => true,
				),
				array(
					'file'  => 'bville-print-box-burgundy.png',
					'alt'   => __( 'Burgundy Bville pizza box with the official lockup on the lid', 'dphilhower-studio' ),
					'phone' => false,
				),
			),
		),
		'ember-pie-co'       => array(
			'title' => __( 'Bag and homepage', 'dphilhower-studio' ),
			'copy'  => __( 'The bag uses the same stamp as the box. The homepage uses the same cream and ember as the menu. Nothing is a one-off layout.', 'dphilhower-studio' ),
			'items' => array(
				array(
					'file'  => 'ember-bag.png',
					'alt'   => __( 'Kraft takeout bag and pizza box with Ember Pie Co. stamp', 'dphilhower-studio' ),
					'phone' => false,
				),
				array(
					'file'  => 'ember-phone.png',
					'alt'   => __( 'Phone showing the Ember Pie Co. homepage', 'dphilhower-studio' ),
					'phone' => true,
				),
				array(
					'file'  => 'ember-window-after.png',
					'alt'   => __( 'Ember Pie Co. storefront with gold window mark at dusk', 'dphilhower-studio' ),
					'phone' => false,
				),
			),
		),
		'casa-forno'         => array(
			'title' => __( 'Window, pack, homepage', 'dphilhower-studio' ),
			'copy'  => __( 'Gold seal on glass. Oil and ragù carry weight, keep, and lot. The homepage uses the same wine and gold as the menu. Studio identity — Morris County, NJ.', 'dphilhower-studio' ),
			'items' => array(
				array(
					'file'  => 'casa-forno-print-window.png',
					'alt'   => __( 'Casa Forno brick trattoria at dusk with the gold CF seal on the window', 'dphilhower-studio' ),
					'phone' => false,
				),
				array(
					'file'  => 'casa-forno-phone.png',
					'alt'   => __( 'Phone showing the Casa Forno homepage', 'dphilhower-studio' ),
					'phone' => true,
				),
				array(
					'file'  => 'casa-forno-print-pack.png',
					'alt'   => __( 'Casa Forno olive oil bottle and house ragù takeaway box with the official seal', 'dphilhower-studio' ),
					'phone' => false,
				),
			),
		),
	);
}

/**
 * Render the four-step process for a restaurant slug.
 *
 * @param string $slug Work slug.
 */
function dps_render_brand_process( $slug ) {
	$all = dps_brand_processes();
	if ( empty( $all[ $slug ] ) ) {
		return;
	}
	$proc = $all[ $slug ];
	?>
<section class="brand-kit brand-process" id="process">
	<p class="section-label"><?php esc_html_e( 'Full process', 'dphilhower-studio' ); ?></p>
	<h2 class="section-title is-wide"><?php echo esc_html( $proc['title'] ); ?></h2>
	<p class="section-copy is-wide"><?php echo esc_html( $proc['intro'] ); ?></p>
	<div class="process">
		<?php foreach ( $proc['steps'] as $step ) : ?>
			<div class="process-step">
				<span class="process-num"><?php echo esc_html( $step['num'] ); ?></span>
				<strong><?php echo esc_html( $step['title'] ); ?></strong>
				<p><?php echo esc_html( $step['copy'] ); ?></p>
			</div>
		<?php endforeach; ?>
	</div>
</section>
	<?php
}

/**
 * Render mark / color / type for a restaurant slug.
 *
 * @param string $slug Work slug.
 * @param bool   $show_board Whether to show the photographed identity board.
 */
function dps_render_identity_kit( $slug, $show_board = true ) {
	$all = dps_identity_kits();
	if ( empty( $all[ $slug ] ) ) {
		return;
	}
	$kit = $all[ $slug ];
	?>
<section class="brand-kit identity-kit">
	<p class="section-label"><?php esc_html_e( 'The kit', 'dphilhower-studio' ); ?></p>
	<h2 class="section-title"><?php esc_html_e( 'Mark, color, type', 'dphilhower-studio' ); ?></h2>
	<?php if ( $show_board && ! empty( $kit['board'] ) ) : ?>
		<figure class="kit-board">
			<img src="<?php echo esc_url( dps_image_url( $kit['board'] ) ); ?>" alt="<?php echo esc_attr( $kit['board_alt'] ); ?>" width="1536" height="1024">
		</figure>
	<?php endif; ?>
	<div class="kit-panel">
		<p class="kit-wordmark"><?php echo esc_html( $kit['wordmark'] ); ?><span><?php echo esc_html( $kit['wordmark_span'] ); ?></span></p>
		<p class="section-copy" style="margin-bottom:0"><?php echo esc_html( $kit['blurb'] ); ?></p>
		<div class="swatches">
			<?php foreach ( $kit['swatches'] as $swatch ) : ?>
				<div class="swatch <?php echo esc_attr( $swatch['class'] ); ?>"><b><?php echo esc_html( $swatch['name'] ); ?></b><?php echo esc_html( $swatch['hex'] ); ?></div>
			<?php endforeach; ?>
		</div>
		<div class="type-row">
			<div class="type-card">
				<small><?php echo esc_html( $kit['display_label'] ); ?></small>
				<p class="type-display"><?php echo esc_html( $kit['display_sample'] ); ?></p>
				<p><?php echo esc_html( $kit['display_note'] ); ?></p>
			</div>
			<div class="type-card">
				<small><?php echo esc_html( $kit['body_label'] ); ?></small>
				<p><?php echo esc_html( $kit['body_note'] ); ?></p>
			</div>
		</div>
	</div>
</section>
	<?php
}

/**
 * Render window / pack / phone stills.
 *
 * @param string $slug Work slug.
 */
function dps_render_touchpoints( $slug ) {
	$all = dps_brand_touchpoints();
	if ( empty( $all[ $slug ] ) ) {
		return;
	}
	$touch = $all[ $slug ];
	?>
<section class="brand-kit">
	<p class="section-label"><?php esc_html_e( 'In the hand / on the phone', 'dphilhower-studio' ); ?></p>
	<h2 class="section-title"><?php echo esc_html( $touch['title'] ); ?></h2>
	<div class="touch-grid">
		<?php foreach ( $touch['items'] as $item ) : ?>
			<figure class="touch-card<?php echo ! empty( $item['phone'] ) ? ' touch-phone' : ''; ?>">
				<img src="<?php echo esc_url( dps_image_url( $item['file'] ) ); ?>" alt="<?php echo esc_attr( $item['alt'] ); ?>" width="<?php echo ! empty( $item['phone'] ) ? '1024' : '1536'; ?>" height="<?php echo ! empty( $item['phone'] ) ? '1536' : '1024'; ?>">
			</figure>
		<?php endforeach; ?>
	</div>
	<p class="section-copy" style="margin:1.25rem 0 0"><?php echo esc_html( $touch['copy'] ); ?></p>
</section>
	<?php
}
