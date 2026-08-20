<?php
/**
 * Closing CTA.
 *
 * @package DPhilhowerStudio
 */

$contact = get_page_by_path( 'contact' );
$url     = $contact ? get_permalink( $contact ) : home_url( '/contact/' );
?>
<section class="cta-band">
	<div class="cta-band-inner">
		<h2><?php esc_html_e( 'Ready for a clearer brand and site?', 'dphilhower-studio' ); ?></h2>
		<p><?php esc_html_e( 'Tell us what you’re building. We’ll reply with next steps and a sense of fit for graphic design, website design, or both.', 'dphilhower-studio' ); ?></p>
		<a class="btn btn-primary" href="<?php echo esc_url( $url ); ?>"><?php esc_html_e( 'Contact the studio', 'dphilhower-studio' ); ?></a>
	</div>
</section>
