<?php

declare(strict_types=1);

/** @var array<int, array<string, mixed>> $storiesPayload */
$storiesPayload = array_map(static function (array $story): array {
    $blend = story_blend_map()[$story['id']] ?? [];
    return [
        'id' => $story['id'],
        'tag' => $story['tag'],
        'year' => $story['year'],
        'title' => $story['title'],
        'subtitle' => $story['subtitle'] ?? '',
        'excerpt' => $story['excerpt'],
        'quote' => $story['quote'] ?? '',
        'body' => $story['body'],
        'image' => asset_url($story['image']),
        'read_time' => $story['read_time'] ?? '',
        'related_category' => $story['related_category'] ?? null,
        'related_item' => $story['related_item'] ?? null,
        'blend' => $blend,
    ];
}, stories());
?>
<div class="story-modal" id="story-modal" hidden aria-hidden="true">
  <div class="story-modal-backdrop" data-close-modal></div>
  <div class="story-modal-panel" role="dialog" aria-modal="true" aria-labelledby="story-modal-title">
    <button type="button" class="story-modal-close" data-close-modal aria-label="Close story">&times;</button>
    <img class="story-modal-image" id="story-modal-image" src="" alt="" width="640" height="360" />
    <div class="story-modal-content">
      <span class="story-modal-tag" id="story-modal-tag"></span>
      <h2 id="story-modal-title"></h2>
      <p class="story-modal-subtitle" id="story-modal-subtitle"></p>
      <blockquote class="story-modal-quote" id="story-modal-quote"></blockquote>
      <div class="story-modal-body" id="story-modal-body"></div>
      <a class="btn btn-red" id="story-modal-cta" href="#">Order from the menu</a>
    </div>
  </div>
</div>
<script type="application/json" id="stories-data"><?= json_encode($storiesPayload, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) ?></script>
