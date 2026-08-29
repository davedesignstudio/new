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
			<p class="hero-brand"><?php echo esc_html( dps_mod( 'dps_hero_title', 'D Philhower Studio' ) ); ?></p>
			<h1 class="hero-line"><?php echo esc_html( dps_mod( 'dps_hero_line', 'We help independent restaurants look as exceptional as the food they serve.' ) ); ?></h1>
			<p class="hero-support"><?php echo esc_html( dps_mod( 'dps_hero_support', 'Identity, menus, windows, and websites — so the room, the board, and the site feel like the same place.' ) ); ?></p>
			<div class="cta-row">
				<a class="btn btn-primary" href="<?php echo esc_url( $work_url ); ?>"><?php esc_html_e( 'View brands', 'dphilhower-studio' ); ?></a>
				<a class="btn btn-ghost" href="<?php echo esc_url( $contact_url ); ?>"><?php esc_html_e( 'Start a project', 'dphilhower-studio' ); ?></a>
			</div>
		</div>
	</section>

	<section class="section">
		<p class="section-label"><?php esc_html_e( 'Studio', 'dphilhower-studio' ); ?></p>
		<h2 class="section-title"><?php esc_html_e( 'The look should keep up with the kitchen', 'dphilhower-studio' ); ?></h2>
		<p class="section-copy"><?php esc_html_e( 'We help independent restaurants look as exceptional as the food they serve. Marks that hold on a window. Menus you can read. Sites that feel like walking in.', 'dphilhower-studio' ); ?></p>
	</section>

	<section class="section">
		<p class="section-label"><?php esc_html_e( 'Brands', 'dphilhower-studio' ); ?></p>
		<h2 class="section-title"><?php esc_html_e( 'Work that has to live in the world', 'dphilhower-studio' ); ?></h2>
		<p class="section-copy"><?php esc_html_e( 'Restaurant and local identities, including Bville Pizza & Grill in Bernardsville — in-house graphic design there from 2018 to 2021. All ten brands are on this page.', 'dphilhower-studio' ); ?></p>
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
		<h2 class="section-title"><?php esc_html_e( 'Strategy meets soul', 'dphilhower-studio' ); ?></h2>
		<p class="section-copy"><?php esc_html_e( 'Design is more than decoration — it’s communication. We begin every project with deep discovery, aligning your goals with your audience’s needs. Our process blends strategic thinking with artistic intuition, ensuring every pixel has purpose.', 'dphilhower-studio' ); ?></p>
		<div class="process">
			<div class="process-step">
				<strong><?php esc_html_e( 'Clear messaging', 'dphilhower-studio' ); ?></strong>
				<p><?php esc_html_e( 'Clear messaging over clutter. Say the thing, then stop.', 'dphilhower-studio' ); ?></p>
			</div>
			<div class="process-step">
				<strong><?php esc_html_e( 'Modular systems', 'dphilhower-studio' ); ?></strong>
				<p><?php esc_html_e( 'Modular systems over one-off assets. The window, the site, and the takeaway should be one voice.', 'dphilhower-studio' ); ?></p>
			</div>
			<div class="process-step">
				<strong><?php esc_html_e( 'Collaboration', 'dphilhower-studio' ); ?></strong>
				<p><?php esc_html_e( 'Collaboration over ego. We build with you, not at you.', 'dphilhower-studio' ); ?></p>
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

	<?php get_template_part( 'template-parts/cta-brand' ); ?>
</main>
<?php
get_footer();
