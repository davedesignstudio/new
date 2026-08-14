<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/helpers.php';

$site = site_config();
$pageTitle = 'Menu — ' . $site['name'];
$boards = [
    ['src' => 'assets/menu/board-1.jpg', 'alt' => 'Garden, starters, shakes, and burgers'],
    ['src' => 'assets/menu/board-2.jpg', 'alt' => 'Wraps, pasta, cheesesteaks, sandwiches, and panini'],
    ['src' => 'assets/menu/board-3.jpg', 'alt' => 'Stone oven pizza, headlines, and kids menu'],
    ['src' => 'assets/menu/board-4.jpg', 'alt' => 'Sweet Endings Italian gelato'],
];

require dirname(__DIR__) . '/src/includes/header.php';
?>

<section class="paper-hero">
  <div class="container paper-hero-inner">
    <h1><?= print_title('The Menu', 'print-title print-title--hero') ?></h1>
    <p>Cream stock, orange frame, and outlined script titles — just like the printed boards.</p>
  </div>
</section>

<nav class="print-menu-jump" aria-label="Menu sections">
  <div class="container print-menu-jump-inner">
    <?php foreach (menu_sections() as $section): ?>
      <a href="#<?= e($section['id']) ?>"><?= e($section['title']) ?></a>
    <?php endforeach; ?>
  </div>
</nav>

<section class="print-boards" aria-label="Printed menu boards">
  <div class="container print-boards-grid">
    <?php foreach ($boards as $i => $board): ?>
      <a class="print-board-card" href="<?= e(asset_url($board['src'])) ?>">
        <img src="<?= e(asset_url($board['src'])) ?>" alt="<?= e($board['alt']) ?>" width="674" height="872" loading="<?= $i === 0 ? 'eager' : 'lazy' ?>" />
      </a>
    <?php endforeach; ?>
  </div>
</section>

<section class="print-menu">
  <div class="container print-menu-board print-menu-board--cols">
    <?php foreach (menu_sections() as $section): ?>
      <article class="print-section" id="<?= e($section['id']) ?>">
        <?php if (!empty($section['watermark'])): ?>
          <span class="print-watermark" aria-hidden="true"><?= e($section['watermark']) ?></span>
        <?php endif; ?>
        <h2 class="print-heading">
          <?= print_title($section['title']) ?>
        </h2>
        <?php if (!empty($section['note'])): ?>
          <p class="print-note"><?= e($section['note']) ?></p>
        <?php endif; ?>
        <?php if (!empty($section['sizes'])): ?>
          <p class="print-sizes"><span>12"</span><span>16"</span></p>
        <?php endif; ?>
        <ul class="print-items<?= !empty($section['id']) && $section['id'] === 'desserts' ? ' print-items--dessert' : '' ?>">
          <?php foreach ($section['items'] as $item): ?>
            <li class="print-item">
              <?php if (!empty($item['photo'])): ?>
                <img class="dessert-thumb" src="<?= e(asset_url('assets/photos/' . $item['photo'] . '.png')) ?>" alt="" width="120" height="140" loading="lazy" />
              <?php endif; ?>
              <div>
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
              </div>
            </li>
          <?php endforeach; ?>
        </ul>
      </article>
    <?php endforeach; ?>
  </div>
</section>

<section class="order-bar">
  <div class="container order-bar-inner">
    <p>In a hurry? Don’t worry — call ahead</p>
    <a class="btn btn-red" href="tel:<?= e($site['phone_raw']) ?>"><?= e($site['phone']) ?></a>
  </div>
</section>

<?php require dirname(__DIR__) . '/src/includes/story-modal.php'; ?>
<?php require dirname(__DIR__) . '/src/includes/footer.php'; ?>
