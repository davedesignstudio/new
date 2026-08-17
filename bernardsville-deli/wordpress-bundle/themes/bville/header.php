<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="site-header">
  <div class="site-header-inner">
    <a class="brand" href="<?php echo esc_url(home_url('/')); ?>">
      <?php if (has_custom_logo()) : ?>
        <?php the_custom_logo(); ?>
      <?php else : ?>
        <img src="<?php echo esc_url(bville_asset('logo.png')); ?>" alt="<?php bloginfo('name'); ?>" width="52" height="52">
      <?php endif; ?>
      <span class="brand-text">
        <strong>Bville</strong>
        <em>Pizza &amp; Grill</em>
      </span>
    </a>
    <nav class="nav-primary" aria-label="<?php esc_attr_e('Primary', 'bville'); ?>">
      <?php
      wp_nav_menu([
          'theme_location' => 'primary',
          'container' => false,
          'fallback_cb' => static function (): void {
              echo '<a href="' . esc_url(home_url('/')) . '">Home</a>';
              if (function_exists('wc_get_page_id')) {
                  echo '<a href="' . esc_url(get_permalink(wc_get_page_id('shop'))) . '">Menu</a>';
                  echo '<a href="' . esc_url(wc_get_cart_url()) . '">Cart</a>';
              }
          },
          'items_wrap' => '%3$s',
          'depth' => 1,
      ]);
      ?>
    </nav>
  </div>
</header>
<main class="site-main">
