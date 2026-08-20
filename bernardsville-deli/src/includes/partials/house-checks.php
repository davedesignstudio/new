<?php

declare(strict_types=1);

$site = site_config();
$checks = $site['house_checks'];
?>
<section class="house-board" aria-label="Order the house favorites">
  <div class="container">
    <header class="house-board-head">
      <p class="kicker">Guest checks · The usual</p>
      <h2>The names this table already knows</h2>
      <p class="section-lead">Tap a check for the table — 16" pies, pickup at the counter, delivery from this kitchen.</p>
    </header>
    <div class="house-checks">
      <?php foreach ($checks as $check): ?>
        <a class="guest-check" href="<?= e(order_item_url((string) $check['item'])) ?>">
          <span class="guest-check-meta">
            <span class="guest-check-no">No. <?= e((string) $check['no']) ?></span>
            <span class="guest-check-tag"><?= e((string) $check['tag']) ?></span>
          </span>
          <h3><?= e((string) $check['name']) ?></h3>
          <p><?= e((string) $check['desc']) ?></p>
          <span class="guest-check-price"><?= e((string) $check['price']) ?></span>
          <span class="guest-check-cta">Add to order</span>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>
