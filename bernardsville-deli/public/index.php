<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/helpers.php';

$site = site_config();
$pageTitle = $site['name'] . ' — Order Online';

require dirname(__DIR__) . '/src/includes/header.php';
?>

<section class="hero-order">
  <div class="hero-order-bg" aria-hidden="true"></div>
  <div class="container hero-order-inner">
    <h1 class="hero-order-title">Order Online</h1>
    <div class="hero-order-actions">
      <a class="btn btn-red btn-lg" href="<?= e(asset_url('menu.php')) ?>">Order Now</a>
      <a class="btn btn-gold btn-lg" href="<?= e(asset_url('about.php')) ?>">Learn Why</a>
    </div>
    <p class="hero-order-address"><?= e($site['address']) ?>, <?= e($site['city']) ?></p>
    <p class="hero-order-phone"><a href="tel:<?= e($site['phone_raw']) ?>"><?= e($site['phone']) ?></a></p>
    <div class="hero-order-alt">
      <a class="btn btn-gold" href="<?= e(asset_url('menu.php')) ?>">Order Online</a>
      <span class="hero-or">Or</span>
      <a class="btn btn-gold" href="tel:<?= e($site['phone_raw']) ?>">Call Us</a>
    </div>
  </div>
</section>

<section class="menu-grid-section">
  <div class="container">
    <div class="menu-grid">
      <?php foreach ($site['menu_categories'] as $cat): ?>
        <a class="menu-grid-item" href="<?= e(asset_url('menu.php#' . $cat['id'])) ?>">
          <span class="menu-grid-banner"><?= e($cat['label']) ?></span>
          <span class="menu-grid-icon" aria-hidden="true"><?= $cat['emoji'] ?></span>
        </a>
      <?php endforeach; ?>
      <a class="menu-grid-center btn btn-red btn-lg" href="<?= e(asset_url('menu.php')) ?>">Our Menu</a>
    </div>
  </div>
</section>

<section class="cafe-robust-banner">
  <div class="container cafe-banner-inner">
    <img src="<?= e(asset_url($site['cafe_robust']['logos']['bean'])) ?>" alt="" width="72" height="96" aria-hidden="true" />
    <div>
      <h2>Cafe Robust</h2>
      <p>Bold coffee roasted for Bernardsville — espresso, lattes, cold brew &amp; more.</p>
    </div>
    <a class="btn btn-cafe" href="<?= e(asset_url('cafe.php')) ?>">View Coffee Menu</a>
  </div>
</section>

<?php require dirname(__DIR__) . '/src/includes/footer.php'; ?>
