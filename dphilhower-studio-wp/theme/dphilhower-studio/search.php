<?php
/**
 * Search results.
 *
 * @package DPhilhowerStudio
 */

get_header();
?>
<main id="main">
	<header class="page-hero">
		<h1><?php printf( esc_html__( 'Search: %s', 'dphilhower-studio' ), esc_html( get_search_query() ) ); ?></h1>
	</header>
	<div class="section" style="padding-top:0">
		<?php if ( have_posts() ) : ?>
			<?php
			while ( have_posts() ) :
				the_post();
				?>
				<article class="service-row">
					<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
					<p><?php echo esc_html( wp_trim_words( get_the_excerpt(), 24 ) ); ?></p>
				</article>
			<?php endwhile; ?>
		<?php else : ?>
			<p><?php esc_html_e( 'No matches. Try a different word, or browse work.', 'dphilhower-studio' ); ?></p>
		<?php endif; ?>
	</div>
</main>
<?php
get_footer();
