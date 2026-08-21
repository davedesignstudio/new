<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/helpers.php';

$site = site_config();
$brand = brand_config();
$pageTitle = 'House book — ' . $site['name'];

require dirname(__DIR__) . '/src/includes/header.php';
?>

<section class="house-cover">
  <div class="container house-cover-inner">
    <img class="house-cover-stamp" src="<?= e(asset_url('assets/brand/house-stamp.svg')) ?>" alt="For the table, 159 Morristown Rd" width="220" height="220" />
    <div>
      <p class="comic-pub">House book · <?= e((string) $brand['imprint']) ?></p>
      <p class="kicker"><?= e((string) $brand['address']) ?></p>
      <h1><?= print_title('Bville', 'print-title print-title--hero') ?></h1>
      <p class="hero-sub">Pizza &amp; Grill</p>
      <p class="house-cover-tag"><?= e((string) $brand['tagline']) ?></p>
      <p class="lede"><?= e((string) $brand['line']) ?></p>
    </div>
  </div>
</section>

<section class="house-manifesto">
  <div class="container house-manifesto-inner">
    <img src="<?= e(asset_url('assets/brand/table-mark.svg')) ?>" alt="" width="140" height="140" />
    <div>
      <?php foreach ($brand['manifesto'] as $para): ?>
        <p><?= e((string) $para) ?></p>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section class="house-marks">
  <div class="container">
    <header class="section-header">
      <p class="comic-pub">Marks</p>
      <h2>The table, the stamp, the sign</h2>
      <p class="section-lead">A family table as the symbol. A rubber stamp for the bag. Parkside for the road you already know.</p>
    </header>
    <div class="house-live-lockup" aria-label="Bville lockup">
      <img src="<?= e(asset_url('assets/brand/table-mark.svg')) ?>" alt="" width="92" height="92" />
      <div class="house-live-lockup-type">
        <?= print_title('Bville', 'print-title print-title--hero') ?>
        <p class="hero-sub">Pizza &amp; Grill</p>
        <p class="house-live-lockup-line">For the table</p>
      </div>
    </div>
    <div class="house-marks-grid">
      <figure class="house-mark-card">
        <img src="<?= e(asset_url('assets/brand/table-mark.svg')) ?>" alt="Table mark — four plates, one pie" width="200" height="200" />
        <figcaption>Table mark</figcaption>
      </figure>
      <figure class="house-mark-card">
        <img src="<?= e(asset_url('assets/brand/house-stamp.svg')) ?>" alt="House stamp" width="200" height="200" />
        <figcaption>House stamp</figcaption>
      </figure>
      <figure class="house-mark-card house-mark-card--wide">
        <img src="<?= e(asset_url('assets/brand/lockup.svg')) ?>" alt="Bville lockup" width="480" height="120" />
        <figcaption>Lockup</figcaption>
      </figure>
      <figure class="house-mark-card">
        <img src="<?= e(asset_url('assets/logo.svg')) ?>" alt="Bville seal" width="160" height="160" />
        <figcaption>Seal</figcaption>
      </figure>
      <figure class="house-mark-card">
        <img src="<?= e(asset_url('assets/brand/takeout-bag.svg')) ?>" alt="Takeout bag" width="140" height="180" />
        <figcaption>Bag</figcaption>
      </figure>
      <figure class="house-mark-card">
        <img src="<?= e(asset_url('assets/brand/burger-sleeve.svg')) ?>" alt="Burger sleeve" width="140" height="180" />
        <figcaption>Sleeve</figcaption>
      </figure>
    </div>
  </div>
</section>

