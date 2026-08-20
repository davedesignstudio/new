<?php

declare(strict_types=1);

$site = site_config();
?>
<div class="order-ticket" role="navigation" aria-label="Hours, phone, and online order">
  <div class="container order-ticket-inner">
    <a class="order-ticket-cell" href="<?= e(asset_url('contact.php')) ?>"><?= e($site['address']) ?> · <?= e($site['geo']['locality']) ?></a>
    <a class="order-ticket-cell" href="tel:<?= e($site['phone_raw']) ?>"><?= e($site['phone']) ?></a>
    <span class="order-ticket-cell"><?= e($site['hours']) ?></span>
    <span class="order-ticket-cell"><?= e($site['order']['pickup']) ?></span>
    <span class="order-ticket-cell"><?= e($site['order']['delivery']) ?></span>
    <a class="order-ticket-cta" href="<?= e(asset_url($site['order']['path'])) ?>"><?= e($site['order']['cta']) ?></a>
  </div>
</div>
