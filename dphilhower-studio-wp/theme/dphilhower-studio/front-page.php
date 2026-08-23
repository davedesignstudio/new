<?php
/**
 * Home.
 *
 * @package DPhilhowerStudio
 */

get_header();

$hero_id  = absint( get_theme_mod( 'dps_hero_image' ) );
$hero_src = $hero_id ? wp_get_attachment_image_url( $hero_id, 'full' ) : dps_image_url( 'hero-editorial.png' );
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
			<img src="<?php echo esc_url( $hero_src ); ?>" alt="" width="1536" height="1024">
		</div>
		<div class="hero-content">
			<p class="hero-brand"><?php echo esc_html( dps_mod( 'dps_hero_title', 'D Philhower Studio' ) ); ?></p>
			<h1 class="hero-line"><?php echo esc_html( dps_mod( 'dps_hero_line', 'Restaurant brands built from the ground up — not one layout for the next shop.' ) ); ?></h1>
			<p class="hero-support"><?php echo esc_html( dps_mod( 'dps_hero_support', 'Identity, menus, and websites for local food businesses in Morris County and nearby towns. Most of the thinking happens off the computer. The files come last.' ) ); ?></p>
			<div class="cta-row">
				<a class="btn btn-primary" href="<?php echo esc_url( $work_url ); ?>"><?php esc_html_e( 'View work', 'dphilhower-studio' ); ?></a>
				<a class="btn btn-ghost" href="<?php echo esc_url( $contact_url ); ?>"><?php esc_html_e( 'Start a project', 'dphilhower-studio' ); ?></a>
			</div>
		</div>
	</section>

	<section class="section">
		<p class="section-label"><?php esc_html_e( 'Selected work', 'dphilhower-studio' ); ?></p>
		<h2 class="section-title"><?php esc_html_e( 'Marks from the board', 'dphilhower-studio' ); ?></h2>
		<p class="section-copy"><?php esc_html_e( 'Restaurant and local identities, including Bville Pizza & Grill in Bernardsville — in-house graphic design there from 2018 to 2021. All ten marks are on this page.', 'dphilhower-studio' ); ?></p>
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

	<section class="section">
		<p class="section-label"><?php esc_html_e( 'Process', 'dphilhower-studio' ); ?></p>
		<h2 class="section-title"><?php esc_html_e( 'How the work actually happens', 'dphilhower-studio' ); ?></h2>
		<p class="section-copy"><?php esc_html_e( 'Most of the studio’s work happens without a computer. Pencil first, files last — so the next restaurant does not inherit the last restaurant’s layout.', 'dphilhower-studio' ); ?></p>
		<div class="process">
			<div class="process-step">
				<strong><?php esc_html_e( '1. Pencil', 'dphilhower-studio' ); ?></strong>
				<p><?php esc_html_e( 'Sketch the problem on paper. Color, letterforms, and how the name should feel from the lot.', 'dphilhower-studio' ); ?></p>
			</div>
			<div class="process-step">
				<strong><?php esc_html_e( '2. Layout', 'dphilhower-studio' ); ?></strong>
				<p><?php esc_html_e( 'The pieces guests hold: menu, window, box, card. Built as one system, not three vendor templates.', 'dphilhower-studio' ); ?></p>
			</div>
			<div class="process-step">
				<strong><?php esc_html_e( '3. Files', 'dphilhower-studio' ); ?></strong>
				<p><?php esc_html_e( 'Then print files and the website, so the site matches the board — not a theme with a new logo dropped in.', 'dphilhower-studio' ); ?></p>
			</div>
		</div>
	</section>

	<section class="section locale">
		<div class="locale-panel">
			<h2><?php esc_html_e( 'Bernardsville, Morristown, Morris County', 'dphilhower-studio' ); ?></h2>
			<p><?php esc_html_e( 'David Philhower designs for owners who want a local partner — not a distant mill that retrofits one layout for the next shop.', 'dphilhower-studio' ); ?></p>
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

	<?php get_template_part( 'template-parts/cta-band' ); ?>
</main>
<?php
get_footer();
