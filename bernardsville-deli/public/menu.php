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

<section class="hero menu-hero-lines">
  <div class="container">
    <p class="menu-kicker">Tap a line to order · Pickup or delivery</p>
    <h1 class="line-title line-title--hero">The Menu</h1>
    <p class="lede menu-lede">Printed-board titles. Prices on the line. Order stays on this site.</p>
  </div>
</section>

<nav class="menu-jump" aria-label="Menu sections">
  <div class="container menu-jump-inner">
    <?php foreach (menu_sections() as $section): ?>
      <a href="#<?= e($section['id']) ?>"><?= e($section['title']) ?></a>
    <?php endforeach; ?>
  </div>
</nav>

<section class="menu-lines">
  <div class="container menu-lines-inner">
    <?php foreach (menu_sections() as $section): ?>
      <article class="menu-block" id="<?= e($section['id']) ?>">
        <header class="menu-block-head">
          <h2 class="line-title"><?= print_title($section['title'], 'print-title', $section['wordmark'] ?? null) ?></h2>
          <?php if (!empty($section['note'])): ?>
            <p class="menu-block-note"><?= e($section['note']) ?></p>
          <?php endif; ?>
          <?php if (!empty($section['sizes'])): ?>
            <p class="menu-block-sizes"><span>12"</span><span>16"</span></p>
          <?php endif; ?>
        </header>
        <ul class="menu-line-list">
          <?php foreach ($section['items'] as $item): ?>
            <?php $orderId = (string) ($item['photo'] ?? item_slug((string) $item['name'])); ?>
            <li class="menu-line">
              <a class="menu-line-hit" href="<?= e(asset_url('order/?item=' . rawurlencode($orderId))) ?>">
                <div class="menu-line-body">
                  <div class="menu-line-row">
                    <h3>
                      <?= e($item['name']) ?>
                      <?php if (!empty($item['veg'])): ?><span class="badge-veg" title="Vegetarian">V</span><?php endif; ?>
                      <?php if (!empty($item['spicy'])): ?><span class="badge-spicy" title="Spicy">!</span><?php endif; ?>
                    </h3>
                    <span class="menu-leader" aria-hidden="true"></span>
                    <?php if (!empty($item['price_12'])): ?>
                      <span class="menu-line-prices">
                        <em><?= e($item['price_12']) ?></em>
                        <em><?= e($item['price_16']) ?></em>
                      </span>
                    <?php else: ?>
                      <span class="menu-line-price"><?= e($item['price']) ?></span>
                    <?php endif; ?>
                  </div>
                  <?php if (!empty($item['desc'])): ?>
                    <p class="menu-line-desc"><?= e($item['desc']) ?></p>
                  <?php endif; ?>
                </div>
              </a>
            </li>
          <?php endforeach; ?>
        </ul>
      </article>
    <?php endforeach; ?>
  </div>
</section>

<section class="print-boards print-boards--footer" aria-label="Printed menu boards">
  <div class="container">
    <header class="menu-catalog-head menu-catalog-head--boards">
      <h2 class="boards-heading">Printed boards</h2>
      <p class="section-lead">House sheets for reference.</p>
    </header>
    <div class="print-boards-grid">
      <?php foreach ($boards as $board): ?>
        <a class="print-board-card" href="<?= e(asset_url($board['src'])) ?>">
          <img src="<?= e(asset_url($board['src'])) ?>" alt="<?= e($board['alt']) ?>" width="674" height="872" loading="lazy" />
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section class="call-bar order-bar">
  <div class="container order-bar-inner">
    <p>Order online — or call ahead</p>
    <div class="hero-actions">
      <a class="btn btn-gold" href="<?= e(asset_url('order/')) ?>">Order Online</a>
      <a class="btn btn-gold" href="tel:<?= e($site['phone_raw']) ?>"><?= e($site['phone']) ?></a>
    </div>
  </div>
</section>

<?php require dirname(__DIR__) . '/src/includes/story-modal.php'; ?>
<?php require dirname(__DIR__) . '/src/includes/footer.php'; ?>
