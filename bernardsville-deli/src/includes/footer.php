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
  <footer class="site-footer">
    <div class="container footer-inner">
      <img class="footer-logo" src="<?= e(asset_url('assets/logo.svg')) ?>" alt="<?= e(site_config()['name']) ?>" width="100" height="100" />
      <p class="footer-copy">Copyright © <?= date('Y') ?> <?= e(site_config()['name']) ?>. All rights reserved.</p>
    </div>
  </footer>
  <script src="<?= e(asset_url('js/app.js')) ?>" defer></script>
</body>
</html>
