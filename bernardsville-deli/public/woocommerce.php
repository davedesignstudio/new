<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/woocommerce-catalog.php';

$site = site_config();
$catalog = wc_build_catalog();
$pageTitle = 'WooCommerce setup — ' . $site['name'];
$productCount = count($catalog['products']);
$variationCount = 0;
foreach ($catalog['products'] as $product) {
    $variationCount += count($product['variations']);
}

require dirname(__DIR__) . '/src/includes/header.php';
?>

<section class="hero menu-hero-clean">
  <div class="container paper-hero-inner">
    <h1><?= print_title('WooCommerce', 'print-title print-title--hero') ?></h1>
    <p class="lede">Every printed menu item is a product with a SKU, price, photo, and checkout path. Import the catalog into WooCommerce, or take orders from this site.</p>
  </div>
</section>

<section class="print-menu">
  <div class="container menu-catalog">
    <article class="print-section">
      <p class="print-note"><?= (int) $productCount ?> products · <?= (int) $variationCount ?> variations · NJ tax 6.625% · pay at pickup or delivery</p>
      <ul class="hero-actions" style="margin-top:1rem">
        <li><a class="btn btn-gold" href="<?= e(asset_url('api/woocommerce-export.php')) ?>">Download product CSV</a></li>
        <li><a class="btn btn-gold" href="<?= e(asset_url('api/woocommerce-export.php?format=json')) ?>">Download catalog JSON</a></li>
        <li><a class="btn btn-gold" href="<?= e(asset_url('order/')) ?>">Open online order</a></li>
      </ul>
      <p style="margin-top:1.25rem">WordPress: copy <code>woocommerce/bville-menu</code> into <code>wp-content/plugins/</code>, activate WooCommerce, then WooCommerce → Bville Menu → Import. Optional REST sync uses <code>WC_STORE_URL</code>, <code>WC_CONSUMER_KEY</code>, and <code>WC_CONSUMER_SECRET</code>.</p>
    </article>
  </div>
</section>

<?php require dirname(__DIR__) . '/src/includes/footer.php'; ?>
