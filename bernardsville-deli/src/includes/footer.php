  </main>
  <section class="newsletter">
    <div class="container newsletter-inner">
      <h2 class="newsletter-title">NewsLetter</h2>
      <div class="newsletter-bar">
        <p>Get 15% off your first purchase when you sign up!</p>
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
      <?php if (!empty($cfg['photo_credit'])): ?>
        <p class="footer-photos">
          <?= e($cfg['photo_credit']) ?>
          <?php if (!empty($cfg['yelp'])): ?>
            · <a href="<?= e($cfg['yelp']) ?>" target="_blank" rel="noopener noreferrer">See on Yelp</a>
          <?php endif; ?>
        </p>
      <?php endif; ?>
      <a class="footer-designer" href="<?= e($designer['url']) ?>" target="_blank" rel="noopener noreferrer" aria-label="Designed by <?= e($designer['name']) ?>">
        <span class="footer-designer-label">Designed by</span>
        <img src="<?= e(asset_url($designer['logo'])) ?>" alt="<?= e($designer['name']) ?>" width="180" height="48" />
      </a>
    </div>
  </footer>
  <script src="<?= e(asset_url('js/app.js')) ?>" defer></script>
</body>
</html>
