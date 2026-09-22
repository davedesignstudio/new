<?php
/**
 * Work archive.
 *
 * @package DPhilhowerStudio
 */

get_header();

$by_slug = array();
if ( have_posts() ) {
	while ( have_posts() ) {
		the_post();
		$by_slug[ get_post_field( 'post_name', get_the_ID() ) ] = get_post();
	}
	rewind_posts();
}

$restaurant_slugs = dps_full_restaurant_slugs();
$other_slugs      = array_values( array_diff( dps_work_archive_slugs(), $restaurant_slugs ) );
?>
<main id="main">
	<header class="page-hero">
		<h1><?php esc_html_e( 'Brands', 'dphilhower-studio' ); ?></h1>
		<p><?php esc_html_e( 'Eight restaurants with the full process and full branding — then coffee, deli, ice cream, and the rest of the marks. Including in-house design for Bville Pizza & Grill, 2018–2021.', 'dphilhower-studio' ); ?></p>
	</header>
	<section class="section" style="padding-top:0">
		<p class="section-label"><?php esc_html_e( 'Restaurants', 'dphilhower-studio' ); ?></p>
		<h2 class="section-title is-wide"><?php esc_html_e( 'Full process, full branding', 'dphilhower-studio' ); ?></h2>
		<div class="work-grid is-trio">
			<?php
			foreach ( $restaurant_slugs as $slug ) {
				if ( empty( $by_slug[ $slug ] ) ) {
					continue;
				}
				$GLOBALS['post'] = $by_slug[ $slug ];
				setup_postdata( $GLOBALS['post'] );
				get_template_part( 'template-parts/work-card' );
			}
			wp_reset_postdata();
			?>
		</div>
	</section>
	<section class="section">
		<p class="section-label"><?php esc_html_e( 'Also in the studio', 'dphilhower-studio' ); ?></p>
		<h2 class="section-title is-wide"><?php esc_html_e( 'The rest of the marks', 'dphilhower-studio' ); ?></h2>
		<div class="work-grid">
			<?php
			foreach ( $other_slugs as $slug ) {
				if ( empty( $by_slug[ $slug ] ) ) {
					continue;
				}
				$GLOBALS['post'] = $by_slug[ $slug ];
				setup_postdata( $GLOBALS['post'] );
				get_template_part( 'template-parts/work-card' );
			}
			wp_reset_postdata();
			?>
		</div>
	</section>
</main>
<?php
get_footer();
