<?php
/**
 * Single project.
 *
 * @package DPhilhowerStudio
 */

get_header();
?>
<main id="main">
	<?php
	while ( have_posts() ) :
		the_post();
		$client   = get_post_meta( get_the_ID(), '_dps_client', true );
		$services = get_post_meta( get_the_ID(), '_dps_services', true );
		$year     = get_post_meta( get_the_ID(), '_dps_year', true );
		$location = get_post_meta( get_the_ID(), '_dps_location', true );
		?>
		<header class="page-hero">
			<p class="section-label"><?php esc_html_e( 'Selected work', 'dphilhower-studio' ); ?></p>
			<h1><?php the_title(); ?></h1>
			<?php if ( has_excerpt() ) : ?>
				<p><?php echo esc_html( get_the_excerpt() ); ?></p>
			<?php endif; ?>
		</header>
		<?php if ( has_post_thumbnail() ) : ?>
			<div class="case-hero">
				<?php the_post_thumbnail( 'full' ); ?>
			</div>
		<?php endif; ?>
		<article class="case-body">
			<ul class="case-meta">
				<?php if ( $client ) : ?>
					<li><strong><?php esc_html_e( 'Client', 'dphilhower-studio' ); ?></strong><br><?php echo esc_html( $client ); ?></li>
				<?php endif; ?>
				<?php if ( $services ) : ?>
					<li><strong><?php esc_html_e( 'Services', 'dphilhower-studio' ); ?></strong><br><?php echo esc_html( $services ); ?></li>
				<?php endif; ?>
				<?php if ( $year ) : ?>
					<li><strong><?php esc_html_e( 'Year', 'dphilhower-studio' ); ?></strong><br><?php echo esc_html( $year ); ?></li>
				<?php endif; ?>
				<?php if ( $location ) : ?>
					<li><strong><?php esc_html_e( 'Location', 'dphilhower-studio' ); ?></strong><br><?php echo esc_html( $location ); ?></li>
				<?php endif; ?>
			</ul>
			<div class="entry-content">
				<?php the_content(); ?>
			</div>
			<?php
			$slug = get_post_field( 'post_name', get_the_ID() );
			if ( 'ember-pie-co' === $slug ) {
				get_template_part( 'template-parts/brand-kit-ember' );
			} else {
				dps_render_brand_kit( $slug );
			}
			?>
			<p><a class="btn btn-outline" href="<?php echo esc_url( get_post_type_archive_link( 'dps_work' ) ); ?>"><?php esc_html_e( 'All work', 'dphilhower-studio' ); ?></a></p>
		</article>
	<?php endwhile; ?>
	<?php get_template_part( 'template-parts/cta-brand' ); ?>
</main>
<?php
get_footer();
