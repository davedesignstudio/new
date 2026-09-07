<?php
/**
 * Theme footer.
 *
 * @package DPhilhowerStudio
 */
?>
<footer class="site-footer">
	<div class="footer-inner">
		<span>© <span id="dps-year"><?php echo esc_html( gmdate( 'Y' ) ); ?></span> D Philhower Studio · <a href="<?php echo esc_url( home_url( '/' ) ); ?>">dphilhower.com</a></span>
		<span><?php echo esc_html( dps_mod( 'dps_location', 'Graphic design · restaurants · Morris County, NJ' ) ); ?></span>
	</div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
