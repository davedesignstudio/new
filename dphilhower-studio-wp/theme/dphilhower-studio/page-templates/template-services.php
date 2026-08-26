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
		<p><?php esc_html_e( 'We help independent restaurants look as exceptional as the food they serve — identity, print, and websites that work in the room.', 'dphilhower-studio' ); ?></p>
	</header>
	<div class="case-hero is-illustration">
		<img src="<?php echo esc_url( dps_image_url( 'studio-graphic-design.png' ) ); ?>" alt="<?php esc_attr_e( 'Graphic design tools: pen, type, color, and layout in one workspace', 'dphilhower-studio' ); ?>" width="1920" height="1296">
	</div>
	<section class="section" style="padding-top:0">
		<div class="service-list">
			<article class="service-row">
				<h2><?php esc_html_e( 'Visual identity that lasts', 'dphilhower-studio' ); ?></h2>
				<div class="service-body">
					<p><?php esc_html_e( 'From logos to full brand systems, we craft identities that are timeless, flexible, and unmistakably yours. Every mark we make is rooted in meaning and built to endure.', 'dphilhower-studio' ); ?></p>
					<ul>
						<li><?php esc_html_e( 'Logo design', 'dphilhower-studio' ); ?></li>
						<li><?php esc_html_e( 'Typography and color systems', 'dphilhower-studio' ); ?></li>
						<li><?php esc_html_e( 'Brand guidelines', 'dphilhower-studio' ); ?></li>
						<li><?php esc_html_e( 'Print and digital collateral', 'dphilhower-studio' ); ?></li>
						<li><?php esc_html_e( 'Packaging and environmental design', 'dphilhower-studio' ); ?></li>
					</ul>
				</div>
			</article>
			<article class="service-row">
				<h2><?php esc_html_e( 'Websites that work beautifully', 'dphilhower-studio' ); ?></h2>
				<div class="service-body">
					<p><?php esc_html_e( 'Your website is your digital home. We design and develop responsive, accessible, and performance-optimized sites that reflect your brand and serve your users.', 'dphilhower-studio' ); ?></p>
					<ul>
						<li><?php esc_html_e( 'Custom website design', 'dphilhower-studio' ); ?></li>
						<li><?php esc_html_e( 'UX/UI strategy', 'dphilhower-studio' ); ?></li>
						<li><?php esc_html_e( 'Front-end development', 'dphilhower-studio' ); ?></li>
						<li><?php esc_html_e( 'CMS integration (WordPress, Webflow, and similar)', 'dphilhower-studio' ); ?></li>
						<li><?php esc_html_e( 'SEO and performance optimization', 'dphilhower-studio' ); ?></li>
					</ul>
				</div>
			</article>
			<article class="service-row">
				<h2><?php esc_html_e( 'Strategy meets soul', 'dphilhower-studio' ); ?></h2>
				<div class="service-body">
					<p><?php esc_html_e( 'Design is more than decoration — it’s communication. We begin every project with deep discovery, aligning your goals with your audience’s needs. Strategic thinking with artistic intuition, so every pixel has purpose.', 'dphilhower-studio' ); ?></p>
					<ul>
						<li><?php esc_html_e( 'Clear messaging over clutter', 'dphilhower-studio' ); ?></li>
						<li><?php esc_html_e( 'Modular systems over one-off assets', 'dphilhower-studio' ); ?></li>
						<li><?php esc_html_e( 'Collaboration over ego', 'dphilhower-studio' ); ?></li>
					</ul>
				</div>
			</article>
		</div>
	</section>
	<?php get_template_part( 'template-parts/cta-brand' ); ?>
</main>
<?php
get_footer();
