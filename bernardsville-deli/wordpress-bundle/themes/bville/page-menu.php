<?php
/**
 * Template Name: Menu
 * Clean-line menu page powered by WooCommerce products when available.
 */
get_header();
?>
<header class="hero" style="padding-bottom:1rem">
  <div class="hero-inner">
    <p class="hero-kicker">Bville Pizza &amp; Grill</p>
    <h1>The Menu</h1>
    <p class="hero-lede">Clean lines. Real food. Order online when you’re ready.</p>
  </div>
</header>

<?php if (function_exists('wc_get_products')) :
  $products = wc_get_products([
    'status' => 'publish',
    'limit'  => -1,
    'orderby'=> 'menu_order',
    'order'  => 'ASC',
  ]);
  $by_cat = [];
  foreach ($products as $product) {
    $terms = get_the_terms($product->get_id(), 'product_cat');
    $cat = ($terms && !is_wp_error($terms)) ? $terms[0]->name : 'Menu';
    $by_cat[$cat][] = $product;
  }
  $preferred = ['Garden', 'Burgers', 'Pizza', 'Kids', 'Dessert', 'Drinks', 'Sides'];
  uksort($by_cat, static function ($a, $b) use ($preferred) {
    $ia = array_search($a, $preferred, true);
    $ib = array_search($b, $preferred, true);
    $ia = $ia === false ? 99 : $ia;
    $ib = $ib === false ? 99 : $ib;
    return $ia <=> $ib ?: strcasecmp($a, $b);
  });
?>
  <?php foreach ($by_cat as $cat => $items) : ?>
    <section class="menu-section" style="margin:0 0 2.5rem">
      <h2 class="line-title"><?php echo esc_html($cat); ?></h2>
      <div class="menu-lines">
        <?php foreach ($items as $product) : ?>
          <a class="menu-line" href="<?php echo esc_url($product->get_permalink()); ?>">
            <span class="menu-line-name"><?php echo esc_html($product->get_name()); ?></span>
            <span class="menu-line-dots" aria-hidden="true"></span>
            <span class="menu-line-price"><?php echo wp_kses_post($product->get_price_html()); ?></span>
          </a>
        <?php endforeach; ?>
      </div>
    </section>
  <?php endforeach; ?>
<?php else : ?>
  <p>Install and activate WooCommerce, then run <strong>WooCommerce → Bville Menu</strong> to populate this page.</p>
<?php endif; ?>

<?php get_footer(); ?>
