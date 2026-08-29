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
		<h2><?php esc_html_e( 'Let’s sit down', 'dphilhower-studio' ); ?></h2>
		<p><?php esc_html_e( 'Invite us to the restaurant. We will eat, listen, and write back what we heard before we draw a line. If the food is already there, the look should catch up.', 'dphilhower-studio' ); ?></p>
		<a class="btn btn-primary" href="<?php echo esc_url( $url ); ?>"><?php esc_html_e( 'Invite the studio', 'dphilhower-studio' ); ?></a>
	</div>
</section>
