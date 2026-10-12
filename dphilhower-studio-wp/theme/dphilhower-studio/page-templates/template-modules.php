<?php
/**
 * Template Name: Modular brand pieces
 *
 * Six pieces on one frame. Swap the mark or the color chord and the menu,
 * window, pack, and kitchen ticket stay fitted.
 *
 * @package DPhilhowerStudio
 */

get_header();

$resolved = dps_design_resolve( 'ember' );
?>
<main id="main">
	<header class="page-hero modules-hero">
		<p class="section-label"><?php esc_html_e( 'Modular pieces', 'dphilhower-studio' ); ?></p>
		<h1><?php esc_html_e( 'A custom restaurant, built from pieces that fit.', 'dphilhower-studio' ); ?></h1>
		<p><?php esc_html_e( 'One frame holds six pieces: a mark, a color chord, a menu sheet, a window band, a pack label, and a kitchen ticket. Swap the mark or the chord. The menu, the window, the pack, and the ticket stay aligned.', 'dphilhower-studio' ); ?></p>
	</header>

	<section class="section" id="assemble" style="padding-top:0">
		<div id="module-bench">
			<?php echo dps_design_switches_html(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped in the builder. ?>
			<p class="assembly-readout" id="assembly-readout" aria-live="polite"><?php echo esc_html( dps_design_readout( $resolved ) ); ?></p>
			<?php echo dps_design_assembly_html( $resolved ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped in the builder. ?>
		</div>

		<div class="piece-key">
			<?php foreach ( dps_design_pieces() as $piece ) : ?>
				<article>
					<h3><?php echo esc_html( $piece['title'] ); ?></h3>
					<p><?php echo esc_html( $piece['copy'] ); ?></p>
				</article>
			<?php endforeach; ?>
		</div>

		<p class="modules-note"><?php esc_html_e( 'Ember, Casa Forno, Salt & Cedar, Mizu, Juniper, and Kiln are studio identities. They show how the pieces fit. They are not live accounts. A placed order still prints from the order desk.', 'dphilhower-studio' ); ?></p>
		<p class="cta-row">
			<a class="btn btn-primary" href="<?php echo esc_url( home_url( '/order/' ) ); ?>"><?php esc_html_e( 'Open the order system', 'dphilhower-studio' ); ?></a>
		</p>
	</section>
</main>
<?php
get_footer();
