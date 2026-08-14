<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/helpers.php';

$site = site_config();
$pageTitle = 'About Us — ' . $site['name'];

require dirname(__DIR__) . '/src/includes/header.php';
?>

<section class="slate-hero">
  <div class="container about-pack-grid">
    <?= photo_img('bacon_burger', ['class' => 'about-hero-photo', 'width' => 560, 'height' => 420, 'loading' => 'eager', 'fetchpriority' => 'high']) ?>
    <div>
      <?= wordmark_img('burgers', 'Burgers', ['class' => 'slate-wordmark', 'width' => 520, 'height' => 120]) ?>
      <p class="script-stack">Angus · Beefy</p>
      <p class="about-text" style="text-align:left;max-width:none"><?= e($site['about']) ?></p>
      <a class="btn btn-gold" href="tel:<?= e($site['phone_raw']) ?>">Call <?= e($site['phone']) ?></a>
    </div>
  </div>
</section>

<section class="content-section">
  <div class="container about-photo-trio">
    <figure>
      <?= photo_img('table', ['width' => 640, 'height' => 420]) ?>
      <figcaption>Plates from the grill</figcaption>
    </figure>
    <figure>
      <?= photo_img('kitchen', ['width' => 640, 'height' => 420]) ?>
      <figcaption>Made to order</figcaption>
    </figure>
    <figure>
      <?= photo_img('pass', ['width' => 640, 'height' => 420]) ?>
      <figcaption>The kitchen pass</figcaption>
    </figure>
  </div>
</section>

<section class="content-section">
  <div class="container about-brand-row">
    <img src="<?= e(asset_url('assets/brand/takeout-bag.svg')) ?>" alt="Bville takeout bag" width="200" height="257" />
    <div>
      <h2 class="origin-title">The mark on the bag</h2>
      <p>Orange and charcoal, flame over the i, Pizza &amp; Grill under the script — the same identity as Cafe Robust coffee and the Philhower lockup in the footer.</p>
      <?php $designer = $site['designer']; ?>
      <a href="<?= e($designer['url']) ?>" target="_blank" rel="noopener noreferrer">
        <img src="<?= e(asset_url($designer['logo'])) ?>" alt="<?= e($designer['name']) ?>" width="200" height="50" />
      </a>
    </div>
  </div>
</section>

<?php require dirname(__DIR__) . '/src/includes/story-modal.php'; ?>
<?php require dirname(__DIR__) . '/src/includes/footer.php'; ?>
