<?php
/**
 * Template Name: Services
 *
 * @package DPhilhowerStudio
 */

get_header();
?>
<main id="main">
	<header class="page-hero">
		<h1><?php esc_html_e( 'Services', 'dphilhower-studio' ); ?></h1>
		<p><?php esc_html_e( 'Brands for small businesses, specializing in restaurants — built from the ground up, not one layout retrofitted for the next shop.', 'dphilhower-studio' ); ?></p>
	</header>
	<section class="section" style="padding-top:0">
		<div class="service-list">
			<article class="service-row">
				<h2><?php esc_html_e( 'Brand identity', 'dphilhower-studio' ); ?></h2>
				<p><?php esc_html_e( 'Logos, type, and color drawn for that business. Strong fit for restaurants and shops that need the window, the menu, and the takeaway to say the same name.', 'dphilhower-studio' ); ?></p>
			</article>
			<article class="service-row">
				<h2><?php esc_html_e( 'Graphic design', 'dphilhower-studio' ); ?></h2>
				<p><?php esc_html_e( 'Menus, packaging, window graphics, and print. Designed for how things get printed and how they feel in someone’s hands — most of it starts on paper.', 'dphilhower-studio' ); ?></p>
			</article>
			<article class="service-row">
				<h2><?php esc_html_e( 'Website design', 'dphilhower-studio' ); ?></h2>
				<p><?php esc_html_e( 'Custom marketing sites that match the identity already on the board. Built to load quickly and make contact easy — including this WordPress theme for dphilhower.com.', 'dphilhower-studio' ); ?></p>
			</article>
			<article class="service-row">
				<h2><?php esc_html_e( 'Art direction', 'dphilhower-studio' ); ?></h2>
				<p><?php esc_html_e( 'Photo direction, layout systems, and campaign framing when you need the whole guest or customer journey to feel intentional—from the door to the homepage.', 'dphilhower-studio' ); ?></p>
			</article>
		</div>
	</section>
	<?php get_template_part( 'template-parts/cta-brand' ); ?>
</main>
<?php
get_footer();
