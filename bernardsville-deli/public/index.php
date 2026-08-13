<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/helpers.php';

$site = site_config();
$menuGraphic = resolve_menu_graphic();
$sources = source_assets_status();
$pageTitle = $site['name'] . ' — ' . $site['tagline'];

require dirname(__DIR__) . '/src/includes/header.php';
?>

<section class="hero">
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">Bernardsville, New Jersey</p>
      <h1>Your neighborhood deli on Morristown Road</h1>
      <p class="lead">
        Breakfast sandwiches, Boar's Head subs, hot lunch from the counter, and everyday groceries —
        made fresh behind the counter every day.
      </p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="<?= e(asset_url('menu.php')) ?>">See the menu</a>
        <a class="btn btn-secondary" href="tel:<?= e($site['phone_raw']) ?>">Order by phone</a>
      </div>
      <p class="hero-hours"><?= e($site['hours']) ?></p>
    </div>
    <div class="hero-menu-card">
      <?php if ($menuGraphic): ?>
        <img
          class="front-menu-image"
          src="<?= e($menuGraphic['src']) ?>"
          alt="<?= e($menuGraphic['alt']) ?>"
          loading="eager"
        />
      <?php else: ?>
        <img
          class="front-menu-image"
          src="<?= e(menu_placeholder_url()) ?>"
          alt="Bernardsville Deli front menu board"
          loading="eager"
        />
      <?php endif; ?>
      <p class="menu-caption">Front menu · <?= e($site['address']) ?></p>
    </div>
  </div>
</section>

<section class="features">
  <div class="container feature-grid">
    <article>
      <h2>Breakfast</h2>
      <p>Egg sandwiches on rolls and bagels, hot coffee, and Jersey favorites to start your day.</p>
    </article>
    <article>
      <h2>Deli Counter</h2>
      <p>Cold cuts sliced to order, stacked subs, and grilled sandwiches made while you wait.</p>
    </article>
    <article>
      <h2>Food Store</h2>
      <p>Snacks, beverages, bread, salads, and local specialty items — all in one stop.</p>
    </article>
  </div>
</section>

<section class="visit" id="visit">
  <div class="container visit-grid">
    <div>
      <h2>Visit us</h2>
      <address>
        <strong><?= e($site['name']) ?></strong><br />
        <?= e($site['address']) ?><br />
        <?= e($site['city']) ?>
      </address>
      <p><a href="tel:<?= e($site['phone_raw']) ?>"><?= e($site['phone']) ?></a></p>
      <p><?= e($site['hours']) ?></p>
    </div>
    <div class="map-card">
      <iframe
        title="Map to Bernardsville Deli"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        src="https://maps.google.com/maps?q=75+Morristown+Rd,+Bernardsville,+NJ+07924&output=embed"
      ></iframe>
    </div>
  </div>
</section>

<?php if (!$sources['ai'] || !$sources['idlk']): ?>
<section class="asset-note container">
  <p>
    <strong>Design assets:</strong>
    Place <code>graphic for front menu deli bernardsville.ai</code> and
    <code>~bernardsville deli~07z_p2.idlk</code> in <code>assets/source/</code>,
    then export the menu to <code>assets/menu/front-menu.png</code> for the live graphic.
  </p>
</section>
<?php endif; ?>

<?php require dirname(__DIR__) . '/src/includes/footer.php'; ?>
