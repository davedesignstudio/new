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

<section class="hero">
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="comic-pub">Чудо Комикс · Family table</p>
      <p class="kicker">Parties · Office lunch · Trays</p>
      <h1><?= print_title('Catering', 'print-title print-title--hero') ?></h1>
      <p class="lede">Pizza trays, party platters, and grill favorites for the Somerset Hills table — Little League, office lunch, the whole house.</p>
      <a class="btn btn-red btn-lg" href="tel:<?= e($site['phone_raw']) ?>">Call <?= e($site['phone']) ?></a>
    </div>
    <?= photo_img('platters', ['class' => 'hero-photo frame-photo', 'width' => 720, 'height' => 480, 'loading' => 'eager', 'fetchpriority' => 'high']) ?>
  </div>
</section>

<section class="content-section">
  <div class="container content-card">
    <p>From stone oven pizza to wraps and kabobs, Bville Pizza &amp; Grill caters gatherings of all sizes. Call us to build a custom menu for your party or office lunch.</p>
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
