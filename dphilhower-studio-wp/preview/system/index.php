<?php
/**
 * Static preview of the modular brand pieces.
 *
 * @package DPhilhowerStudio
 */

require_once dirname( __DIR__, 2 ) . '/theme/dphilhower-studio/inc/design-modules.php';

$resolved = dps_design_resolve( 'ember' );
$json     = json_encode(
	dps_design_catalog(),
	JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_UNICODE
);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Modular pieces — D Philhower Studio</title>
  <meta name="description" content="Six design pieces on one frame. Swap the mark or the color chord and the menu, window, pack, and kitchen ticket stay fitted.">
  <link rel="icon" href="../img/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&family=Syne:wght@500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/main.css">
  <link rel="stylesheet" href="../css/editorial.css">
  <link rel="stylesheet" href="../css/modules.css">
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <a class="brand-mark" href="../index.html"><img src="../img/d-philhower-lockup.png" alt="D Philhower Studio" width="1024" height="1024"></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
    <ul class="nav" id="site-nav">
      <li><a href="../work/index.html">Brands</a></li>
      <li><a href="../services/index.html">Services</a></li>
      <li><a href="../order/index.html">Order</a></li>
      <li><a href="../system/" aria-current="page">System</a></li>
      <li><a href="../about/index.html">About</a></li>
      <li class="cta"><a href="../contact/index.html">Start a project</a></li>
    </ul>
  </header>
  <main id="main">
    <header class="page-hero modules-hero">
      <p class="section-label">Modular pieces</p>
      <h1>A custom restaurant, built from pieces that fit.</h1>
      <p>One frame holds six pieces: a mark, a color chord, a menu sheet, a window band, a pack label, and a kitchen ticket. Swap the mark or the chord. The menu, the window, the pack, and the ticket stay aligned.</p>
    </header>
    <section class="section" id="assemble" style="padding-top:0">
      <div id="module-bench">
        <?php echo dps_design_switches_html(); ?>
        <p class="assembly-readout" id="assembly-readout" aria-live="polite"><?php echo dps_design_esc( dps_design_readout( $resolved ) ); ?></p>
        <?php echo dps_design_assembly_html( $resolved ); ?>
      </div>
      <div class="piece-key">
        <?php foreach ( dps_design_pieces() as $piece ) : ?>
          <article>
            <h3><?php echo dps_design_esc( $piece['title'] ); ?></h3>
            <p><?php echo dps_design_esc( $piece['copy'] ); ?></p>
          </article>
        <?php endforeach; ?>
      </div>
      <p class="modules-note">Ember, Casa Forno, Salt &amp; Cedar, Mizu, Juniper, and Kiln are studio identities. They show how the pieces fit. They are not live accounts. A placed order still prints from the order desk.</p>
      <p class="cta-row">
        <a class="btn btn-primary" href="../order/index.html">Open the order system</a>
      </p>
    </section>
  </main>
  <footer class="site-footer">
    <div class="footer-inner">
      <span>© <span id="dps-year">2026</span> D Philhower Studio · dphilhower.com</span>
      <span>Restaurant identity · Morris County, NJ</span>
    </div>
  </footer>
  <script src="../js/main.js"></script>
  <script>window.dpsModules = <?php echo $json; ?>;</script>
  <script src="modules.js"></script>
</body>
</html>
