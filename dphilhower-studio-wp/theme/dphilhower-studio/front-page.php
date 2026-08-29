<?php
/**
 * Home.
 *
 * @package DPhilhowerStudio
 */

get_header();

$hero_id  = absint( get_theme_mod( 'dps_hero_image' ) );
$hero_src = $hero_id ? wp_get_attachment_image_url( $hero_id, 'full' ) : dps_image_url( 'studio-runner.png' );
$work_url = get_post_type_archive_link( 'dps_work' );
if ( ! $work_url ) {
	$work_url = home_url( '/work/' );
}
$contact = get_page_by_path( 'contact' );
$contact_url = $contact ? get_permalink( $contact ) : home_url( '/contact/' );
?>
<main id="main">
	<section class="hero">
		<div class="hero-media" aria-hidden="true">
			<img src="<?php echo esc_url( $hero_src ); ?>" alt="<?php esc_attr_e( 'Woman running with a loaf of bread and a coffee cup', 'dphilhower-studio' ); ?>" width="1318" height="1017">
		</div>
		<div class="hero-content">
			<p class="hero-brand">
				<img src="<?php echo esc_url( dps_image_url( 'd-philhower-lockup.png' ) ); ?>" alt="<?php echo esc_attr( dps_mod( 'dps_hero_title', 'D Philhower Studio' ) ); ?>" width="1426" height="522">
			</p>
			<h1 class="hero-line"><?php echo esc_html( dps_mod( 'dps_hero_line', 'We help independent restaurants look as exceptional as the food they serve.' ) ); ?></h1>
			<p class="hero-support"><?php echo esc_html( dps_mod( 'dps_hero_support', 'The first conversation is at your restaurant. Then identity, menus, windows, and the site become one place.' ) ); ?></p>
			<div class="cta-row">
				<a class="btn btn-primary" href="<?php echo esc_url( $work_url ); ?>"><?php esc_html_e( 'View brands', 'dphilhower-studio' ); ?></a>
				<a class="btn btn-ghost" href="<?php echo esc_url( $contact_url ); ?>"><?php esc_html_e( 'Invite us over', 'dphilhower-studio' ); ?></a>
			</div>
		</div>
	</section>

	<section class="section">
		<p class="section-label"><?php esc_html_e( 'Studio', 'dphilhower-studio' ); ?></p>
		<h2 class="section-title"><?php esc_html_e( 'We start at the table', 'dphilhower-studio' ); ?></h2>
		<p class="section-copy is-wide"><?php esc_html_e( 'The first conversation is a meal, not a pitch. We sit at your restaurant — a two-top, the bar, or the pass — and talk the way hospitality people talk: who walks in, what they order, what the block already thinks you are. From that table we write, draw, and build so guests recognize you before they sit down.', 'dphilhower-studio' ); ?></p>
	</section>

	<section class="section">
		<p class="section-label"><?php esc_html_e( 'Brands', 'dphilhower-studio' ); ?></p>
		<h2 class="section-title"><?php esc_html_e( 'Work that has to live in the world', 'dphilhower-studio' ); ?></h2>
		<p class="section-copy is-wide"><?php esc_html_e( 'Restaurant and local identities that have to live after that first meal — including Bville Pizza & Grill in Bernardsville, where David was in-house graphic designer from 2018 to 2021. All ten brands are on this page.', 'dphilhower-studio' ); ?></p>
		<div class="work-grid is-home">
			<?php
			$featured_ids = array();
			foreach ( array( 'ember-pie-co', 'bville-pizza-grill', 'ritual-cafe', 'bernardsville-deli', 'cow-lick', 'service-the-hills', 'magic-buds', 'philhower-okrogly', 'cafe-robust', 'expresso' ) as $featured_slug ) {
				$featured_post = get_page_by_path( $featured_slug, OBJECT, 'dps_work' );
				if ( $featured_post ) {
					$featured_ids[] = $featured_post->ID;
				}
			}
			$works = new WP_Query(
				array(
					'post_type'      => 'dps_work',
					'post__in'       => $featured_ids ? $featured_ids : array( 0 ),
					'orderby'        => 'post__in',
					'posts_per_page' => 10,
				)
			);
			if ( $works->have_posts() ) :
				while ( $works->have_posts() ) :
					$works->the_post();
					get_template_part( 'template-parts/work-card' );
				endwhile;
				wp_reset_postdata();
			endif;
			?>
		</div>
	</section>

	<?php get_template_part( 'template-parts/process-section' ); ?>

	<section class="section locale">
		<div class="locale-panel">
			<h2><?php esc_html_e( 'Bernardsville, Morristown, Morris County', 'dphilhower-studio' ); ?></h2>
			<p><?php esc_html_e( 'David Philhower designs for owners who want a local partner. The first meeting is at your restaurant — in Bernardsville, Morristown, or the next town over — not a distant mill that retrofits one layout for the next shop.', 'dphilhower-studio' ); ?></p>
			<ul>
				<li>Bernardsville · Morristown · Madison</li>
				<li>Mendham · Randolph · Chatham</li>
				<li><?php esc_html_e( 'And surrounding Morris County', 'dphilhower-studio' ); ?></li>
			</ul>
		</div>
		<div class="locale-media">
			<img src="<?php echo esc_url( dps_image_url( 'street.png' ) ); ?>" alt="<?php esc_attr_e( 'Tree-lined downtown street atmosphere', 'dphilhower-studio' ); ?>" width="1536" height="1024">
		</div>
	</section>

	<?php get_template_part( 'template-parts/cta-brand' ); ?>
</main>
<?php
get_footer();