<section class="place-settings place-settings--book" aria-label="Four places at the table">
  <div class="container">
    <header class="section-header">
      <p class="comic-pub">Feeling</p>
      <h2>Four places at the table</h2>
    </header>
    <div class="place-settings-grid">
      <?php foreach ($brand['places'] as $place): ?>
        <article class="place-setting">
          <img src="<?= e(asset_url((string) $place['mark'])) ?>" alt="" width="100" height="100" />
          <p class="kicker"><?= e((string) $place['word']) ?></p>
          <h3><?= e((string) $place['line']) ?></h3>
          <p><?= e((string) $place['body']) ?></p>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section class="house-palette">
  <div class="container">
    <header class="section-header">
      <p class="comic-pub">Heat</p>
      <h2>Kitchen colors</h2>
    </header>
    <div class="house-swatches">
      <?php foreach ($brand['colors'] as $color): ?>
        <figure class="house-swatch">
          <span style="background: <?= e((string) $color['hex']) ?>"></span>
          <figcaption>
            <strong><?= e((string) $color['name']) ?></strong>
            <em><?= e((string) $color['hex']) ?></em>
            <small><?= e((string) $color['use']) ?></small>
          </figcaption>
        </figure>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section class="house-type">
  <div class="container">
    <header class="section-header">
      <p class="comic-pub">Voice on the page</p>
      <h2>Type as furniture</h2>
    </header>
    <div class="house-type-list">
      <?php
        $typeClass = [
            'The sign' => 'sign',
            'The line' => 'line',
            'The note' => 'note',
            'The story' => 'story',
            'The issue' => 'issue',
        ];
      ?>
      <?php foreach ($brand['type'] as $face): ?>
        <article class="house-type-row">
          <p class="kicker"><?= e((string) $face['role']) ?></p>
          <p class="house-type-sample house-type-sample--<?= e($typeClass[$face['role']] ?? 'story') ?>"><?= e((string) $face['sample']) ?></p>
          <p><?= e((string) $face['note']) ?></p>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section class="house-story-beats">
  <div class="container">
    <header class="section-header">
      <p class="comic-pub">Story</p>
      <h2><?= e((string) $brand['story']['title']) ?></h2>
    </header>
    <div class="house-beats">
      <?php foreach ($brand['story']['beats'] as $beat): ?>
        <article class="house-beat house-beat--type">
          <p class="kicker"><?= e((string) $beat['title']) ?></p>
          <p><?= e((string) $beat['text']) ?></p>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section class="house-voice-check">
  <div class="container house-voice-grid">
    <div class="guest-check house-voice-pad">
      <span class="guest-check-meta"><span>House check</span><span>No. 00</span></span>
      <h2><?= e((string) $brand['voice']['we']) ?></h2>
      <p><?= e((string) $brand['voice']['you']) ?></p>
      <ul>
        <?php foreach ($brand['voice']['lines'] as $line): ?>
          <li><?= e((string) $line) ?></li>
        <?php endforeach; ?>
      </ul>
    </div>
    <div>
      <p class="kicker">Always</p>
      <ul class="house-voice-rules"><?php foreach ($brand['voice']['always'] as $line): ?><li><?= e((string) $line) ?></li><?php endforeach; ?></ul>
      <p class="kicker">Never</p>
      <ul class="house-voice-rules house-voice-rules--never"><?php foreach ($brand['voice']['never'] as $line): ?><li><?= e((string) $line) ?></li><?php endforeach; ?></ul>
    </div>
  </div>
</section>

<section class="house-why">
  <div class="container house-why-inner">
    <img src="<?= e(asset_url('assets/brand/house-stamp.svg')) ?>" alt="" width="96" height="96" />
    <div>
      <p class="kicker">Kept in the kitchen</p>
      <p class="lede"><?= e((string) $brand['why']) ?></p>
      <p>
        <a class="btn btn-red" href="<?= e(asset_url('order/')) ?>">Order for the table</a>
        <a class="btn btn-ghost" href="<?= e(asset_url('comic.php')) ?>">Read Чудо №1</a>
      </p>
    </div>
  </div>
</section>

<?php require dirname(__DIR__) . '/src/includes/footer.php'; ?>
