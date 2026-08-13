<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/helpers.php';

$site = site_config();
$pageTitle = 'Menu — ' . $site['name'];

require dirname(__DIR__) . '/src/includes/header.php';
?>

<section class="page-hero-simple">
  <div class="container">
    <h1 class="page-gold-title page-gold-title--dark">Our Menu</h1>
    <p class="lead-dark">Stone oven pizza, wraps, handhelds, sandwiches, panini &amp; burgers.</p>
  </div>
</section>

<section class="menu-grid-section menu-grid-section--compact">
  <div class="container">
    <div class="menu-grid menu-grid--compact">
      <?php foreach ($site['menu_categories'] as $cat): ?>
        <a class="menu-grid-item" href="#<?= e($cat['id']) ?>">
          <span class="menu-grid-banner"><?= e($cat['label']) ?></span>
          <span class="menu-grid-icon" aria-hidden="true"><?= $cat['emoji'] ?></span>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section class="menu-list-section">
  <div class="container">
    <?php foreach (menu_sections() as $section): ?>
      <section class="menu-section" id="<?= e($section['id']) ?>">
        <header class="menu-section-header">
          <h2><?= e($section['title']) ?></h2>
          <?php if (!empty($section['note'])): ?>
            <p><?= e($section['note']) ?></p>
          <?php endif; ?>
        </header>
        <ul class="menu-items">
          <?php foreach ($section['items'] as $item): ?>
            <li class="menu-item">
              <div class="menu-item-head">
                <h3><?= e($item['name']) ?></h3>
                <span class="menu-price"><?= e($item['price']) ?></span>
              </div>
              <?php if (!empty($item['desc'])): ?>
                <p><?= e($item['desc']) ?></p>
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

<?php require dirname(__DIR__) . '/src/includes/footer.php'; ?>
