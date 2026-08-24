<?php
/**
 * Template Name: Contact
 *
 * @package DPhilhowerStudio
 */

get_header();
$email    = dps_contact_email();
$phone    = dps_mod( 'dps_phone', '' );
$location = dps_mod( 'dps_location', 'Morris County, NJ' );
?>
<main id="main">
	<header class="page-hero">
		<h1><?php esc_html_e( 'Let’s build something together', 'dphilhower-studio' ); ?></h1>
		<p><?php esc_html_e( 'If the food is already there, the look should catch up. Tell us what you’re cooking, pouring, or plating.', 'dphilhower-studio' ); ?></p>
	</header>
	<section class="section contact-layout" style="padding-top:0">
		<div class="contact-details">
			<p><strong><?php esc_html_e( 'Studio', 'dphilhower-studio' ); ?></strong><br>D Philhower Studio<br><?php echo esc_html( $location ); ?></p>
			<p><strong><?php esc_html_e( 'Web', 'dphilhower-studio' ); ?></strong><br><a href="<?php echo esc_url( home_url( '/' ) ); ?>">dphilhower.com</a></p>
			<p><strong><?php esc_html_e( 'Email', 'dphilhower-studio' ); ?></strong><br><a href="mailto:<?php echo esc_attr( $email ); ?>"><?php echo esc_html( $email ); ?></a></p>
			<?php if ( $phone ) : ?>
				<p><strong><?php esc_html_e( 'Phone', 'dphilhower-studio' ); ?></strong><br><a href="tel:<?php echo esc_attr( preg_replace( '/[^0-9+]/', '', $phone ) ); ?>"><?php echo esc_html( $phone ); ?></a></p>
			<?php endif; ?>
			<p><?php esc_html_e( 'Typical projects: restaurant identity, menus, windows, websites, and print that has to hold up in the room.', 'dphilhower-studio' ); ?></p>
		</div>
		<?php dps_render_contact_form(); ?>
	</section>
</main>
<?php
get_footer();
