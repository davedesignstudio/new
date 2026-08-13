<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/helpers.php';

$site = site_config();
$sections = menu_sections();
$menuGraphic = resolve_menu_graphic();
$sources = source_assets_status();
$pageTitle = 'Menu — ' . $site['name'];

require dirname(__DIR__) . '/src/includes/header.php';
?>

<section class="page-hero">
  <div class="container">
    <p class="eyebrow">Front menu &amp; daily favorites</p>
    <h1>Menu</h1>
    <p class="lead">From the counter at <?= e($site['address']) ?> — call ahead for large orders.</p>
  </div>
</section>

<section class="menu-graphic-section">
  <div class="container">
    <div class="menu-graphic-frame">
      <?php if ($menuGraphic): ?>
        <img
          class="front-menu-image front-menu-image--full"
          src="<?= e($menuGraphic['src']) ?>"
          alt="<?= e($menuGraphic['alt']) ?>"
        />
        <p class="menu-source">Loaded from <?= e($menuGraphic['source']) ?></p>
      <?php else: ?>
        <img
          class="front-menu-image front-menu-image--full"
          src="<?= e(menu_placeholder_url()) ?>"
          alt="Bernardsville Deli front menu board placeholder"
        />
        <p class="menu-source">
          Placeholder board —
          export <code>graphic for front menu deli bernardsville.ai</code> to
          <code>assets/menu/front-menu.png</code>
          <?php if ($sources['ai']): ?>(source AI detected)<?php endif; ?>
        </p>
      <?php endif; ?>
    </div>
  </div>
</section>

<section class="menu-list-section">
  <div class="container">
    <?php foreach ($sections as $section): ?>
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
    <p>Ready to order? Call the counter — we'll have it waiting.</p>
    <a class="btn btn-primary" href="tel:<?= e($site['phone_raw']) ?>"><?= e($site['phone']) ?></a>
  </div>
</section>

<?php require dirname(__DIR__) . '/src/includes/footer.php'; ?>
