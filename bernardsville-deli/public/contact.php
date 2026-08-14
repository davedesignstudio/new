<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/helpers.php';

$site = site_config();
$pageTitle = 'Contact — ' . $site['name'];

require dirname(__DIR__) . '/src/includes/header.php';
?>

<section class="page-hero-photo">
  <?= photo_img('dining', ['class' => 'page-hero-photo-img', 'width' => 1600, 'height' => 640, 'loading' => 'eager', 'fetchpriority' => 'high']) ?>
  <div class="container page-hero-photo-inner">
    <h1 class="page-gold-title">Contact</h1>
    <p class="lead-on-photo">159 Morristown Rd · Bernardsville, NJ</p>
  </div>
</section>

<section class="content-section">
  <div class="container contact-grid">
    <div class="content-card">
      <?= photo_img('pass', ['class' => 'contact-card-photo', 'width' => 640, 'height' => 360]) ?>
      <h2>Visit</h2>
      <address>
        <?= e($site['address']) ?><br />
        <?= e($site['city']) ?>
      </address>
      <p><a href="tel:<?= e($site['phone_raw']) ?>"><?= e($site['phone']) ?></a></p>
      <div class="about-actions">
        <a class="btn btn-gold btn-block" href="tel:<?= e($site['phone_raw']) ?>">Call Us</a>
        <a class="btn btn-gold btn-block" href="<?= e(asset_url('menu.php')) ?>">Order Online</a>
      </div>
    </div>
    <div class="map-card">
      <iframe
        title="Map to Bville Pizza and Grill"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        src="https://maps.google.com/maps?q=159+Morristown+Rd,+Bernardsville,+NJ+07924&output=embed"
      ></iframe>
    </div>
  </div>
</section>

<?php require dirname(__DIR__) . '/src/includes/footer.php'; ?>
