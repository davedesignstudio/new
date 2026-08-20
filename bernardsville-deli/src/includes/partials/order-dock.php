<?php

declare(strict_types=1);

$site = site_config();
?>
<div class="order-dock" aria-label="Place an order">
  <a class="order-dock-call" href="tel:<?= e($site['phone_raw']) ?>"><?= e($site['phone']) ?></a>
  <a class="btn btn-red" href="<?= e(asset_url($site['order']['path'])) ?>">Order for the table</a>
</div>
