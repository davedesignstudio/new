<?php
/**
 * Home.
 *
 * @package DPhilhowerStudio
 */

get_header();

$hero_id  = absint( get_theme_mod( 'dps_hero_image' ) );
$hero_src = $hero_id ? wp_get_attachment_image_url( $hero_id, 'dps-hero' ) : dps_image_url( 'hero-editorial.jpg' );
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
			<img src="<?php echo esc_url( $hero_src ); ?>" alt="" width="1800" height="1200">
		</div>
		<div class="hero-content">
			<p class="hero-brand"><?php echo esc_html( dps_mod( 'dps_hero_title', 'D Philhower Studio' ) ); ?></p>
			<h1 class="hero-line"><?php echo esc_html( dps_mod( 'dps_hero_line', 'Graphic design and websites that feel like one system.' ) ); ?></h1>
			<p class="hero-support"><?php echo esc_html( dps_mod( 'dps_hero_support', 'A design studio serving Morristown and the surrounding Morris County area—identity, print, and custom web for local brands that want to look intentional.' ) ); ?></p>
			<div class="cta-row">
				<a class="btn btn-primary" href="<?php echo esc_url( $work_url ); ?>"><?php esc_html_e( 'View work', 'dphilhower-studio' ); ?></a>
				<a class="btn btn-ghost" href="<?php echo esc_url( $contact_url ); ?>"><?php esc_html_e( 'Start a project', 'dphilhower-studio' ); ?></a>
			</div>
		</div>
	</section>

	<section class="section">
		<p class="section-label"><?php esc_html_e( 'Selected work', 'dphilhower-studio' ); ?></p>
		<h2 class="section-title"><?php esc_html_e( 'Brands and sites built to last', 'dphilhower-studio' ); ?></h2>
		<p class="section-copy"><?php esc_html_e( 'From restaurant identities to marketing websites, each project starts with how the business should feel—then the mark, materials, and site follow.', 'dphilhower-studio' ); ?></p>
		<div class="work-grid is-home">
			<?php
			$works = new WP_Query(
				array(
					'post_type'      => 'dps_work',
					'posts_per_page' => 3,
					'orderby'        => 'menu_order date',
					'order'          => 'ASC',
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
		<h2 class="section-title"><?php esc_html_e( 'How projects move', 'dphilhower-studio' ); ?></h2>
		<p class="section-copy"><?php esc_html_e( 'Clear steps, fewer surprises. The mark and the website are designed together so nothing feels bolted on later.', 'dphilhower-studio' ); ?></p>
		<div class="process">
			<div class="process-step">
				<strong><?php esc_html_e( '1. Listen', 'dphilhower-studio' ); ?></strong>
				<p><?php esc_html_e( 'We map your audience, competitors around Morristown, and what needs to change—online and in print.', 'dphilhower-studio' ); ?></p>
			</div>
			<div class="process-step">
				<strong><?php esc_html_e( '2. Shape', 'dphilhower-studio' ); ?></strong>
				<p><?php esc_html_e( 'Direction, type, color, and layout explorations until the system feels like your business.', 'dphilhower-studio' ); ?></p>
			</div>
			<div class="process-step">
				<strong><?php esc_html_e( '3. Build', 'dphilhower-studio' ); ?></strong>
				<p><?php esc_html_e( 'Final files, a responsive site, and handoff notes so you can keep growing the brand.', 'dphilhower-studio' ); ?></p>
			</div>
		</div>
	</section>

	<section class="section locale">
		<div class="locale-panel">
			<h2><?php esc_html_e( 'Based around Morristown, NJ', 'dphilhower-studio' ); ?></h2>
			<p><?php esc_html_e( 'D Philhower Studio works with owners across Morris County and nearby towns who want design that reads as local craft—not a template from somewhere else.', 'dphilhower-studio' ); ?></p>
			<ul>
				<li>Morristown · Madison · Chatham</li>
				<li>Bernardsville · Mendham · Randolph</li>
				<li><?php esc_html_e( 'And surrounding Morris County', 'dphilhower-studio' ); ?></li>
			</ul>
		</div>
		<div class="locale-media">
			<img src="<?php echo esc_url( dps_image_url( 'street.jpg' ) ); ?>" alt="<?php esc_attr_e( 'Tree-lined downtown street atmosphere', 'dphilhower-studio' ); ?>" width="1600" height="1067">
		</div>
	</section>

	<?php get_template_part( 'template-parts/cta-band' ); ?>
</main>
<?php
get_footer();
