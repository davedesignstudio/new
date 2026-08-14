<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/helpers.php';

$site = site_config();
$pageTitle = 'Catering — ' . $site['name'];
$cateringShots = [
    ['key' => 'pizza', 'caption' => 'Pizza trays'],
    ['key' => 'platters', 'caption' => 'Grill platters'],
    ['key' => 'wraps', 'caption' => 'Wraps'],
    ['key' => 'pasta', 'caption' => 'Party tables'],
];

require dirname(__DIR__) . '/src/includes/header.php';
?>

<section class="page-hero-photo">
  <?= photo_img('platters', ['class' => 'page-hero-photo-img', 'width' => 1600, 'height' => 640, 'loading' => 'eager', 'fetchpriority' => 'high']) ?>
  <div class="container page-hero-photo-inner">
    <h1 class="page-gold-title">Catering</h1>
    <p class="lead-on-photo">Pizza trays, party platters, and grill favorites for your next event in Bernardsville.</p>
  </div>
</section>

<section class="content-section">
  <div class="container content-card">
    <p>From stone oven pizza to wraps and kabobs, Bville Pizza &amp; Grill caters gatherings of all sizes. Call us to build a custom menu for your party or office lunch.</p>
    <a class="btn btn-red btn-lg" href="tel:<?= e($site['phone_raw']) ?>">Call <?= e($site['phone']) ?></a>
  </div>
</section>

<section class="content-section">
  <div class="container">
    <div class="catering-photo-grid">
      <?php foreach ($cateringShots as $shot): ?>
        <figure>
          <?= photo_img($shot['key'], ['width' => 640, 'height' => 420]) ?>
          <figcaption><?= e($shot['caption']) ?></figcaption>
        </figure>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<?php require dirname(__DIR__) . '/src/includes/footer.php'; ?>
