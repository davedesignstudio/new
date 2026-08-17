<?php
/**
 * WooCommerce wrapper — uses theme chrome.
 */
defined('ABSPATH') || exit;
get_header('shop');
?>
<div class="woocommerce-wrap">
  <?php woocommerce_content(); ?>
</div>
<?php
get_footer('shop');
