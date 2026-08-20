<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/helpers.php';

$site = site_config();
$brand = brand_config();
$pageTitle = 'House voice — ' . $site['name'];

require dirname(__DIR__) . '/src/includes/header.php';
?>

<section class="hero issue-hero brand-hero">
  <div class="container">
    <p class="comic-pub">House voice · From the two tables</p>
    <p class="kicker">Warmth · Closeness · Familiarity · Family</p>
    <h1 class="brand-promise"><?= e((string) $brand['house']) ?></h1>
    <p class="lede"><?= e((string) $brand['promise']) ?></p>
  </div>
</section>

<section class="brand-feelings" aria-label="Four brand feelings">
  <div class="container brand-feelings-grid">
    <?php foreach ($brand['feelings'] as $feeling): ?>
      <article class="brand-feeling" id="<?= e((string) $feeling['id']) ?>">
        <p class="kicker" data-caption-en="<?= e((string) $feeling['word']) ?>" data-caption-blend="<?= e((string) $feeling['word']) ?> / <?= e((string) $feeling['word_ru']) ?>"><?= e((string) $feeling['word']) ?></p>
        <h2><?= e((string) $feeling['say']) ?></h2>
        <p class="brand-feeling-research"><?= e((string) $feeling['from_research']) ?></p>
        <p><?= e((string) $feeling['means']) ?></p>
        <p class="brand-feeling-story"><?= e((string) $feeling['story']) ?></p>
        <p class="brand-feeling-dont"><span>Not this.</span> <?= e((string) $feeling['dont']) ?></p>
      </article>
    <?php endforeach; ?>
  </div>
</section>

<section class="content-section brand-conclusions">
  <div class="container">
    <header class="section-header">
      <p class="comic-pub">Conclusions</p>
      <h2>What the research decided for us</h2>
      <p class="section-lead">Two audiences — the Somerset family table, and the phone in a millennial parent’s hand. One overlap. These are the rules that follow.</p>
    </header>
    <ol class="brand-conclusion-list">
      <?php foreach ($brand['conclusions'] as $row): ?>
        <li>
          <p class="brand-finding"><?= e((string) $row['finding']) ?></p>
          <p class="brand-so"><?= e((string) $row['so']) ?></p>
        </li>
      <?php endforeach; ?>
    </ol>
  </div>
</section>

<section class="content-section brand-voice">
  <div class="container brand-split">
    <div>
      <p class="kicker">Voice</p>
      <h2><?= e((string) $brand['voice']['register']) ?></h2>
      <p class="lede"><?= e((string) $brand['voice']['we_are']) ?> <?= e((string) $brand['voice']['we_are_not']) ?></p>
      <p class="brand-tone"><?= e(implode(' · ', $brand['voice']['tone'])) ?></p>
    </div>
    <div class="brand-always-never">
      <div>
        <h3>Always</h3>
        <ul>
          <?php foreach ($brand['voice']['always'] as $line): ?>
            <li><?= e((string) $line) ?></li>
          <?php endforeach; ?>
        </ul>
      </div>
      <div>
        <h3>Never</h3>
        <ul>
          <?php foreach ($brand['voice']['never'] as $line): ?>
            <li><?= e((string) $line) ?></li>
          <?php endforeach; ?>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="content-section brand-story">
  <div class="container">
    <p class="kicker">Storytelling</p>
    <h2><?= e((string) $brand['story']['logline']) ?></h2>
    <p class="lede"><?= e((string) $brand['story']['origin']) ?></p>
    <ul class="brand-heroes">
      <?php foreach ($brand['story']['heroes'] as $hero): ?>
        <li><?= e((string) $hero) ?></li>
      <?php endforeach; ?>
    </ul>
    <p><?= e((string) $brand['story']['villain']) ?></p>
    <p class="brand-ritual"><?= e((string) $brand['story']['ritual']) ?></p>
    <p><a class="btn btn-red" href="<?= e(asset_url('comic.php')) ?>">Read Чудо №1 with the table</a></p>
  </div>
</section>

<section class="content-section brand-visual">
  <div class="container">
    <header class="section-header">
      <p class="comic-pub">Marks</p>
      <h2>How the board should feel</h2>
    </header>
    <ul class="brand-visual-list">
      <?php foreach ($brand['visual'] as $line): ?>
        <li><?= e((string) $line) ?></li>
      <?php endforeach; ?>
    </ul>
  </div>
</section>

<section class="content-section brand-samples">
  <div class="container">
    <header class="section-header">
      <p class="comic-pub">Lines</p>
      <h2>Cold to warm</h2>
    </header>
    <div class="brand-sample-grid">
      <?php foreach ($brand['samples'] as $sample): ?>
        <article class="brand-sample">
          <p class="brand-sample-cold"><?= e((string) $sample['cold']) ?></p>
          <p class="brand-sample-warm"><?= e((string) $sample['warm']) ?></p>
        </article>
      <?php endforeach; ?>
    </div>
    <p class="home-menu-cta">
      <a class="btn btn-red" href="<?= e(asset_url('order/')) ?>">Order for the table</a>
      <a class="btn btn-ghost" href="<?= e(asset_url('index.php')) ?>">Back to the house</a>
    </p>
  </div>
</section>

<?php require dirname(__DIR__) . '/src/includes/footer.php'; ?>
