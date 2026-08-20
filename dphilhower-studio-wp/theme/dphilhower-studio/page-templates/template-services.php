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
		<p><?php esc_html_e( 'One studio for the mark you hand out and the site people find first. Built for Morris County businesses that need both to feel related.', 'dphilhower-studio' ); ?></p>
	</header>
	<section class="section" style="padding-top:0">
		<div class="service-list">
			<article class="service-row">
				<h2><?php esc_html_e( 'Brand identity', 'dphilhower-studio' ); ?></h2>
				<p><?php esc_html_e( 'Logos, type, color, and simple guidelines so every flyer, window, and Instagram post points to the same business. Strong fit for restaurants, shops, and professional services launching or refreshing.', 'dphilhower-studio' ); ?></p>
			</article>
			<article class="service-row">
				<h2><?php esc_html_e( 'Graphic design', 'dphilhower-studio' ); ?></h2>
				<p><?php esc_html_e( 'Menus, packaging, ads, event pieces, and print campaigns. We design for how things get printed and how they feel in someone’s hands—not only how they look on a screen.', 'dphilhower-studio' ); ?></p>
			</article>
			<article class="service-row">
				<h2><?php esc_html_e( 'Website design', 'dphilhower-studio' ); ?></h2>
				<p><?php esc_html_e( 'Custom marketing websites with clear structure, mobile-first layouts, and a visual system that matches your identity. Built to load quickly and make contact easy—including this WordPress theme for dphilhower.com.', 'dphilhower-studio' ); ?></p>
			</article>
			<article class="service-row">
				<h2><?php esc_html_e( 'Art direction', 'dphilhower-studio' ); ?></h2>
				<p><?php esc_html_e( 'Photo direction, layout systems, and campaign framing when you need the whole guest or customer journey to feel intentional—from the door to the homepage.', 'dphilhower-studio' ); ?></p>
			</article>
		</div>
	</section>
	<?php get_template_part( 'template-parts/cta-band' ); ?>
</main>
<?php
get_footer();
