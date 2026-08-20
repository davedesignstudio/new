<?php

declare(strict_types=1);

$audiences = audience_config();
?>
<section class="issue-notes" aria-labelledby="issue-notes-title">
  <div class="container issue-notes-inner">
    <p class="comic-pub">Issue notes · Two tables</p>
    <h2 id="issue-notes-title">Who this board is drawn for</h2>
    <p class="issue-notes-overlap"><?= e((string) $audiences['overlap']) ?></p>
    <div class="issue-notes-grid">
      <div>
        <h3><?= e((string) $audiences['family']['kicker']) ?></h3>
        <ul>
          <?php foreach ($audiences['family']['facts'] as $fact): ?>
            <li><?= e((string) $fact) ?></li>
          <?php endforeach; ?>
        </ul>
      </div>
      <div>
        <h3><?= e((string) $audiences['phone']['kicker']) ?></h3>
        <ul>
          <?php foreach ($audiences['phone']['facts'] as $fact): ?>
            <li><?= e((string) $fact) ?></li>
          <?php endforeach; ?>
        </ul>
      </div>
    </div>
    <p class="issue-notes-sources">
      Sources:
      <?php foreach ($audiences['sources'] as $i => $source): ?>
        <a href="<?= e((string) $source['url']) ?>" rel="noopener noreferrer"><?= e((string) $source['title']) ?></a><?= $i < count($audiences['sources']) - 1 ? ' · ' : '' ?>
      <?php endforeach; ?>
    </p>
  </div>
</section>
