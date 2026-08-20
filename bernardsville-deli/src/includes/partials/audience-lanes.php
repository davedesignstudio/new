<?php

declare(strict_types=1);

$audiences = audience_config();
$family = $audiences['family'];
$phone = $audiences['phone'];
?>
<section class="audience-lanes" aria-label="Two ways to order">
  <div class="container audience-lanes-grid">
    <article class="audience-lane audience-lane--family">
      <p class="kicker" data-caption-en="<?= e((string) $family['kicker']) ?>" data-caption-blend="<?= e((string) $family['kicker_blend']) ?>"><?= e((string) $family['kicker']) ?></p>
      <h2><?= e((string) $family['title']) ?></h2>
      <p><?= e((string) $family['lede']) ?></p>
      <div class="audience-lane-actions">
        <a class="btn btn-red" href="<?= e(asset_url((string) $family['cta_href'])) ?>"><?= e((string) $family['cta']) ?></a>
        <a class="btn btn-ghost" href="<?= e(asset_url((string) $family['secondary_href'])) ?>"><?= e((string) $family['secondary']) ?></a>
      </div>
    </article>
    <article class="audience-lane audience-lane--phone">
      <p class="kicker" data-caption-en="<?= e((string) $phone['kicker']) ?>" data-caption-blend="<?= e((string) $phone['kicker_blend']) ?>"><?= e((string) $phone['kicker']) ?></p>
      <h2><?= e((string) $phone['title']) ?></h2>
      <p><?= e((string) $phone['lede']) ?></p>
      <div class="audience-lane-actions">
        <a class="btn btn-red" href="<?= e(asset_url((string) $phone['cta_href'])) ?>"><?= e((string) $phone['cta']) ?></a>
        <a class="btn btn-ghost" href="<?= e(asset_url((string) $phone['secondary_href'])) ?>"><?= e((string) $phone['secondary']) ?></a>
      </div>
    </article>
  </div>
</section>
