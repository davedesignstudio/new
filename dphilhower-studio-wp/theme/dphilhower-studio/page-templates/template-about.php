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
		<p><?php esc_html_e( 'D Philhower Studio is a graphic and website design practice rooted in northern New Jersey, working with clients in and around Morristown.', 'dphilhower-studio' ); ?></p>
	</header>
	<section class="section about-layout" style="padding-top:0">
		<div class="about-copy">
			<p><?php esc_html_e( 'Every design problem is different—so the solution should be too. The studio focuses on color, layout, and craft that solve real business needs: a clearer brand, a site that converts curiosity into contact, materials that feel worth keeping.', 'dphilhower-studio' ); ?></p>
			<p><?php esc_html_e( 'Hospitality and small business work is a particular strength—building restaurant and retail brands from the ground up so the identity, menu, and website all speak the same language.', 'dphilhower-studio' ); ?></p>
			<p><?php esc_html_e( 'Clients come from Morristown, Madison, Bernardsville, Mendham, Randolph, and nearby towns across Morris County who want a local partner instead of a distant template mill.', 'dphilhower-studio' ); ?></p>
			<p><a class="btn btn-dark" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"><?php esc_html_e( 'Get in touch', 'dphilhower-studio' ); ?></a></p>
		</div>
		<div class="about-media">
			<img src="<?php echo esc_url( $about_src ); ?>" alt="<?php esc_attr_e( 'Collaborative design work session', 'dphilhower-studio' ); ?>" width="1536" height="1024">
		</div>
	</section>
</main>
<?php
get_footer();
