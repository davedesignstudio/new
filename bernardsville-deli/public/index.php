<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/helpers.php';

$site = site_config();
$origin = featured_story();
$pageTitle = $site['name'] . ' — Order Online';
$homeCats = ['pizza', 'burgers', 'wraps', 'platters', 'garden', 'desserts'];

require dirname(__DIR__) . '/src/includes/header.php';
?>

<section class="slate-hero slate-hero--home">
  <div class="container slate-hero-grid">
    <div>
      <?= wordmark_img('burgers', 'Burgers', ['class' => 'slate-wordmark', 'width' => 720, 'height' => 140]) ?>
      <p class="hero-eyebrow">159 Morristown Rd · Bernardsville</p>
      <p class="hero-bag-tag">Stone oven pizza · Angus burgers · Italian gelato</p>
      <div class="hero-order-actions">
        <a class="btn btn-red btn-lg" href="<?= e(asset_url('menu.php')) ?>">Full Menu</a>
        <a class="btn btn-gold btn-lg" href="tel:<?= e($site['phone_raw']) ?>"><?= e($site['phone']) ?></a>
      </div>
    </div>
    <?= photo_img('bacon_burger', ['class' => 'slate-hero-photo', 'width' => 520, 'height' => 520, 'loading' => 'eager', 'fetchpriority' => 'high']) ?>
  </div>
</section>

<section class="poster-row">
  <a class="poster-card" href="<?= e(asset_url('menu.php#pizza')) ?>">
    <?= photo_img('pizza', ['width' => 800, 'height' => 520]) ?>
    <?= wordmark_img('pizza', 'Stone Oven Baked', ['class' => 'poster-wordmark', 'width' => 480, 'height' => 160]) ?>
  </a>
  <a class="poster-card" href="<?= e(asset_url('menu.php#burgers')) ?>">
    <?= photo_img('angus', ['width' => 800, 'height' => 520]) ?>
    <?= wordmark_img('burgers', 'Burgers', ['class' => 'poster-wordmark', 'width' => 480, 'height' => 120]) ?>
  </a>
</section>

<section class="origin-section" id="our-story">
  <div class="container origin-grid">
    <div class="origin-media renaissance-frame">
      <?= photo_img('table', ['width' => 720, 'height' => 480]) ?>
      <span class="origin-badge"><?= e($origin['tag']) ?> · <?= e($origin['year']) ?></span>
    </div>
    <div class="origin-copy">
      <p class="origin-eyebrow"><?= e($origin['subtitle']) ?></p>
      <h2 class="origin-title story-text" data-story-id="<?= e($origin['id']) ?>"><?= e($origin['title']) ?></h2>
      <blockquote class="origin-quote story-text" data-story-id="<?= e($origin['id']) ?>" data-field="quote">“<?= e($origin['quote']) ?>”</blockquote>
      <p class="origin-lead story-text" data-story-id="<?= e($origin['id']) ?>" data-field="excerpt"><?= e($origin['excerpt']) ?></p>
      <a class="btn btn-gold" href="<?= e(asset_url('about.php')) ?>">About Bville</a>
    </div>
  </div>
</section>

<section class="menu-grid-section">
  <div class="container">
    <header class="section-header section-header--light">
      <h2>From the boards</h2>
      <p class="section-lead">The same Parkside headers as the printed menu.</p>
    </header>
    <div class="menu-grid menu-grid--home">
      <?php foreach ($site['menu_categories'] as $cat): ?>
        <?php if (!in_array($cat['id'], $homeCats, true)) continue; ?>
        <a class="menu-grid-item menu-grid-item--photo" href="<?= e(asset_url('menu.php#' . $cat['id'])) ?>">
          <?= photo_img($cat['id'], ['width' => 480, 'height' => 320]) ?>
          <span class="menu-grid-banner"><?= e($cat['label']) ?></span>
        </a>
      <?php endforeach; ?>
    </div>
    <p class="home-menu-cta"><a class="btn btn-red btn-lg" href="<?= e(asset_url('menu.php')) ?>">See full menu</a></p>
  </div>
</section>

<section class="cafe-robust-banner cafe-robust-banner--photo">
  <div class="cafe-banner-photo" style="background-image: url('<?= e(photo_meta('cafe')['src']) ?>')" aria-hidden="true"></div>
  <div class="container cafe-banner-inner">
    <img src="<?= e(asset_url($site['cafe_robust']['logos']['bean'])) ?>" alt="" width="72" height="96" aria-hidden="true" />
    <div>
      <h2>Cafe Robust</h2>
      <p>House blend, espresso, and cold brew inside Bville — brown and gold on the cup.</p>
    </div>
    <a class="btn btn-cafe" href="<?= e(asset_url('cafe.php')) ?>">Coffee menu</a>
  </div>
</section>

<?php require dirname(__DIR__) . '/src/includes/story-modal.php'; ?>
<?php require dirname(__DIR__) . '/src/includes/footer.php'; ?>
