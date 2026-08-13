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
