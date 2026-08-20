<?php

declare(strict_types=1);

$brand = brand_config();
?>
<section class="place-settings" aria-label="Four places at the table">
  <div class="container">
    <header class="house-board-head">
      <p class="kicker">The table</p>
      <h2><?= e((string) $brand['tagline']) ?></h2>
      <p class="section-lead"><?= e((string) $brand['line']) ?></p>
    </header>
    <div class="place-settings-grid">
      <?php foreach ($brand['places'] as $place): ?>
        <article class="place-setting" id="place-<?= e((string) $place['id']) ?>">
          <img src="<?= e(asset_url((string) $place['mark'])) ?>" alt="" width="88" height="88" />
          <p class="kicker"><?= e((string) $place['word']) ?></p>
          <h3><?= e((string) $place['line']) ?></h3>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>
