<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/helpers.php';

$site = site_config();
$pageTitle = 'Contact — ' . $site['name'];

require dirname(__DIR__) . '/src/includes/header.php';
?>

<section class="hero">
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="comic-pub">Чудо Комикс · Morristown Rd</p>
      <p class="kicker">Visit · Call ahead · The counter</p>
      <h1><?= print_title('Contact', 'print-title print-title--hero') ?></h1>
      <p class="lede"><?= e($site['address']) ?> · <?= e($site['city']) ?></p>
      <p><a href="tel:<?= e($site['phone_raw']) ?>"><?= e($site['phone']) ?></a></p>
      <div class="hero-actions">
        <a class="btn btn-red" href="<?= e(asset_url('order/')) ?>">Order for the table</a>
        <a class="btn btn-ghost" href="tel:<?= e($site['phone_raw']) ?>">Call</a>
      </div>
    </div>
    <?= photo_img('dining', ['class' => 'hero-photo frame-photo', 'width' => 720, 'height' => 480, 'loading' => 'eager', 'fetchpriority' => 'high']) ?>
  </div>
</section>

<section class="content-section">
  <div class="container contact-grid">
    <div class="content-card">
      <?= photo_img('pass', ['class' => 'contact-card-photo', 'width' => 640, 'height' => 360]) ?>
      <h2><?= print_title('Visit') ?></h2>
      <address>
        <?= e($site['address']) ?><br />
        <?= e($site['city']) ?>
      </address>
      <p><a href="tel:<?= e($site['phone_raw']) ?>"><?= e($site['phone']) ?></a></p>
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
