<?php
/**
 * Process section used on Home and Services.
 *
 * @package DPhilhowerStudio
 */
?>
<section class="section" id="process">
	<p class="section-label"><?php esc_html_e( 'Process', 'dphilhower-studio' ); ?></p>
	<h2 class="section-title is-wide"><?php esc_html_e( 'From the table to the street', 'dphilhower-studio' ); ?></h2>
	<p class="section-copy is-wide"><?php esc_html_e( 'Hospitality studios that last do the discovery on the property, write the story back, then design a system — not a pile of files. First conversations are rarely about logos. They are about the room, the guest, and what has to hold up at dinner rush.', 'dphilhower-studio' ); ?></p>
	<?php get_template_part( 'template-parts/process-steps' ); ?>
</section>
