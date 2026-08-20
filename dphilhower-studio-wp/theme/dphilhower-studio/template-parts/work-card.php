<?php
/**
 * Work card.
 *
 * @package DPhilhowerStudio
 */

$thumb = get_the_post_thumbnail_url( get_the_ID(), 'dps-work' );
if ( ! $thumb ) {
	$thumb = dps_image_url( 'work-brand.jpg' );
}
?>
<a class="work-item" href="<?php the_permalink(); ?>">
	<img src="<?php echo esc_url( $thumb ); ?>" alt="<?php echo esc_attr( get_the_title() ); ?>" width="1200" height="800">
	<div class="work-meta">
		<h3><?php the_title(); ?></h3>
		<p><?php echo esc_html( dps_work_subtitle() ); ?></p>
	</div>
</a>
