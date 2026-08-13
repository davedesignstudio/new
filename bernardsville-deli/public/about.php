<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/helpers.php';

$site = site_config();
$sections = menu_sections();
$pageTitle = 'About Us — ' . $site['name'];

require dirname(__DIR__) . '/src/includes/header.php';
?>

<section class="page-burgundy">
  <div class="container about-hero">
    <p class="script-accent">Angus · Prime Rib</p>
    <h1 class="page-gold-title">Burgers At Bville</h1>
    <div class="about-hero-image">
      <p class="script-stack">So Sweet<br />So Tasty<br />So Juicy</p>
      <div class="burger-placeholder" aria-hidden="true">🍔</div>
    </div>
  </div>

  <div class="container about-copy">
    <h2 class="script-heading">About Us</h2>
    <p class="about-text"><?= e($site['about']) ?></p>
    <div class="about-actions">
      <a class="btn btn-gold btn-block" href="tel:<?= e($site['phone_raw']) ?>">Call us <?= e($site['phone']) ?></a>
      <a class="btn btn-gold btn-block" href="<?= e(asset_url('contact.php')) ?>">Make A Reservation</a>
    </div>
  </div>
</section>

<?php require dirname(__DIR__) . '/src/includes/footer.php'; ?>
