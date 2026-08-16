<?php

declare(strict_types=1);

function site_config(): array
{
    static $config = null;
    if ($config === null) {
        $config = require dirname(__DIR__) . '/includes/config.php';
    }
    return $config;
}

function menu_sections(): array
{
    static $menu = null;
    if ($menu === null) {
        $menu = require dirname(__DIR__) . '/includes/menu-data.php';
    }
    return $menu;
}

function base_path(): string
{
    $script = str_replace('\\', '/', $_SERVER['SCRIPT_NAME'] ?? '');
    $dir = dirname($script);
    if ($dir === '/' || $dir === '\\') {
        return '';
    }
    return rtrim($dir, '/');
}

function asset_url(string $relative): string
{
    return base_path() . '/' . ltrim($relative, '/');
}

function resolve_menu_graphic(): ?array
{
    $root = dirname(__DIR__, 2);
    $cfg = site_config()['menu_graphic'];
    $candidates = [
        ['path' => $root . '/' . $cfg['export_webp'], 'public' => 'assets/menu/front-menu.webp'],
        ['path' => $root . '/' . $cfg['export_png'], 'public' => 'assets/menu/front-menu.png'],
        ['path' => $root . '/' . $cfg['export_jpg'], 'public' => 'assets/menu/front-menu.jpg'],
    ];

    foreach ($candidates as $candidate) {
        if (is_file($candidate['path'])) {
            return [
                'src' => asset_url($candidate['public']),
                'alt' => site_config()['name'] . ' front menu',
                'source' => basename($candidate['path']),
            ];
        }
    }

    return null;
}

function menu_placeholder_url(): string
{
    return asset_url(site_config()['menu_graphic']['placeholder']);
}

function source_assets_status(): array
{
    $root = dirname(__DIR__, 2);
    $cfg = site_config()['menu_graphic'];
    return [
        'ai' => is_file($root . '/' . $cfg['ai']),
        'idlk' => is_file($root . '/' . $cfg['idlk']),
    ];
}

function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function current_page(): string
{
    $page = basename($_SERVER['SCRIPT_NAME'] ?? 'index.php', '.php');
    return $page === 'index' ? 'home' : $page;
}

function stories(): array
{
    static $stories = null;
    if ($stories === null) {
        $stories = require dirname(__DIR__) . '/includes/stories.php';
    }
    return $stories;
}

function story_blend_map(): array
{
    static $blend = null;
    if ($blend === null) {
        $blend = require dirname(__DIR__) . '/includes/story-blend.php';
    }
    return $blend;
}

function resolve_story(array $story, string $lang = 'en'): array
{
    if ($lang !== 'blend') {
        return $story;
    }

    $overlay = story_blend_map()[$story['id']] ?? [];
    return array_merge($story, array_filter($overlay, static fn ($value) => $value !== null && $value !== ''));
}

function featured_story(string $lang = 'en'): array
{
    foreach (stories() as $story) {
        if (!empty($story['featured'])) {
            return resolve_story($story, $lang);
        }
    }
    return resolve_story(stories()[0], $lang);
}

function story_by_id(string $id, string $lang = 'en'): ?array
{
    foreach (stories() as $story) {
        if ($story['id'] === $id) {
            return resolve_story($story, $lang);
        }
    }
    return null;
}

function story_for_item(string $slug, string $lang = 'en'): ?array
{
    foreach (stories() as $story) {
        if (($story['related_item'] ?? null) === $slug) {
            return resolve_story($story, $lang);
        }
    }
    return null;
}

function story_for_category(string $categoryId, string $lang = 'en'): ?array
{
    foreach (stories() as $story) {
        if (($story['related_category'] ?? null) === $categoryId) {
            return resolve_story($story, $lang);
        }
    }
    return null;
}

function category_photo(string $categoryId): string
{
    return photo_meta($categoryId)['src'];
}

function photo_meta(string $key): array
{
    $site = site_config();
    $photos = $site['photos'];
    $file = $photos['categories'][$key]
        ?? ($photos[$key] ?? null)
        ?? $photos['hero'];
    $alt = $photos['alts'][$key] ?? $site['name'];

    return [
        'file' => $file,
        'src' => asset_url($file),
        'alt' => $alt,
    ];
}

function photo_img(string $key, array $attrs = []): string
{
    $meta = photo_meta($key);
    $class = e((string) ($attrs['class'] ?? ''));
    $width = (int) ($attrs['width'] ?? 800);
    $height = (int) ($attrs['height'] ?? 520);
    $loading = e((string) ($attrs['loading'] ?? 'lazy'));
    $decoding = e((string) ($attrs['decoding'] ?? 'async'));
    $extra = '';
    if (!empty($attrs['fetchpriority'])) {
        $extra .= ' fetchpriority="' . e((string) $attrs['fetchpriority']) . '"';
    }

    return sprintf(
        '<img src="%s" alt="%s" class="%s" width="%d" height="%d" loading="%s" decoding="%s"%s />',
        e($meta['src']),
        e($meta['alt']),
        $class,
        $width,
        $height,
        $loading,
        $decoding,
        $extra
    );
}

function item_slug(string $name): string
{
    $slug = strtolower($name);
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug) ?? $slug;
    return trim($slug, '-');
}

/**
 * Render a print title as the branded wordmark PNG file.
 *
 * @param string      $title    Accessible alt text / fallback label
 * @param string      $class    CSS class list (supports print-title--hero / --poster)
 * @param string|null $wordmark Optional wordmark slug (file under assets/brand/wordmarks/)
 */
function print_title(string $title, string $class = 'print-title', ?string $wordmark = null): string
{
    $slug = $wordmark ?? print_title_wordmark_slug($title);
    $rel = 'assets/brand/wordmarks/' . $slug . '.png';
    $fs = dirname(__DIR__, 2) . '/public/' . $rel;

    if (!is_file($fs)) {
        return sprintf('<span class="%s">%s</span>', e($class), e($title));
    }

    $width = 640;
    $height = 180;
    if (str_contains($class, 'print-title--hero')) {
        $width = 720;
        $height = 220;
    } elseif (str_contains($class, 'print-title--poster')) {
        $width = 480;
        $height = 160;
    }

    return sprintf(
        '<img class="%s" src="%s" alt="%s" width="%d" height="%d" decoding="async" />',
        e($class),
        e(asset_url($rel)),
        e($title),
        $width,
        $height
    );
}

function print_title_wordmark_slug(string $title): string
{
    static $map = [
        'Bville' => 'bville',
        'The Menu' => 'the-menu',
        'Catering' => 'catering',
        'Contact' => 'contact',
        'Visit' => 'visit',
        'Coffee Menu' => 'coffee-menu',
        'The bag' => 'the-bag',
        'From the boards' => 'from-the-boards',
        'From The Garden' => 'garden',
        'Starters' => 'starters',
        'Shakes' => 'shakes',
        'Burgers' => 'burgers',
        'Wraps' => 'wraps',
        'Wrap & Roll' => 'wraps',
        'Pasta' => 'pasta',
        'Pastabilities' => 'pasta',
        'Philly Cheese Steak' => 'cheesesteak',
        'Cheesesteak' => 'cheesesteak',
        'Sandwiches' => 'sandwiches',
        'Panini' => 'panini',
        'Stone Oven Baked' => 'pizza',
        'Headlines' => 'platters',
        "Kids' Menu" => 'kids',
        'Kids Menu' => 'kids',
        'Sweet Endings' => 'desserts',
    ];

    if (isset($map[$title])) {
        return $map[$title];
    }

    return item_slug($title);
}
