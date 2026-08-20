</main>
<footer class="site-footer">
  <div class="site-footer-inner">
    <img class="footer-logo" src="<?php echo esc_url(bville_asset('logo.png')); ?>" alt="<?php bloginfo('name'); ?>" width="96" height="96">
    <img class="footer-stamp" src="<?php echo esc_url(bville_asset('brand/house-stamp.svg')); ?>" alt="For the table" width="88" height="88">
    <p class="footer-tag">For the table.</p>
    <p><?php echo esc_html(bville_address()); ?></p>
    <p><a href="tel:<?php echo esc_attr(bville_phone_raw()); ?>"><?php echo esc_html(bville_phone()); ?></a></p>
    <p><a href="<?php echo esc_url(bville_instagram()); ?>" target="_blank" rel="noopener me">Instagram</a></p>
    <p>&copy; <?php echo esc_html(gmdate('Y')); ?> <?php bloginfo('name'); ?>. All rights reserved.</p>
    <a class="footer-designer" href="https://linkedin.com/in/david-philhower-984264169" target="_blank" rel="noopener noreferrer">
      <span>Designed by</span>
      <img src="<?php echo esc_url(bville_asset('philhower-logo.svg')); ?>" alt="Philhower" width="180" height="48">
    </a>
  </div>
</footer>
<?php wp_footer(); ?>
<?php bville_order_board_dock(); ?>
</body>
</html>
