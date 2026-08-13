<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/helpers.php';

$site = site_config();
$pageTitle = 'Menu — ' . $site['name'];

require dirname(__DIR__) . '/src/includes/header.php';
?>

<section class="page-hero-photo" style="background-image: linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.55)), url('<?= e(asset_url($site['photos']['kitchen'])) ?>')">
  <div class="container page-hero-photo-inner">
    <h1 class="page-gold-title">Our Menu</h1>
    <p class="hero-eyebrow hero-eyebrow--light">Stone oven pizza · wraps · burgers · more</p>
  </div>
</section>

<section class="menu-grid-section menu-grid-section--compact">
  <div class="container">
    <div class="menu-grid menu-grid--compact">
      <?php foreach ($site['menu_categories'] as $cat): ?>
        <?php $catStory = story_for_category($cat['id']); ?>
        <a class="menu-grid-item menu-grid-item--photo" href="#<?= e($cat['id']) ?>">
          <img src="<?= e(category_photo($cat['id'])) ?>" alt="" loading="lazy" width="320" height="220" />
          <span class="menu-grid-banner"><?= e($cat['label']) ?></span>
          <?php if ($catStory): ?>
            <span class="menu-grid-story"><?= e($catStory['tag']) ?></span>
          <?php endif; ?>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section class="menu-list-section">
  <div class="container">
    <?php foreach (menu_sections() as $section): ?>
      <?php $sectionStory = story_for_category($section['id']); ?>
      <section class="menu-section" id="<?= e($section['id']) ?>">
        <header class="menu-section-header menu-section-header--photo">
          <img src="<?= e(category_photo($section['id'])) ?>" alt="" width="120" height="80" loading="lazy" />
          <div>
            <h2><?= e($section['title']) ?></h2>
            <?php if (!empty($section['note'])): ?>
              <p><?= e($section['note']) ?></p>
            <?php endif; ?>
            <?php if ($sectionStory): ?>
              <button type="button" class="menu-story-link story-open" data-story-id="<?= e($sectionStory['id']) ?>">
                The story behind this menu →
              </button>
            <?php endif; ?>
          </div>
        </header>
        <ul class="menu-items">
          <?php foreach ($section['items'] as $item): ?>
            <?php
              $slug = $item['slug'] ?? item_slug($item['name']);
              $itemStory = story_for_item($slug);
            ?>
            <li class="menu-item">
              <div class="menu-item-head">
                <h3><?= e($item['name']) ?></h3>
                <span class="menu-price"><?= e($item['price']) ?></span>
              </div>
              <?php if (!empty($item['desc'])): ?>
                <p><?= e($item['desc']) ?></p>
              <?php endif; ?>
              <?php if ($itemStory): ?>
                <button type="button" class="menu-story-link story-open" data-story-id="<?= e($itemStory['id']) ?>">
                  Read the story →
                </button>
              <?php endif; ?>
            </li>
          <?php endforeach; ?>
        </ul>
      </section>
    <?php endforeach; ?>
  </div>
</section>

<section class="order-bar">
  <div class="container order-bar-inner">
    <p>Ready to order?</p>
    <a class="btn btn-red" href="tel:<?= e($site['phone_raw']) ?>"><?= e($site['phone']) ?></a>
  </div>
</section>

<?php require dirname(__DIR__) . '/src/includes/story-modal.php'; ?>
<?php require dirname(__DIR__) . '/src/includes/footer.php'; ?>
