<?php
/**
 * Theme header.
 *
 * @package DPhilhowerStudio
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link" href="#main"><?php esc_html_e( 'Skip to content', 'dphilhower-studio' ); ?></a>
<header class="site-header">
	<?php if ( has_custom_logo() ) : ?>
		<?php the_custom_logo(); ?>
	<?php else : ?>
		<a class="brand-mark" href="<?php echo esc_url( home_url( '/' ) ); ?>">
			<img src="<?php echo esc_url( dps_image_url( 'd-philhower-lockup.png' ) ); ?>" alt="<?php esc_attr_e( 'D Philhower Studio', 'dphilhower-studio' ); ?>" width="1426" height="522">
		</a>
	<?php endif; ?>
	<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><?php esc_html_e( 'Menu', 'dphilhower-studio' ); ?></button>
	<?php dps_primary_nav(); ?>
</header>
