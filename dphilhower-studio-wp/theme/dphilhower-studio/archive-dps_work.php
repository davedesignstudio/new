<?php
/**
 * Work archive.
 *
 * @package DPhilhowerStudio
 */

get_header();
?>
<main id="main">
	<header class="page-hero">
		<h1><?php esc_html_e( 'Brands', 'dphilhower-studio' ); ?></h1>
		<p><?php esc_html_e( 'We help independent restaurants look as exceptional as the food they serve. Identities built to live in the window, starting with a meal at the restaurant — including in-house design for Bville Pizza & Grill, 2018–2021.', 'dphilhower-studio' ); ?></p>
	</header>
	<section class="section" style="padding-top:0">
		<div class="work-grid">
			<?php
			if ( have_posts() ) :
				while ( have_posts() ) :
					the_post();
					get_template_part( 'template-parts/work-card' );
				endwhile;
			endif;
			?>
		</div>
	</section>
</main>
<?php
get_footer();
