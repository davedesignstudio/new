  </main>
  <section class="newsletter">
    <div class="container newsletter-inner">
      <h2 class="newsletter-title">Subscribe</h2>
      <div class="newsletter-bar">
        <p>House specials and issue drops — 15% off the first order.</p>
        <button type="button" class="btn btn-signup">Sign Up</button>
      </div>
    </div>
  </section>
  <?php $cfg = site_config(); $designer = $cfg['designer']; ?>
  <footer class="site-footer">
    <div class="container footer-inner">
      <img class="footer-logo" src="<?= e(asset_url('assets/logo.png')) ?>" alt="<?= e($cfg['name']) ?>" width="100" height="100" />
      <p><?= e($cfg['address']) ?> · <?= e($cfg['city']) ?></p>
      <p><a href="tel:<?= e($cfg['phone_raw']) ?>"><?= e($cfg['phone']) ?></a></p>
      <p class="footer-copy">Copyright © <?= date('Y') ?> <?= e($cfg['name']) ?>. All rights reserved.</p>
      <a class="footer-designer" href="<?= e($designer['url']) ?>" target="_blank" rel="noopener noreferrer" aria-label="Designed by <?= e($designer['name']) ?>">
        <span class="footer-designer-label">Designed by</span>
        <img src="<?= e(asset_url($designer['logo'])) ?>" alt="<?= e($designer['name']) ?>" width="180" height="48" />
      </a>
    </div>
  </footer>
  <script src="<?= e(asset_url('js/app.js')) ?>" defer></script>
  <?php if (($page ?? current_page()) === 'comic'): ?>
    <script src="<?= e(asset_url('js/comic.js')) ?>" defer></script>
  <?php endif; ?>
  <?php order_board_dock(); ?>
</body>
</html>
