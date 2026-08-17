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

<section class="hero menu-hero-clean">
  <div class="container paper-hero-inner">
    <h1><?= print_title('The Menu', 'print-title print-title--hero') ?></h1>
    <p class="lede">Clean lines. Every plate, photographed.</p>
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
  <div class="container menu-catalog">
    <?php foreach (menu_sections() as $section): ?>
      <article class="print-section menu-catalog-section" id="<?= e($section['id']) ?>">
        <header class="menu-catalog-head">
          <h2 class="print-heading">
            <?= print_title($section['title'], 'print-title', $section['wordmark'] ?? $section['id']) ?>
          </h2>
          <?php if (!empty($section['note'])): ?>
            <p class="print-note"><?= e($section['note']) ?></p>
          <?php endif; ?>
          <?php if (!empty($section['sizes'])): ?>
            <p class="print-sizes"><span>12"</span><span>16"</span></p>
          <?php endif; ?>
        </header>
        <ul class="dish-grid<?= $section['id'] === 'desserts' ? ' dish-grid--dessert' : '' ?>">
          <?php foreach ($section['items'] as $item): ?>
            <?php
              $photo = item_photo_url($item);
              $orderId = (string) ($item['photo'] ?? item_slug((string) $item['name']));
            ?>
            <li class="dish-card">
              <a class="dish-card-hit" href="<?= e(asset_url('order/?item=' . rawurlencode($orderId))) ?>">
                <?php if ($photo): ?>
                  <div class="dish-photo<?= item_photo_contain($item) ? ' dish-photo--contain' : '' ?>">
                    <img src="<?= e($photo) ?>" alt="" width="480" height="360" loading="lazy" decoding="async" />
                  </div>
                <?php endif; ?>
                <div class="dish-body">
                  <div class="print-item-row">
                    <h3>
                      <?= e($item['name']) ?>
                      <?php if (!empty($item['veg'])): ?><span class="badge-veg" title="Vegetarian">V</span><?php endif; ?>
                      <?php if (!empty($item['spicy'])): ?><span class="badge-spicy" title="Spicy">!</span><?php endif; ?>
                    </h3>
                    <span class="menu-leader" aria-hidden="true"></span>
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
                  <span class="dish-order">Add →</span>
                </div>
              </a>
            </li>
          <?php endforeach; ?>
        </ul>
      </article>
    <?php endforeach; ?>
    <p class="menu-photo-credit">
      Dish photos include restaurant photography and
      <a href="https://commons.wikimedia.org/">Wikimedia Commons</a> images.
      <a href="<?= e(asset_url('assets/photos/menu/CREDITS.json')) ?>">Photo credits</a>.
    </p>
  </div>
</section>

<section class="print-boards print-boards--footer" aria-label="Printed menu boards">
  <div class="container">
    <header class="menu-catalog-head menu-catalog-head--boards">
      <h2 class="boards-heading">Printed boards</h2>
      <p class="section-lead">The house menu sheets, for reference.</p>
    </header>
    <div class="print-boards-grid">
      <?php foreach ($boards as $i => $board): ?>
        <a class="print-board-card" href="<?= e(asset_url($board['src'])) ?>">
          <img src="<?= e(asset_url($board['src'])) ?>" alt="<?= e($board['alt']) ?>" width="674" height="872" loading="lazy" />
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section class="call-bar order-bar">
  <div class="container order-bar-inner">
    <p>Every printed item is in the online order — or call ahead</p>
    <div class="hero-actions">
      <a class="btn btn-gold" href="<?= e(asset_url('order/')) ?>">Order Online</a>
      <a class="btn btn-gold" href="tel:<?= e($site['phone_raw']) ?>"><?= e($site['phone']) ?></a>
    </div>
  </div>
</section>

<?php require dirname(__DIR__) . '/src/includes/story-modal.php'; ?>
<?php require dirname(__DIR__) . '/src/includes/footer.php'; ?>
