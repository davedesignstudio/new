<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/helpers.php';

$site = site_config();
$cafe = $site['cafe_robust'];
$cafeStory = story_by_id('cafe-robust');
$pageTitle = $cafe['name'] . ' — ' . $site['name'];

require dirname(__DIR__) . '/src/includes/header.php';
?>

<section class="cafe-robust-hero cafe-robust-hero--photo">
  <div class="cafe-hero-photo" style="background-image: url('<?= e(photo_meta('cafe')['src']) ?>')" aria-hidden="true"></div>
  <div class="container cafe-robust-hero-grid">
    <div class="cafe-robust-copy">
      <p class="comic-pub">Чудо Комикс · Robust</p>
      <img class="cafe-logo-arch" src="<?= e(asset_url($cafe['logos']['arch'])) ?>" alt="Cafe Robust" width="240" height="86" />
      <p class="cafe-tagline"><?= e($cafe['tagline']) ?></p>
      <?php if ($cafeStory): ?>
        <p class="cafe-intro story-text" data-story-id="cafe-robust" data-field="excerpt"><?= e($cafeStory['excerpt']) ?></p>
        <button type="button" class="btn btn-cafe story-open" data-story-id="cafe-robust">Coffee story</button>
      <?php else: ?>
        <p class="cafe-intro">Fresh coffee at Bville Pizza &amp; Grill — served daily at <?= e($site['address']) ?>.</p>
      <?php endif; ?>
    </div>
    <?= photo_img('cafe', ['class' => 'cafe-hero-cup-photo', 'width' => 480, 'height' => 320]) ?>
  </div>
</section>

<section class="cafe-lifestyle">
  <div class="container cafe-lifestyle-grid">
    <?= photo_img('dining', ['class' => 'cafe-lifestyle-photo', 'width' => 720, 'height' => 480]) ?>
    <div class="cafe-logo-showcase cafe-logo-showcase--inline">
      <img src="<?= e(asset_url($cafe['logos']['bean'])) ?>" alt="Cafe Robust bean emblem" width="100" height="133" />
      <img src="<?= e(asset_url($cafe['logos']['wordmark'])) ?>" alt="Cafe Robust" width="260" height="65" />
      <img src="<?= e(asset_url($cafe['logos']['cr'])) ?>" alt="CR mark" width="120" height="90" />
      <img class="cafe-logo-cup" src="<?= e(asset_url($cafe['logos']['cup'])) ?>" alt="Cafe Robust coffee cup" width="160" height="144" />
    </div>
  </div>
</section>

<section class="cafe-menu-section">
  <div class="container">
    <h2 class="cafe-menu-title"><?= print_title('Coffee Menu') ?></h2>
    <ul class="cafe-menu-list">
      <?php foreach ($cafe['drinks'] as $drink): ?>
        <li class="cafe-menu-item">
          <?php
            $drinkSlug = (string) ($drink['slug'] ?? item_slug((string) $drink['name']));
          ?>
          <a class="cafe-menu-hit" href="<?= e(asset_url('order/?item=' . rawurlencode('drinks-' . $drinkSlug))) ?>">
            <div class="cafe-menu-item-head">
              <h3><?= e($drink['name']) ?></h3>
              <span><?= e($drink['price']) ?></span>
            </div>
            <p><?= e($drink['desc']) ?></p>
            <span class="dish-order">Add to cart</span>
          </a>
        </li>
      <?php endforeach; ?>
    </ul>
    <a class="btn btn-cafe" href="<?= e(asset_url('menu.php')) ?>">Back to full menu</a>
  </div>
</section>

<?php require dirname(__DIR__) . '/src/includes/story-modal.php'; ?>
<?php require dirname(__DIR__) . '/src/includes/footer.php'; ?>
