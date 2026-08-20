<?php
/**
 * Front page — clean modern lines hero + WooCommerce order.
 */
get_header();
$shop = bville_shop_url();
$menu = get_page_by_path('menu');
$menu_url = $menu ? get_permalink($menu) : $shop;
?>
<section class="hero">
  <div class="hero-inner">
    <p class="hero-kicker">Home of the B'Ville Special</p>
    <h1>Bville Pizza &amp; Grill</h1>
    <p class="hero-lede">Stone oven pizza, Angus burgers, and Italian gelato — order pickup or delivery on this site.</p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="<?php echo esc_url($shop); ?>">Order menu</a>
      <a class="btn" href="<?php echo esc_url($menu_url); ?>">See the menu</a>
      <a class="btn" href="tel:<?php echo esc_attr(bville_phone_raw()); ?>"><?php echo esc_html(bville_phone()); ?></a>
    </div>
  </div>
</section>

<?php bville_order_board_house_checks(); ?>

<section class="feature-wrap">
  <div class="feature-grid">
    <a class="feature-card" href="<?php echo esc_url($shop); ?>">
      <img src="<?php echo esc_url(bville_asset('pizza.jpg')); ?>" alt="Stone oven pizza">
      <h3>Stone Oven</h3>
      <p>Pies from the printed boards, paid in WooCommerce checkout.</p>
    </a>
    <a class="feature-card" href="<?php echo esc_url($shop); ?>">
      <img src="<?php echo esc_url(bville_asset('burger.jpg')); ?>" alt="Angus burgers">
      <h3>Burgers</h3>
      <p>Angus classics, wraps, and grill platters.</p>
    </a>
    <a class="feature-card" href="<?php echo esc_url($shop); ?>">
      <img src="<?php echo esc_url(bville_asset('salad.jpg')); ?>" alt="Garden salads">
      <h3>From the Garden</h3>
      <p>Clean-line menu. Pictures on titles only.</p>
    </a>
  </div>
</section>
<?php
get_footer();
