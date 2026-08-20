<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/helpers.php';

$site = site_config();
$origin = featured_story();
$pageTitle = $site['tagline'];
$homeCats = ['pizza', 'burgers', 'wraps', 'platters', 'garden', 'desserts'];
$features = [
    ['id' => 'pizza', 'title' => 'Stone Oven Baked', 'photo' => 'pizza'],
    ['id' => 'burgers', 'title' => 'Burgers', 'photo' => 'angus'],
    ['id' => 'desserts', 'title' => 'Sweet Endings', 'photo' => 'desserts'],
];

require dirname(__DIR__) . '/src/includes/header.php';
?>

<section class="hero issue-hero">
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="comic-pub">Чудо Комикс · Chudo Comics · The house issue</p>
      <p class="kicker">Home of the B'Ville Special · <?= e($site['address']) ?></p>
      <h1><?= print_title('Bville', 'print-title print-title--hero') ?></h1>
      <p class="hero-sub">Pizza &amp; Grill</p>
      <p class="lede">The kitchen that already knows the table. Stone oven pizza, Angus burgers, gelato — pickup after practice, or delivery from this house.</p>
      <div class="hero-actions">
        <a class="btn btn-red btn-lg" href="<?= e(asset_url('order/')) ?>">Order for the table</a>
        <a class="btn btn-ghost btn-lg" href="<?= e(asset_url('menu.php')) ?>">Full Menu</a>
      </div>
    </div>
    <div class="hero-spread">
      <figure class="comic-frame">
        <?= photo_img('pizza', ['class' => 'hero-photo', 'width' => 640, 'height' => 520, 'loading' => 'eager', 'fetchpriority' => 'high']) ?>
      </figure>
      <a class="comic-frame comic-cover-hit" href="<?= e(asset_url('comic.php')) ?>">
        <img src="<?= e(asset_url('assets/comic/chudo-cover.webp')) ?>" alt="Чудо Комикс №1 — Oven Origins" width="480" height="720" />
        <span>Read №1</span>
      </a>
    </div>
  </div>
</section>

<?php order_board_place_settings(); ?>
<?php order_board_house_checks(); ?>

<section class="container feature-tiles" aria-label="Featured menu">
  <?php foreach ($features as $feature): ?>
    <a class="feature-tile" href="<?= e(asset_url('menu.php#' . $feature['id'])) ?>">
      <?= photo_img($feature['photo'], ['width' => 720, 'height' => 480]) ?>
      <?= print_title($feature['title'], 'print-title print-title--poster') ?>
    </a>
  <?php endforeach; ?>
</section>

<section class="split origin-section" id="our-story">
  <div class="container split-grid origin-grid">
    <div class="split-media origin-media">
      <?= photo_img('table', ['width' => 720, 'height' => 480]) ?>
      <span class="origin-badge"><?= e($origin['tag']) ?> · <?= e($origin['year']) ?></span>
    </div>
    <div class="origin-copy">
      <p class="kicker"><?= e($origin['subtitle']) ?></p>
      <h2 class="origin-title story-text" data-story-id="<?= e($origin['id']) ?>"><?= e($origin['title']) ?></h2>
      <blockquote class="origin-quote story-text" data-story-id="<?= e($origin['id']) ?>" data-field="quote">“<?= e($origin['quote']) ?>”</blockquote>
      <p class="origin-lead story-text" data-story-id="<?= e($origin['id']) ?>" data-field="excerpt"><?= e($origin['excerpt']) ?></p>
      <a class="btn btn-gold" href="<?= e(asset_url('about.php')) ?>">About Bville</a>
    </div>
  </div>
</section>

<section class="menu-preview">
  <div class="container">
    <header class="section-header">
      <h2><?= print_title('From the boards') ?></h2>
      <p class="section-lead">The boards from the wall — pizza, burgers, wraps, platters, salads, gelato.</p>
    </header>
    <div class="menu-grid">
      <?php foreach ($site['menu_categories'] as $cat): ?>
        <?php if (!in_array($cat['id'], $homeCats, true)) continue; ?>
        <a class="menu-grid-item" href="<?= e(asset_url('menu.php#' . $cat['id'])) ?>">
          <?= photo_img($cat['id'], ['width' => 480, 'height' => 320]) ?>
          <span class="menu-grid-banner"><?= e($cat['label']) ?></span>
        </a>
      <?php endforeach; ?>
    </div>
    <p class="home-menu-cta"><a class="btn btn-red btn-lg" href="<?= e(asset_url('menu.php')) ?>">See full menu</a></p>
  </div>
</section>

<section class="comic-band">
  <div class="container comic-band-inner">
    <div>
      <p class="kicker">Чудо Комикс №1</p>
      <h2>Oven Origins / Истоки Печи</h2>
      <p>A kitchen origin you can read with the kids — original heroes, real oven, same table.</p>
    </div>
    <a class="btn btn-red btn-lg" href="<?= e(asset_url('comic.php')) ?>">Read the issue</a>
  </div>
</section>

<section class="cafe-band cafe-robust-banner">
  <div class="cafe-banner-photo" style="background-image: url('<?= e(photo_meta('cafe')['src']) ?>')" aria-hidden="true"></div>
  <div class="container cafe-banner-inner">
    <img src="<?= e(asset_url($site['cafe_robust']['logos']['bean'])) ?>" alt="" width="72" height="96" aria-hidden="true" />
    <div>
      <h2>Cafe Robust</h2>
      <p>House blend, espresso, and cold brew inside Bville.</p>
    </div>
    <a class="btn btn-cafe" href="<?= e(asset_url('cafe.php')) ?>">Coffee menu</a>
  </div>
</section>

<section class="call-bar order-bar">
  <div class="container order-bar-inner">
    <p>Build the pie. We’ll have it warm at the counter.</p>
    <a class="btn btn-red" href="<?= e(asset_url('order/')) ?>">Order for the table</a>
  </div>
</section>

<?php require dirname(__DIR__) . '/src/includes/story-modal.php'; ?>
<?php require dirname(__DIR__) . '/src/includes/footer.php'; ?>
