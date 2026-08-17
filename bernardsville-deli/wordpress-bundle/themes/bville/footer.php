</main>
<footer class="site-footer">
  <div class="site-footer-inner">
    <img class="footer-logo" src="<?php echo esc_url(bville_asset('logo.png')); ?>" alt="<?php bloginfo('name'); ?>" width="96" height="96">
    <p><?php echo esc_html(bville_address()); ?></p>
    <p><a href="tel:<?php echo esc_attr(bville_phone_raw()); ?>"><?php echo esc_html(bville_phone()); ?></a></p>
    <p>&copy; <?php echo esc_html(gmdate('Y')); ?> <?php bloginfo('name'); ?></p>
  </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
