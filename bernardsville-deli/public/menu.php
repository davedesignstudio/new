<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/helpers.php';

$site = site_config();
$pageTitle = 'Menu — ' . $site['name'];

require dirname(__DIR__) . '/src/includes/header.php';
?>

<section class="print-menu-hero print-menu-hero--photo">
  <?= photo_img('pizza', ['class' => 'print-menu-hero-photo', 'width' => 1600, 'height' => 520, 'loading' => 'eager', 'fetchpriority' => 'high']) ?>
  <div class="container print-menu-hero-inner">
    <img class="print-menu-mark" src="<?= e(asset_url('assets/logo.svg')) ?>" alt="" width="88" height="88" />
    <h1>Stone Oven Pizza</h1>
    <p>Bville Pizza &amp; Grill · 159 Morristown Rd</p>
  </div>
</section>

<nav class="print-menu-jump" aria-label="Menu sections">
  <div class="container print-menu-jump-inner">
    <?php foreach (menu_sections() as $section): ?>
      <a href="#<?= e($section['id']) ?>"><?= e($section['title']) ?></a>
    <?php endforeach; ?>
  </div>
</nav>

<section class="print-menu">
  <div class="container print-menu-board print-menu-board--cols">
    <?php foreach (menu_sections() as $section): ?>
      <article class="print-section" id="<?= e($section['id']) ?>">
        <?php if (!empty($section['watermark'])): ?>
          <span class="print-watermark" aria-hidden="true"><?= e($section['watermark']) ?></span>
        <?php endif; ?>
        <figure class="print-section-photo">
          <?= photo_img($section['id'], ['class' => 'print-section-photo-img', 'width' => 720, 'height' => 280]) ?>
        </figure>
        <h2 class="print-heading"><?= e($section['title']) ?></h2>
        <?php if (!empty($section['note'])): ?>
          <p class="print-note"><?= e($section['note']) ?></p>
        <?php endif; ?>
        <?php if (!empty($section['sizes'])): ?>
          <p class="print-sizes"><span>12"</span><span>16"</span></p>
        <?php endif; ?>
        <ul class="print-items">
          <?php foreach ($section['items'] as $item): ?>
            <li class="print-item">
              <div class="print-item-row">
                <h3>
                  <?= e($item['name']) ?>
                  <?php if (!empty($item['veg'])): ?><span class="badge-veg" title="Vegetarian">V</span><?php endif; ?>
                  <?php if (!empty($item['spicy'])): ?><span class="badge-spicy" title="Spicy">!</span><?php endif; ?>
                </h3>
                <?php if (!empty($item['price_12'])): ?>
                  <span class="print-prices">
                    <em><?= e($item['price_12']) ?></em>
                    <em><?= e($item['price_16']) ?></em>
                  </span>
                <?php else: ?>
                  <span class="print-price"><?= e($item['price']) ?></span>
                <?php endif; ?>
              </div>
              <?php if (!empty($item['desc'])): ?>
                <p><?= e($item['desc']) ?></p>
              <?php endif; ?>
            </li>
          <?php endforeach; ?>
        </ul>
      </article>
    <?php endforeach; ?>
  </div>
</section>

<section class="order-bar">
  <div class="container order-bar-inner">
    <p>Call in your order</p>
    <a class="btn btn-red" href="tel:<?= e($site['phone_raw']) ?>"><?= e($site['phone']) ?></a>
  </div>
</section>

<?php require dirname(__DIR__) . '/src/includes/story-modal.php'; ?>
<?php require dirname(__DIR__) . '/src/includes/footer.php'; ?>
