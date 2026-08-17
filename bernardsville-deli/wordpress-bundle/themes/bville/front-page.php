<?php
/**
 * Front page — clean modern lines hero + shop link.
 */
get_header();
$shop = function_exists('wc_get_page_id') ? get_permalink(wc_get_page_id('shop')) : home_url('/shop/');
?>
<section class="hero">
  <div class="hero-inner">
    <p class="hero-kicker"><?php echo esc_html(bville_address()); ?></p>
    <h1>Bville Pizza &amp; Grill</h1>
    <p class="hero-lede">Stone oven pizza, Angus burgers, and Italian gelato — order online for pickup or delivery.</p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="<?php echo esc_url($shop); ?>">Order menu</a>
      <a class="btn" href="tel:<?php echo esc_attr(bville_phone_raw()); ?>"><?php echo esc_html(bville_phone()); ?></a>
    </div>
  </div>
</section>

<section class="site-main" style="padding-top:0">
  <div class="feature-grid">
    <a class="feature-card" href="<?php echo esc_url($shop); ?>">
      <img src="<?php echo esc_url(bville_asset('pizza.jpg')); ?>" alt="Stone oven pizza">
      <h3>Stone Oven</h3>
      <p>Customize pies in WooCommerce checkout.</p>
    </a>
    <a class="feature-card" href="<?php echo esc_url($shop); ?>">
      <img src="<?php echo esc_url(bville_asset('burger.jpg')); ?>" alt="Angus burgers">
      <h3>Burgers</h3>
      <p>Angus classics from the printed boards.</p>
    </a>
    <a class="feature-card" href="<?php echo esc_url($shop); ?>">
      <img src="<?php echo esc_url(bville_asset('salad.jpg')); ?>" alt="Garden salads">
      <h3>From the Garden</h3>
      <p>Clean-line menu, every plate photographed.</p>
    </a>
  </div>
</section>
<?php
get_footer();
