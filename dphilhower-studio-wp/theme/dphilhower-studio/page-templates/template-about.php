<?php
/**
 * Template Name: About
 *
 * @package DPhilhowerStudio
 */

get_header();

$about_src = dps_image_url( 'ember-menu-after.png' );
?>
<main id="main">
	<header class="page-hero">
		<h1><?php esc_html_e( 'About the studio', 'dphilhower-studio' ); ?></h1>
		<p><?php esc_html_e( 'We help independent restaurants look as exceptional as the food they serve. The first conversation is at your table.', 'dphilhower-studio' ); ?></p>
	</header>
	<section class="section about-layout" style="padding-top:0">
		<div class="about-copy">
			<p><?php esc_html_e( 'The first conversation is a meal, not a pitch. We sit at your restaurant — a two-top, the bar, or the pass — and talk the way hospitality people talk: who walks in, what they order, what the block already thinks you are.', 'dphilhower-studio' ); ?></p>
			<p><?php esc_html_e( 'Hospitality studios that last do discovery on the property. After the meal we write back what we heard, then draw and build so the room, the board, and the site feel like the same place. First talks are rarely about logos. They are about the guest, the food, and what has to live on glass.', 'dphilhower-studio' ); ?></p>
			<p><?php esc_html_e( 'Clear messaging over clutter. Modular systems over one-off assets. Collaboration over ego.', 'dphilhower-studio' ); ?></p>
			<p><?php esc_html_e( 'D Philhower Studio is David Philhower’s practice. From 2018 to 2021 he was the graphic designer at Bville Pizza & Grill in Bernardsville. Freelance work as D Philhower design has run since 2019. Associate of Arts in Graphic Design, Sussex County Community College, 2017–2019. Based in Morris County, New Jersey.', 'dphilhower-studio' ); ?></p>
			<p><a class="btn btn-dark" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"><?php esc_html_e( 'Invite us to the restaurant', 'dphilhower-studio' ); ?></a></p>
		</div>
		<div class="about-media">
			<img src="<?php echo esc_url( $about_src ); ?>" alt="<?php esc_attr_e( 'Cream restaurant menu on a table with a candle and a fork', 'dphilhower-studio' ); ?>" width="1536" height="1024">
		</div>
	</section>
</main>
<?php
get_footer();
