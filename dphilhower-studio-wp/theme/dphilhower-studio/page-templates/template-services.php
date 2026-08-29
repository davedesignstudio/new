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
		<p><?php esc_html_e( 'We help independent restaurants look as exceptional as the food they serve. The work starts at your table — then identity, print, and the site have to work in the room.', 'dphilhower-studio' ); ?></p>
	</header>
	<div class="case-hero is-illustration">
		<img src="<?php echo esc_url( dps_image_url( 'studio-graphic-design.png' ) ); ?>" alt="<?php esc_attr_e( 'Graphic design tools: pen, type, color, and layout in one workspace', 'dphilhower-studio' ); ?>" width="1920" height="1296">
	</div>
	<section class="section" style="padding-top:0">
		<div class="service-list">
			<article class="service-row">
				<h2><?php esc_html_e( 'Identity that holds in the room', 'dphilhower-studio' ); ?></h2>
				<div class="service-body">
					<p><?php esc_html_e( 'Marks that hold on glass. Type you can read at the pass. Color that still looks like dinner on a bag. We do not start with a logo contest. We sit down at the restaurant, write what we heard, then draw a system that can move from the window to the phone without falling apart.', 'dphilhower-studio' ); ?></p>
					<ul>
						<li><?php esc_html_e( 'Restaurant identity', 'dphilhower-studio' ); ?></li>
						<li><?php esc_html_e( 'Type and color', 'dphilhower-studio' ); ?></li>
						<li><?php esc_html_e( 'Menus and boards', 'dphilhower-studio' ); ?></li>
						<li><?php esc_html_e( 'Windows and environmental', 'dphilhower-studio' ); ?></li>
						<li><?php esc_html_e( 'Print and takeaway', 'dphilhower-studio' ); ?></li>
					</ul>
				</div>
			</article>
			<article class="service-row">
				<h2><?php esc_html_e( 'Sites that feel like walking in', 'dphilhower-studio' ); ?></h2>
				<div class="service-body">
					<p><?php esc_html_e( 'The website should use the same voice as the window. Hours, menu, and the room — clear, fast, and built so you can change a special without calling a stranger.', 'dphilhower-studio' ); ?></p>
					<ul>
						<li><?php esc_html_e( 'Restaurant websites', 'dphilhower-studio' ); ?></li>
						<li><?php esc_html_e( 'Menu and hours that stay current', 'dphilhower-studio' ); ?></li>
						<li><?php esc_html_e( 'Same kit as the room', 'dphilhower-studio' ); ?></li>
						<li><?php esc_html_e( 'WordPress you can run', 'dphilhower-studio' ); ?></li>
						<li><?php esc_html_e( 'Fast on a phone in the parking lot', 'dphilhower-studio' ); ?></li>
					</ul>
				</div>
			</article>
		</div>
	</section>
	<?php get_template_part( 'template-parts/process-section' ); ?>
	<?php get_template_part( 'template-parts/cta-brand' ); ?>
</main>
<?php
get_footer();
