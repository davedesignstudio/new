<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/helpers.php';

$site = site_config();
$origin = featured_story();
$pageTitle = $site['name'] . ' — Order Online';
$homeCats = ['pizza', 'burgers', 'wraps', 'platters', 'garden', 'desserts'];
$features = [
    ['id' => 'pizza', 'title' => 'Stone Oven Baked', 'photo' => 'pizza'],
    ['id' => 'burgers', 'title' => 'Burgers', 'photo' => 'angus'],
    ['id' => 'desserts', 'title' => 'Sweet Endings', 'photo' => 'desserts'],
];

require dirname(__DIR__) . '/src/includes/header.php';
?>

<section class="hero">
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="kicker"><?= e($site['address']) ?> · Bernardsville</p>
      <h1><?= print_title('Bville', 'print-title print-title--hero') ?></h1>
      <p class="hero-sub">Pizza &amp; Grill</p>
      <p class="lede">Stone oven pizza, Angus burgers, and Italian gelato — the same boards, the same kitchen.</p>
      <div class="hero-actions">
        <a class="btn btn-red btn-lg" href="<?= e(asset_url('order/')) ?>">Order Online</a>
        <a class="btn btn-gold btn-lg" href="<?= e(asset_url('menu.php')) ?>">Full Menu</a>
        <a class="btn btn-gold btn-lg" href="tel:<?= e($site['phone_raw']) ?>"><?= e($site['phone']) ?></a>
      </div>
    </div>
    <?= photo_img('pizza', ['class' => 'hero-photo frame-photo', 'width' => 640, 'height' => 520, 'loading' => 'eager', 'fetchpriority' => 'high']) ?>
  </div>
</section>

<section class="feature-tiles" aria-label="Featured menu">
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
      <p class="section-lead">Pizza, burgers, wraps, platters, salads, and gelato.</p>
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
    <p>Customize your pie — size, crust, sauce, toppings</p>
    <a class="btn btn-gold" href="<?= e(asset_url('order/')) ?>">Order Online</a>
  </div>
</section>

<?php require dirname(__DIR__) . '/src/includes/story-modal.php'; ?>
<?php require dirname(__DIR__) . '/src/includes/footer.php'; ?>
