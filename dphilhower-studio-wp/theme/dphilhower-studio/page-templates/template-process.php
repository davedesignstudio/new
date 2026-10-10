<?php
/**
 * Template Name: Process — Room Method
 *
 * @package DPhilhowerStudio
 */

get_header();
?>
<main id="main">
	<header class="page-hero">
		<p class="section-label"><?php esc_html_e( 'Studio process', 'dphilhower-studio' ); ?></p>
		<h1><?php esc_html_e( 'The Room Method', 'dphilhower-studio' ); ?></h1>
		<p><?php esc_html_e( 'An original graphic + web process for hospitality. Informed by Double Diamond, design thinking, identity practice, and William Golden’s reduction — fused into one path that fits restaurants, print, and the web as one system.', 'dphilhower-studio' ); ?></p>
	</header>
	<div class="case-hero room-plate">
		<img src="<?php echo esc_url( dps_image_url( 'studio-shear-method.png' ) ); ?>" alt="<?php esc_attr_e( 'The Room Method: Sit, Say, Scatter, Shear, Stage, Ship', 'dphilhower-studio' ); ?>" width="1280" height="720">
	</div>
	<section class="section reveal" style="padding-top:0">
		<p class="section-label"><?php esc_html_e( 'What we studied', 'dphilhower-studio' ); ?></p>
		<h2 class="section-title is-wide"><?php esc_html_e( 'Not a borrowed deck', 'dphilhower-studio' ); ?></h2>
		<p class="section-copy is-wide"><?php esc_html_e( 'Double Diamond maps problem and solution. Design thinking centers users. Identity books stop at guidelines. Golden cut until one idea remained. This studio’s habit starts at the table. The Room Method maps hospitality surfaces — table → glass → pack → screen — and requires Shear before anything goes public.', 'dphilhower-studio' ); ?></p>
	</section>
	<section class="section reveal" id="room-method">
		<p class="section-label"><?php esc_html_e( 'Six stages', 'dphilhower-studio' ); ?></p>
		<h2 class="section-title is-wide"><?php esc_html_e( 'Sit → Say → Scatter → Shear → Stage → Ship', 'dphilhower-studio' ); ?></h2>
		<p class="section-copy is-wide"><?php esc_html_e( 'Loops are allowed. Stage can send you back to Shear. Ship feedback returns to Stage. Only a new room restarts Sit.', 'dphilhower-studio' ); ?></p>
		<?php get_template_part( 'template-parts/process-steps' ); ?>
	</section>
	<section class="section reveal">
		<p class="section-label"><?php esc_html_e( 'Rules', 'dphilhower-studio' ); ?></p>
		<h2 class="section-title"><?php esc_html_e( 'Non-negotiable', 'dphilhower-studio' ); ?></h2>
		<div class="process is-room rules-grid">
			<div class="process-step">
				<span class="process-num">01</span>
				<strong><?php esc_html_e( 'Room before render', 'dphilhower-studio' ); ?></strong>
				<p><?php esc_html_e( 'Never start in Figma, Illustrator, or codegen without Sit and Say.', 'dphilhower-studio' ); ?></p>
			</div>
			<div class="process-step">
				<span class="process-num">02</span>
				<strong><?php esc_html_e( 'One system', 'dphilhower-studio' ); ?></strong>
				<p><?php esc_html_e( 'Print and web share mark, color, type. Layouts differ. Language does not.', 'dphilhower-studio' ); ?></p>
			</div>
			<div class="process-step">
				<span class="process-num">03</span>
				<strong><?php esc_html_e( 'Shear hard', 'dphilhower-studio' ); ?></strong>
				<p><?php esc_html_e( 'If it needs a paragraph to explain the logo, cut again.', 'dphilhower-studio' ); ?></p>
			</div>
			<div class="process-step">
				<span class="process-num">04</span>
				<strong><?php esc_html_e( 'Stage on truth', 'dphilhower-studio' ); ?></strong>
				<p><?php esc_html_e( 'Test on glass, paper, and phone — not only on a moodboard.', 'dphilhower-studio' ); ?></p>
			</div>
		</div>
	</section>
	<section class="section reveal">
		<p class="section-label"><?php esc_html_e( 'In the portfolio', 'dphilhower-studio' ); ?></p>
		<h2 class="section-title is-wide"><?php esc_html_e( 'The method on every full kit', 'dphilhower-studio' ); ?></h2>
		<p class="section-copy is-wide"><?php esc_html_e( 'Eleven restaurant systems run the same path — including in-house Bville, Ember, Casa Forno, the gold-leaf Aurea kit, Juniper Bar, Kiln Fired, and the coastal, cantina, roast, meze, and ramen rooms.', 'dphilhower-studio' ); ?></p>
		<p class="cta-row">
			<?php
			$work_url = get_post_type_archive_link( 'dps_work' );
			if ( ! $work_url ) {
				$work_url = home_url( '/work/' );
			}
			?>
			<a class="btn btn-primary" href="<?php echo esc_url( $work_url ); ?>"><?php esc_html_e( 'View brands', 'dphilhower-studio' ); ?></a>
			<a class="btn btn-ghost" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"><?php esc_html_e( 'Invite us over', 'dphilhower-studio' ); ?></a>
		</p>
	</section>
	<?php get_template_part( 'template-parts/cta-brand' ); ?>
</main>
<?php
get_footer();
