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
    <p class="hero-lede">The kitchen that already knows the table. Stone oven pizza, Angus burgers, and gelato — pickup after practice, or delivery from this house.</p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="<?php echo esc_url($shop); ?>">Order for the table</a>
      <a class="btn" href="<?php echo esc_url($menu_url); ?>">See the menu</a>
    </div>
  </div>
</section>

<section class="place-settings" aria-label="Four places at the table">
  <div class="feature-wrap">
    <p class="hero-kicker">The table</p>
    <h2>For the table.</h2>
    <div class="place-settings-grid">
      <article class="place-setting">
        <img src="<?php echo esc_url(bville_asset('brand/oven-heat.svg')); ?>" alt="" width="88" height="88">
        <p class="hero-kicker">Warmth</p>
        <h3>We’ll have it warm at the counter.</h3>
      </article>
      <article class="place-setting">
        <img src="<?php echo esc_url(bville_asset('brand/house-stamp.svg')); ?>" alt="" width="88" height="88">
        <p class="hero-kicker">Closeness</p>
        <h3>Name on the bag. We know the kids’ pasta.</h3>
      </article>
      <article class="place-setting">
        <img src="<?php echo esc_url(bville_asset('logo.png')); ?>" alt="" width="88" height="88">
        <p class="hero-kicker">Familiarity</p>
        <h3>The names this table already knows.</h3>
      </article>
      <article class="place-setting">
        <img src="<?php echo esc_url(bville_asset('brand/table-mark.svg')); ?>" alt="" width="88" height="88">
        <p class="hero-kicker">Family</p>
        <h3>After practice. After the train.</h3>
      </article>
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
