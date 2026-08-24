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
		<p><?php esc_html_e( 'We help independent restaurants look as exceptional as the food they serve.', 'dphilhower-studio' ); ?></p>
	</header>
	<section class="section about-layout" style="padding-top:0">
		<div class="about-copy">
			<p><?php esc_html_e( 'Identity, menus, windows, and websites for independent restaurants — so the room, the board, and the site feel like the same place.', 'dphilhower-studio' ); ?></p>
			<p><?php esc_html_e( 'Design is more than decoration — it’s communication. We begin every project with deep discovery, aligning your goals with your audience’s needs. The process blends strategic thinking with artistic intuition, so every pixel has purpose.', 'dphilhower-studio' ); ?></p>
			<p><?php esc_html_e( 'We believe in clear messaging over clutter, modular systems over one-off assets, and collaboration over ego.', 'dphilhower-studio' ); ?></p>
			<p><?php esc_html_e( 'D Philhower Studio is David Philhower’s practice. From 2018 to 2021 he was the graphic designer at Bville Pizza & Grill in Bernardsville. Freelance work as D Philhower design has run since 2019. Associate of Arts in Graphic Design, Sussex County Community College, 2017–2019. Based in Morris County, New Jersey.', 'dphilhower-studio' ); ?></p>
			<p><a class="btn btn-dark" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"><?php esc_html_e( 'Let’s start a conversation', 'dphilhower-studio' ); ?></a></p>
		</div>
		<div class="about-media">
			<img src="<?php echo esc_url( $about_src ); ?>" alt="<?php esc_attr_e( 'Analog studio desk: markers, tracing paper, terracotta and olive color chips', 'dphilhower-studio' ); ?>" width="1536" height="1024">
		</div>
	</section>
</main>
<?php
get_footer();
