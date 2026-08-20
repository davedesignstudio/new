<?php
/**
 * Fallback index.
 *
 * @package DPhilhowerStudio
 */

get_header();
?>
<main id="main">
	<header class="page-hero">
		<h1><?php echo esc_html( get_the_archive_title() ? wp_strip_all_tags( get_the_archive_title() ) : get_bloginfo( 'name' ) ); ?></h1>
		<p><?php echo esc_html( get_the_archive_description() ? wp_strip_all_tags( get_the_archive_description() ) : get_bloginfo( 'description' ) ); ?></p>
	</header>
	<div class="section" style="padding-top:0">
		<?php if ( have_posts() ) : ?>
			<?php
			while ( have_posts() ) :
				the_post();
				?>
				<article <?php post_class( 'service-row' ); ?>>
					<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
					<div><?php the_excerpt(); ?></div>
				</article>
			<?php endwhile; ?>
			<?php the_posts_pagination(); ?>
		<?php else : ?>
			<p><?php esc_html_e( 'Nothing to show yet.', 'dphilhower-studio' ); ?></p>
		<?php endif; ?>
	</div>
</main>
<?php
get_footer();
