<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/helpers.php';

$site = site_config();
$pageTitle = 'Catering — ' . $site['name'];

require dirname(__DIR__) . '/src/includes/header.php';
?>

<section class="page-hero-simple">
  <div class="container">
    <h1 class="page-gold-title page-gold-title--dark">Catering</h1>
    <p class="lead-dark">Pizza trays, party platters, and grill favorites for your next event in Bernardsville.</p>
  </div>
</section>

<section class="content-section">
  <div class="container content-card">
    <p>From stone oven pizza to wraps and kabobs, Bville Pizza &amp; Grill caters gatherings of all sizes. Call us to build a custom menu for your party or office lunch.</p>
    <a class="btn btn-red btn-lg" href="tel:<?= e($site['phone_raw']) ?>">Call <?= e($site['phone']) ?></a>
  </div>
</section>

<?php require dirname(__DIR__) . '/src/includes/footer.php'; ?>
