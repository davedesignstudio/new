<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/woocommerce-catalog.php';

$site = site_config();
$catalog = wc_build_catalog();
$wc = wc_store_config();
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
    <p class="lede">Link the online order cart to WooCommerce for paid transactions. Import the catalog, set API keys, then checkout redirects to WooCommerce payment.</p>
  </div>
</section>

<section class="print-menu">
  <div class="container menu-catalog">
    <article class="print-section">
      <p class="print-note">
        <?= (int) $productCount ?> products · <?= (int) $variationCount ?> variations · NJ tax 6.625% ·
        <?= $wc['enabled'] ? 'WooCommerce connected' : 'WooCommerce not connected yet' ?>
      </p>
      <ul class="hero-actions" style="margin-top:1rem">
        <li><a class="btn btn-gold" href="<?= e(asset_url('api/woocommerce-export.php')) ?>">Download product CSV</a></li>
        <li><a class="btn btn-gold" href="<?= e(asset_url('api/woocommerce-export.php?format=json')) ?>">Download catalog JSON</a></li>
        <li><a class="btn btn-gold" href="<?= e(asset_url('api/woocommerce-status.php')) ?>">API status (JSON)</a></li>
        <li><a class="btn btn-gold" href="<?= e(asset_url('order/')) ?>">Open online order</a></li>
      </ul>

      <h2 class="boards-heading" style="margin-top:2rem">1. Import products</h2>
      <p>Copy <code>woocommerce/bville-menu</code> into <code>wp-content/plugins/</code>, activate WooCommerce + Bville Menu, then WooCommerce → Bville Menu → Import.</p>

      <h2 class="boards-heading" style="margin-top:1.5rem">2. Connect REST keys</h2>
      <p>In WordPress: WooCommerce → Settings → Advanced → REST API → Add key (Read/Write). Put the values in <code>bernardsville-deli/.env</code> (see <code>.env.example</code>):</p>
      <pre style="overflow:auto;background:rgba(20,40,32,.06);padding:1rem;border:1px solid rgba(20,40,32,.14)">WC_STORE_URL=https://your-store.example
WC_CONSUMER_KEY=ck_…
WC_CONSUMER_SECRET=cs_…</pre>

      <h2 class="boards-heading" style="margin-top:1.5rem">3. Take payment</h2>
      <p>Enable a WooCommerce payment gateway (Stripe, Square, etc.). From <code>/order/</code>, Place order creates a WooCommerce order and sends the guest to <code>/checkout/order-pay/…</code> to pay. Without keys, orders still save locally for pay-at-pickup.</p>
    </article>
  </div>
</section>

<?php require dirname(__DIR__) . '/src/includes/footer.php'; ?>
