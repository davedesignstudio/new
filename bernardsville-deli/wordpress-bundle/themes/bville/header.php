<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="site-header-inner">
    <a class="brand" href="<?php echo esc_url(home_url('/')); ?>">
      <span class="brand-logo-wrap">
        <?php
        $logo_id = (int) get_theme_mod('custom_logo');
        if ($logo_id) {
            echo wp_get_attachment_image($logo_id, 'thumbnail', false, [
                'class' => 'brand-logo',
                'alt' => get_bloginfo('name'),
            ]);
        } else {
            echo '<img class="brand-logo" src="' . esc_url(bville_asset('logo.png')) . '" alt="' . esc_attr(get_bloginfo('name')) . '" width="52" height="52">';
        }
        ?>
      </span>
      <span class="brand-text">
        <strong>Bville</strong>
        <em>Pizza &amp; Grill</em>
      </span>
    </a>
    <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="<?php esc_attr_e('Open menu', 'bville'); ?>">
      <span></span><span></span><span></span>
    </button>
    <nav id="site-nav" class="nav-primary" aria-label="<?php esc_attr_e('Primary', 'bville'); ?>">
      <?php
      wp_nav_menu([
          'theme_location' => 'primary',
          'container' => false,
          'fallback_cb' => static function (): void {
              echo '<a href="' . esc_url(home_url('/')) . '">Home</a>';
              echo '<a href="' . esc_url(bville_shop_url()) . '">Menu</a>';
              echo '<a href="' . esc_url(home_url('/contact/')) . '">Contact</a>';
              if (function_exists('wc_get_cart_url')) {
                  echo '<a href="' . esc_url(wc_get_cart_url()) . '">Cart</a>';
              }
          },
          'items_wrap' => '<ul class="nav-list">%3$s</ul>',
          'depth' => 1,
      ]);
      ?>
    </nav>
    <div class="header-social">
      <a class="header-order" href="<?php echo esc_url(bville_shop_url()); ?>">Order</a>
      <a href="<?php echo esc_url(bville_instagram()); ?>" target="_blank" rel="noopener me" aria-label="Instagram">IG</a>
      <?php if (function_exists('wc_get_cart_url')) : ?>
        <a class="header-cart" href="<?php echo esc_url(wc_get_cart_url()); ?>">Cart<?php
        if (function_exists('WC') && WC()->cart) {
            $count = (int) WC()->cart->get_cart_contents_count();
            if ($count > 0) {
                echo ' <span class="cart-count">' . esc_html((string) $count) . '</span>';
            }
        }
        ?></a>
      <?php endif; ?>
    </div>
  </div>
  <?php bville_order_board_ticket(); ?>
</header>
<main id="main" class="site-main">
