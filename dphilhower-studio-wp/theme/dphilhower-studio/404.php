<?php
/**
 * 404.
 *
 * @package DPhilhowerStudio
 */

get_header();
?>
<main id="main">
	<header class="page-hero">
		<h1><?php esc_html_e( 'Page not found', 'dphilhower-studio' ); ?></h1>
		<p><?php esc_html_e( 'That URL is not in the studio site. Try the work index or send a note instead.', 'dphilhower-studio' ); ?></p>
	</header>
	<div class="error-panel">
		<a class="btn btn-dark" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Back home', 'dphilhower-studio' ); ?></a>
		<a class="btn btn-outline" href="<?php echo esc_url( get_post_type_archive_link( 'dps_work' ) ); ?>"><?php esc_html_e( 'View work', 'dphilhower-studio' ); ?></a>
	</div>
</main>
<?php
get_footer();
