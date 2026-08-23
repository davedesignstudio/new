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
		<h2><?php esc_html_e( 'You make the food. We’ll build the brand.', 'dphilhower-studio' ); ?></h2>
		<p><?php esc_html_e( 'Tell the studio what you’re cooking, pouring, or fixing. We’ll reply with next steps for identity, menus, print, or a site.', 'dphilhower-studio' ); ?></p>
		<a class="btn btn-primary" href="<?php echo esc_url( $url ); ?>"><?php esc_html_e( 'Contact the studio', 'dphilhower-studio' ); ?></a>
	</div>
</section>
