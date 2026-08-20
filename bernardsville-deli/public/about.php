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
      <a class="btn btn-ghost" href="<?= e(asset_url('brand.php')) ?>">House voice</a>
    </div>
  </div>
</section>

<?php $brand = brand_config(); ?>
<section class="content-section brand-story-inline">
  <div class="container">
    <p class="kicker">House story</p>
    <h2><?= e((string) $brand['story']['logline']) ?></h2>
    <p class="lede"><?= e((string) $brand['story']['origin']) ?></p>
    <div class="brand-feelings-grid brand-feelings-grid--inline">
      <?php foreach ($brand['feelings'] as $feeling): ?>
        <article class="brand-feeling brand-feeling--compact">
          <p class="kicker"><?= e((string) $feeling['word']) ?></p>
          <h3><?= e((string) $feeling['say']) ?></h3>
        </article>
      <?php endforeach; ?>
    </div>
    <p class="brand-ritual"><?= e((string) $brand['story']['ritual']) ?></p>
    <a class="btn btn-ghost" href="<?= e(asset_url('brand.php')) ?>">Read the house guidelines</a>
  </div>
</section>

<section class="content-section">
  <div class="container about-photo-trio">
    <figure>
      <?= photo_img('angus', ['width' => 640, 'height' => 420]) ?>
      <figcaption>Angus burgers</figcaption>
    </figure>
    <figure>
      <?= photo_img('kitchen', ['width' => 640, 'height' => 420]) ?>
      <figcaption>Made to order</figcaption>
    </figure>
    <figure>
      <?= photo_img('pizza', ['width' => 640, 'height' => 420]) ?>
      <figcaption>Stone oven pizza</figcaption>
    </figure>
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
