<?php
/**
 * Template Name: About
 *
 * @package DPhilhowerStudio
 */

get_header();

$about_src = has_post_thumbnail() ? get_the_post_thumbnail_url( get_the_ID(), 'full' ) : dps_image_url( 'about-desk.png' );
?>
<main id="main">
	<header class="page-hero">
		<h1><?php esc_html_e( 'About the studio', 'dphilhower-studio' ); ?></h1>
		<p><?php esc_html_e( 'David Philhower is a freelance graphic designer. Color and layout are the tools. Every job is a different problem, so every solution has to be different.', 'dphilhower-studio' ); ?></p>
	</header>
	<section class="section about-layout" style="padding-top:0">
		<div class="about-copy">
			<p><?php esc_html_e( 'Most of the work happens without a computer — pencil, marker, and paper first. Files come last. That is how a restaurant brand stays itself instead of inheriting the last shop’s template.', 'dphilhower-studio' ); ?></p>
			<p><?php esc_html_e( 'The studio specializes in small businesses, especially restaurants: identity, menus, packaging, and websites built from the ground up. Design is a labor of love, and so is food. You make the good food. We’ll design a brand that can stand next to it.', 'dphilhower-studio' ); ?></p>
			<p><?php esc_html_e( 'From 2018 to 2021 David was the graphic designer at Bville Pizza & Grill in Bernardsville — branding, menus, and the website. Freelance practice as D Philhower design has run since 2019. Associate of Arts in Graphic Design, Sussex County Community College, 2017–2019.', 'dphilhower-studio' ); ?></p>
			<p><?php esc_html_e( 'Work comes from Bernardsville, Morristown, and nearby Morris County towns that want a local partner, not a mill that retrofits one layout for the next restaurant.', 'dphilhower-studio' ); ?></p>
			<p><a class="btn btn-dark" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"><?php esc_html_e( 'Get in touch', 'dphilhower-studio' ); ?></a></p>
		</div>
		<div class="about-media">
			<img src="<?php echo esc_url( $about_src ); ?>" alt="<?php esc_attr_e( 'Analog studio desk: markers, tracing paper, terracotta and olive color chips', 'dphilhower-studio' ); ?>" width="1536" height="1024">
		</div>
	</section>
</main>
<?php
get_footer();
