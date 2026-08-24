<?php
/**
 * Closing CTA.
 *
 * @package DPhilhowerStudio
 */

$contact = get_page_by_path( 'contact' );
$url     = $contact ? get_permalink( $contact ) : home_url( '/contact/' );
?>
<section class="cta-brand">
	<div class="cta-brand-inner">
		<h2><?php esc_html_e( 'Let’s build something together', 'dphilhower-studio' ); ?></h2>
		<p><?php esc_html_e( 'If the food is already there, the look should catch up. Tell us what you’re cooking, pouring, or plating.', 'dphilhower-studio' ); ?></p>
		<a class="btn btn-primary" href="<?php echo esc_url( $url ); ?>"><?php esc_html_e( 'Start a conversation', 'dphilhower-studio' ); ?></a>
	</div>
</section>
