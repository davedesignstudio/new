  </main>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <p class="footer-name"><?= e(site_config()['name']) ?></p>
        <p><?= e(site_config()['address']) ?><br /><?= e(site_config()['city']) ?></p>
      </div>
      <div>
        <p><a href="tel:<?= e(site_config()['phone_raw']) ?>"><?= e(site_config()['phone']) ?></a></p>
        <p><?= e(site_config()['hours']) ?></p>
      </div>
      <div>
        <p><a href="<?= e(asset_url('menu.php')) ?>">View menu</a></p>
        <p class="footer-note">Fresh food from the lunch counter · Groceries &amp; local favorites</p>
      </div>
    </div>
    <p class="footer-copy container">© <?= date('Y') ?> <?= e(site_config()['name']) ?></p>
  </footer>
  <script src="<?= e(asset_url('js/app.js')) ?>" defer></script>
</body>
</html>
