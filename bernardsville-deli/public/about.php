<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/helpers.php';

$site = site_config();
$pageTitle = 'About Us — ' . $site['name'];

require dirname(__DIR__) . '/src/includes/header.php';
?>

<section class="about-pack">
  <div class="container about-pack-grid">
    <img src="<?= e(asset_url('assets/brand/burger-sleeve.svg')) ?>" alt="Bville Burgers sleeve" width="360" height="225" />
    <div>
      <p class="origin-eyebrow">Angus · Beefy</p>
      <h1 class="page-gold-title" style="text-align:left;color:#f5c542">Burgers At Bville</h1>
      <p class="script-stack">So Sweet · So Tasty · So Juicy</p>
      <p class="about-text" style="text-align:left;max-width:none"><?= e($site['about']) ?></p>
      <a class="btn btn-gold" href="tel:<?= e($site['phone_raw']) ?>">Call <?= e($site['phone']) ?></a>
    </div>
  </div>
</section>

<section class="content-section">
  <div class="container about-brand-row">
    <img src="<?= e(asset_url('assets/brand/takeout-bag.svg')) ?>" alt="Bville takeout bag" width="200" height="257" />
    <div>
      <h2 class="print-heading">The mark on the bag</h2>
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
