<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/helpers.php';

$site = site_config();
$issue = require dirname(__DIR__) . '/src/includes/chudo-comic.php';
$pageTitle = $issue['publisher'] . ' №' . $issue['no'] . ' — ' . $site['name'];
$bodyClass = 'bville-brand comic-issue';

require dirname(__DIR__) . '/src/includes/header.php';
?>

<section class="comic-masthead">
  <div class="container comic-masthead-inner">
    <p class="kicker comic-kicker" data-caption-en="<?= e($issue['kicker_en']) ?>" data-caption-blend="<?= e($issue['kicker_en']) ?> / <?= e($issue['kicker_ru']) ?>"><?= e($issue['kicker_en']) ?></p>
    <p class="comic-pub"><?= e($issue['publisher']) ?> · <?= e($issue['publisher_latin']) ?> №<?= e($issue['no']) ?></p>
    <h1 class="comic-title">
      <span class="comic-title-ru"><?= e($issue['title_ru']) ?></span>
      <span class="comic-title-en"><?= e($issue['title_en']) ?></span>
    </h1>
    <p class="lede comic-lede" data-caption-en="<?= e($issue['disclaimer_en']) ?>" data-caption-blend="<?= e($issue['disclaimer_en']) ?> / <?= e($issue['disclaimer_ru']) ?>"><?= e($issue['disclaimer_en']) ?></p>
  </div>
</section>

<section class="comic-reader" data-comic-reader aria-label="<?= e($issue['publisher'] . ' №' . $issue['no']) ?>">
  <div class="container comic-reader-inner">
    <?php foreach ($issue['pages'] as $index => $page): ?>
      <?php
        $ctaHref = $page['cta_href'] ?? ($page['order_item']
            ? 'order/?item=' . rawurlencode((string) $page['order_item'])
            : 'order/');
      ?>
      <article
        class="comic-page<?= $index === 0 ? ' is-active' : '' ?>"
        data-comic-page="<?= (int) $index ?>"
        <?= $index === 0 ? '' : 'hidden' ?>
      >
        <figure class="comic-frame">
          <img
            src="<?= e(asset_url('assets/comic/' . $page['file'])) ?>"
            alt="<?= e($issue['publisher'] . ' №' . $issue['no'] . ' — ' . $page['label_en']) ?>"
            width="1024"
            height="1536"
            <?= $index === 0 ? 'fetchpriority="high"' : 'loading="lazy"' ?>
          />
        </figure>
        <div class="comic-meta">
          <p class="comic-page-label">
            <span data-caption-en="<?= e($page['label_en']) ?>" data-caption-blend="<?= e($page['label_en']) ?> / <?= e($page['label_ru']) ?>"><?= e($page['label_en']) ?></span>
            <span class="comic-page-count"><?= (int) ($index + 1) ?> / <?= count($issue['pages']) ?></span>
          </p>
          <p class="comic-caption" data-caption-en="<?= e($page['caption_en']) ?>" data-caption-blend="<?= e($page['caption_en']) ?> / <?= e($page['caption_ru']) ?>"><?= e($page['caption_en']) ?></p>
          <a class="btn btn-red" href="<?= e(asset_url($ctaHref)) ?>" data-caption-en="<?= e($page['cta_en']) ?>" data-caption-blend="<?= e($page['cta_en']) ?> / <?= e($page['cta_ru']) ?>"><?= e($page['cta_en']) ?></a>
        </div>
      </article>
    <?php endforeach; ?>

    <nav class="comic-nav" aria-label="Comic pages">
      <button type="button" class="comic-nav-btn" data-comic-prev>‹ Prev</button>
      <ol class="comic-dots">
        <?php foreach ($issue['pages'] as $index => $page): ?>
          <li>
            <button
              type="button"
              class="comic-dot<?= $index === 0 ? ' is-active' : '' ?>"
              data-comic-goto="<?= (int) $index ?>"
              aria-label="<?= e('Page ' . ($index + 1) . ': ' . $page['label_en']) ?>"
            ><?= (int) ($index + 1) ?></button>
          </li>
        <?php endforeach; ?>
      </ol>
      <button type="button" class="comic-nav-btn" data-comic-next>Next ›</button>
    </nav>
  </div>
</section>

<section class="comic-roster">
  <div class="container">
    <header class="house-board-head">
      <p class="kicker">Ростер / Roster</p>
      <h2>House heroes</h2>
      <p class="section-lead">Tap a name to order that plate — the issue is fiction, the food is the menu.</p>
    </header>
    <div class="house-checks">
      <a class="guest-check" href="<?= e(order_item_url('pizza-bville-special')) ?>">
        <span class="guest-check-meta"><span>Шаверма</span><span>Shawerma</span></span>
        <h3>B’Ville Special</h3>
        <p>Shawarma chicken, garlic drizzle.</p>
        <span class="guest-check-cta">Add to order</span>
      </a>
      <a class="guest-check" href="<?= e(order_item_url('cheesesteak-jersey')) ?>">
        <span class="guest-check-meta"><span>Джерси Стейк</span><span>Jersey Steak</span></span>
        <h3>Jersey Cheesesteak</h3>
        <p>Brown gravy potatoes &amp; mozzarella.</p>
        <span class="guest-check-cta">Add to order</span>
      </a>
      <a class="guest-check" href="<?= e(order_item_url('burgers-chetzel')) ?>">
        <span class="guest-check-meta"><span>Чецел</span><span>Chetzel</span></span>
        <h3>Chetzel</h3>
        <p>Bacon, cheddar &amp; jack on pretzel bun.</p>
        <span class="guest-check-cta">Add to order</span>
      </a>
    </div>
  </div>
</section>

<?php require dirname(__DIR__) . '/src/includes/footer.php'; ?>
