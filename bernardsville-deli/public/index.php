<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/helpers.php';

$site = site_config();
$origin = featured_story();
$pageTitle = $site['name'] . ' — Order Online';

require dirname(__DIR__) . '/src/includes/header.php';
?>

<section class="hero-order">
  <div class="hero-order-bg" style="background-image: linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.6)), url('<?= e(asset_url($site['photos']['hero'])) ?>')" aria-hidden="true"></div>
  <div class="container hero-order-inner">
    <p class="hero-eyebrow"><?= e($site['tagline']) ?></p>
    <h1 class="hero-order-title">Order Online</h1>
    <div class="hero-order-actions">
      <a class="btn btn-red btn-lg" href="<?= e(asset_url('menu.php')) ?>">Order Now</a>
      <a class="btn btn-gold btn-lg" href="#our-story">Our Story</a>
    </div>
    <p class="hero-order-address"><?= e($site['address']) ?>, <?= e($site['city']) ?></p>
    <p class="hero-order-phone"><a href="tel:<?= e($site['phone_raw']) ?>"><?= e($site['phone']) ?></a></p>
  </div>
</section>

<section class="heritage-strip">
  <div class="container heritage-strip-inner">
    <?php foreach ($site['heritage'] as $pillar): ?>
      <span><?= e($pillar) ?></span>
    <?php endforeach; ?>
  </div>
</section>

<section class="origin-section" id="our-story">
  <div class="container origin-grid">
    <div class="origin-media">
      <img src="<?= e(asset_url($origin['image'])) ?>" alt="" width="560" height="360" loading="lazy" />
      <span class="origin-badge"><?= e($origin['tag']) ?> · <?= e($origin['year']) ?></span>
    </div>
    <div class="origin-copy">
      <p class="origin-eyebrow"><?= e($origin['subtitle']) ?></p>
      <h2 class="origin-title story-text" data-story-id="<?= e($origin['id']) ?>"><?= e($origin['title']) ?></h2>
      <blockquote class="origin-quote story-text" data-story-id="<?= e($origin['id']) ?>" data-field="quote">“<?= e($origin['quote']) ?>”</blockquote>
      <p class="origin-lead story-text" data-story-id="<?= e($origin['id']) ?>" data-field="excerpt"><?= e($origin['excerpt']) ?></p>
      <?php foreach ($origin['body'] as $i => $paragraph): ?>
        <p class="origin-body story-text" data-story-id="<?= e($origin['id']) ?>" data-field="body" data-index="<?= $i ?>"><?= e($paragraph) ?></p>
      <?php endforeach; ?>
      <button type="button" class="btn btn-gold story-open" data-story-id="<?= e($origin['id']) ?>">Read full story</button>
    </div>
  </div>
</section>

<section class="stories-section">
  <div class="container">
    <header class="section-header">
      <h2>Stories from Bville</h2>
      <p class="section-lead">Food, coffee, and neighborhood — one table.</p>
    </header>
    <div class="story-grid">
      <?php foreach (stories() as $story): ?>
        <?php if (!empty($story['featured'])) continue; ?>
        <article class="story-card">
          <button type="button" class="story-card-btn story-open" data-story-id="<?= e($story['id']) ?>">
            <img src="<?= e(asset_url($story['image'])) ?>" alt="" loading="lazy" width="340" height="220" />
            <div class="story-card-body">
              <span class="story-card-tag"><?= e($story['tag']) ?> · <?= e($story['year']) ?></span>
              <h3 class="story-text" data-story-id="<?= e($story['id']) ?>"><?= e($story['title']) ?></h3>
              <p class="story-text" data-story-id="<?= e($story['id']) ?>" data-field="excerpt"><?= e($story['excerpt']) ?></p>
            </div>
          </button>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section class="menu-grid-section">
  <div class="container">
    <header class="section-header">
      <h2>From the Menu</h2>
      <p class="section-lead">Tap a category — each plate has a story.</p>
    </header>
    <div class="menu-grid">
      <?php foreach ($site['menu_categories'] as $cat): ?>
        <a class="menu-grid-item menu-grid-item--photo" href="<?= e(asset_url('menu.php#' . $cat['id'])) ?>">
          <img src="<?= e(category_photo($cat['id'])) ?>" alt="" loading="lazy" width="320" height="220" />
          <span class="menu-grid-banner"><?= e($cat['label']) ?></span>
        </a>
      <?php endforeach; ?>
      <a class="menu-grid-center btn btn-red btn-lg" href="<?= e(asset_url('menu.php')) ?>">Our Menu</a>
    </div>
  </div>
</section>

<section class="cafe-robust-banner cafe-robust-banner--photo">
  <div class="cafe-banner-photo" style="background-image: url('<?= e(asset_url($site['photos']['cafe'])) ?>')" aria-hidden="true"></div>
  <div class="container cafe-banner-inner">
    <img src="<?= e(asset_url($site['cafe_robust']['logos']['bean'])) ?>" alt="" width="72" height="96" aria-hidden="true" />
    <div>
      <h2>Cafe Robust</h2>
      <p class="story-text" data-story-id="cafe-robust" data-field="excerpt"><?= e(story_by_id('cafe-robust')['excerpt'] ?? 'Bold coffee roasted for Bernardsville.') ?></p>
    </div>
    <a class="btn btn-cafe" href="<?= e(asset_url('cafe.php')) ?>">View Coffee Menu</a>
  </div>
</section>

<?php require dirname(__DIR__) . '/src/includes/story-modal.php'; ?>
<?php require dirname(__DIR__) . '/src/includes/footer.php'; ?>
