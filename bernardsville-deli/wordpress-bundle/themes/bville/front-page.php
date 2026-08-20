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
    <p class="comic-pub">Чудо Комикс · Chudo Comics · Bernardsville</p>
    <p class="hero-kicker">Home of the B'Ville Special</p>
    <h1>Bville Pizza &amp; Grill</h1>
    <p class="hero-lede">Stone oven pizza, Angus burgers, and gelato — pickup after the commute, or delivery on this site. Not a marketplace.</p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="<?php echo esc_url($shop); ?>">Order pickup</a>
      <a class="btn" href="<?php echo esc_url($menu_url); ?>">See the menu</a>
    </div>
  </div>
</section>

<section class="audience-lanes" aria-label="Two ways to order">
  <div class="feature-wrap audience-lanes-grid">
    <article class="audience-lane audience-lane--family">
      <p class="hero-kicker">Family table</p>
      <h2>After practice. After the train.</h2>
      <p>Pickup at 159 Morristown Rd — 16" pies, kids plates, name at the counter. No unbuckling for a marketplace app.</p>
      <p><a class="btn btn-primary" href="<?php echo esc_url($shop); ?>">Order pickup</a></p>
    </article>
    <article class="audience-lane audience-lane--phone">
      <p class="hero-kicker">On your phone</p>
      <h2>Customize the pie. Skip the app tax.</h2>
      <p>Direct WooCommerce checkout on this site. Same kitchen. No marketplace freeze.</p>
      <p><a class="btn btn-primary" href="<?php echo esc_url($shop); ?>">Build a pie</a></p>
    </article>
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
