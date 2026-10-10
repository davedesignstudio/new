<?php
/**
 * Process section used on Home and Services — Room Method.
 *
 * @package DPhilhowerStudio
 */
$process_page = get_page_by_path( 'process' );
$process_url  = $process_page ? get_permalink( $process_page ) : home_url( '/process/' );
?>
<section class="section reveal" id="process">
	<p class="section-label"><?php esc_html_e( 'The Room Method', 'dphilhower-studio' ); ?></p>
	<h2 class="section-title is-wide"><?php esc_html_e( 'Sit → Say → Scatter → Shear → Stage → Ship', 'dphilhower-studio' ); ?></h2>
	<p class="section-copy is-wide"><?php esc_html_e( 'An original studio process for hospitality identity and the web as one system. Discovery on the property. Golden’s cut before anything goes public. Print and screen share the same language.', 'dphilhower-studio' ); ?></p>
	<?php get_template_part( 'template-parts/process-steps' ); ?>
	<p class="cta-row" style="margin-top:1.5rem">
		<a class="btn btn-ghost" href="<?php echo esc_url( $process_url ); ?>"><?php esc_html_e( 'Read the method', 'dphilhower-studio' ); ?></a>
	</p>
</section>
