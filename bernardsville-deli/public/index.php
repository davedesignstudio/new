<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/helpers.php';

$site = site_config();
$origin = featured_story();
$pageTitle = $site['name'] . ' — Order Online';
$homeCats = ['pizza', 'platters', 'burgers', 'wraps', 'sandwiches', 'garden'];

require dirname(__DIR__) . '/src/includes/header.php';
?>

<section class="hero-order hero-bag">
  <div class="hero-order-bg" style="background-image: linear-gradient(90deg, rgba(26,18,12,.78) 0%, rgba(242,101,34,.38) 55%, rgba(26,18,12,.55) 100%), url('<?= e(photo_meta('hero')['src']) ?>')" aria-hidden="true"></div>
  <div class="container hero-order-inner hero-bag-inner">
    <img class="hero-bag-logo" src="<?= e(asset_url('assets/brand/takeout-bag.svg')) ?>" alt="<?= e($site['name']) ?> takeout bag" width="160" height="206" />
    <div>
      <p class="hero-eyebrow">159 Morristown Rd · Bernardsville</p>
      <h1 class="hero-order-title">Order Online</h1>
      <p class="hero-bag-tag">Stone oven pizza · Angus burgers · Mediterranean grill</p>
      <div class="hero-order-actions">
        <a class="btn btn-red btn-lg" href="<?= e(asset_url('menu.php')) ?>">Full Menu</a>
        <a class="btn btn-gold btn-lg" href="tel:<?= e($site['phone_raw']) ?>"><?= e($site['phone']) ?></a>
      </div>
    </div>
  </div>
</section>

<section class="pack-strip">
  <div class="container pack-strip-inner pack-strip-inner--photos">
    <img src="<?= e(asset_url('assets/brand/burger-sleeve.svg')) ?>" alt="Angus Beefy Burgers sleeve" width="280" height="175" />
    <?= photo_img('angus', ['class' => 'pack-strip-photo', 'width' => 320, 'height' => 400]) ?>
    <div>
      <p class="origin-eyebrow">From the bag</p>
      <h2 class="origin-title">Angus · Beefy · Burgers</h2>
      <p>Same mark as the takeout sleeve — Classic, Boom Boom, Chetzel, and the rest of the grill line.</p>
      <a class="btn btn-gold" href="<?= e(asset_url('menu.php#burgers')) ?>">Burger menu</a>
    </div>
  </div>
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
      <p class="section-lead">The same sections as the printed menu — with the food in frame.</p>
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

<section class="photo-gallery-section" aria-labelledby="gallery-heading">
  <div class="container">
    <header class="section-header">
      <h2 id="gallery-heading">From the kitchen</h2>
      <p class="section-lead">Pizza, platters, burgers, and coffee — the plates that match the boards.</p>
    </header>
    <div class="photo-mosaic">
      <?php foreach ($site['photos']['gallery'] as $i => $shot): ?>
        <figure class="photo-mosaic-item<?= $i === 0 ? ' photo-mosaic-item--wide' : '' ?><?= $i === 6 ? ' photo-mosaic-item--wide' : '' ?>">
          <?= photo_img($shot['key'], ['width' => $i === 0 || $i === 6 ? 960 : 480, 'height' => 360]) ?>
          <figcaption><?= e($shot['caption']) ?></figcaption>
        </figure>
      <?php endforeach; ?>
    </div>
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
