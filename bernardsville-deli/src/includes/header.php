<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/includes/helpers.php';

$site = site_config();
$page = current_page();
$title = $pageTitle ?? $site['name'];

?><!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="<?= e($site['name']) ?> — breakfast, deli sandwiches, and groceries in Bernardsville, NJ." />
  <title><?= e($title) ?></title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="<?= e(asset_url('css/style.css')) ?>" />
  <link rel="icon" href="<?= e(asset_url('favicon.svg')) ?>" type="image/svg+xml" />
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="<?= e(asset_url('index.php')) ?>">
        <span class="brand-mark" aria-hidden="true">BD</span>
        <span class="brand-text">
          <strong>Bernardsville Deli</strong>
          <small>& Food Store</small>
        </span>
      </a>
      <nav class="site-nav" aria-label="Main">
        <a href="<?= e(asset_url('index.php')) ?>" class="<?= $page === 'home' ? 'active' : '' ?>">Home</a>
        <a href="<?= e(asset_url('menu.php')) ?>" class="<?= $page === 'menu' ? 'active' : '' ?>">Menu</a>
        <a href="<?= e(asset_url('index.php#visit')) ?>">Visit</a>
        <a class="nav-cta" href="tel:<?= e($site['phone_raw']) ?>">Call <?= e($site['phone']) ?></a>
      </nav>
    </div>
  </header>
  <main id="main">
