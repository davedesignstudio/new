<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/helpers.php';

$site = site_config();
$pageTitle = 'About Us — ' . $site['name'];

require dirname(__DIR__) . '/src/includes/header.php';
?>

<section class="hero">
  <div class="container about-pack-grid">
    <?= photo_img('table', ['class' => 'about-hero-photo', 'width' => 560, 'height' => 420, 'loading' => 'eager', 'fetchpriority' => 'high']) ?>
    <div>
      <p class="comic-pub">Чудо Комикс · Origins</p>
      <p class="kicker">159 Morristown Rd</p>
      <h1><?= print_title('Bville', 'print-title print-title--hero') ?></h1>
      <p class="hero-sub">Pizza &amp; Grill</p>
      <p class="lede">The kitchen that already knows the table.</p>
      <p class="about-text"><?= e($site['about']) ?></p>
      <a class="btn btn-red" href="tel:<?= e($site['phone_raw']) ?>">Call <?= e($site['phone']) ?></a>
      <a class="btn btn-ghost" href="<?= e(asset_url('brand.php')) ?>">House book</a>
    </div>
  </div>
</section>

<?php $brand = brand_config(); ?>
<section class="content-section house-about-story">
  <div class="container">
    <p class="comic-pub">House book</p>
    <h2><?= e((string) $brand['story']['title']) ?></h2>
    <?php foreach (array_slice($brand['manifesto'], 0, 2) as $para): ?>
      <p class="lede"><?= e((string) $para) ?></p>
    <?php endforeach; ?>
    <div class="place-settings-grid place-settings-grid--about">
      <?php foreach ($brand['places'] as $place): ?>
        <article class="place-setting place-setting--compact">
          <img src="<?= e(asset_url((string) $place['mark'])) ?>" alt="" width="72" height="72" />
          <p class="kicker"><?= e((string) $place['word']) ?></p>
          <h3><?= e((string) $place['line']) ?></h3>
        </article>
      <?php endforeach; ?>
    </div>
    <p><a class="btn btn-ghost" href="<?= e(asset_url('brand.php')) ?>">Open the house book</a></p>
  </div>
</section>

<section class="content-section photo-board-section" id="photo-board">
  <div class="container">
    <header class="house-board-head">
      <p class="kicker">The photo board · From this kitchen</p>
      <h2>Plates that left this pass</h2>
      <p class="section-lead">Shot at 159 Morristown Rd — the pies, platters, and the room they come out of.</p>
    </header>
    <div class="photo-board">
      <?php foreach ($site['photos']['gallery'] as $shot): ?>
        <figure class="photo-board-item">
          <?= photo_img($shot['key'], ['width' => 640, 'height' => 480]) ?>
          <figcaption><?= e($shot['caption']) ?></figcaption>
        </figure>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section class="content-section">
  <div class="container about-brand-row">
    <img src="<?= e(asset_url('assets/brand/takeout-bag.svg')) ?>" alt="Bville takeout bag" width="200" height="257" />
    <div>
      <h2><?= print_title('The bag') ?></h2>
      <p class="lede">Orange and charcoal, flame over the i, Pizza &amp; Grill under the script.</p>
      <?php $designer = $site['designer']; ?>
      <a href="<?= e($designer['url']) ?>" target="_blank" rel="noopener noreferrer">
        <img src="<?= e(asset_url($designer['logo'])) ?>" alt="<?= e($designer['name']) ?>" width="200" height="50" />
      </a>
    </div>
  </div>
</section>

<?php require dirname(__DIR__) . '/src/includes/story-modal.php'; ?>
<?php require dirname(__DIR__) . '/src/includes/footer.php'; ?>
