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
  <meta name="description" content="<?= e($site['name']) ?> — pizza, burgers, wraps, and Mediterranean cuisine in Bernardsville, NJ." />
  <title><?= e($title) ?></title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,500;0,700;0,800;1,500;1,700&family=Oleo+Script+Swash+Caps:wght@700&family=Oswald:wght@500;600;700&family=DM+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="<?= e(asset_url('css/style.css')) ?>" />
  <link rel="icon" href="<?= e(asset_url('favicon.png')) ?>" type="image/png" />
</head>
<body class="bville-brand">
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="food-parallax" aria-hidden="true">
    <div class="food-parallax-sauce">
      <div class="sauce-sheet sauce-sheet--a"></div>
      <div class="sauce-sheet sauce-sheet--b"></div>
      <div class="sauce-drip sauce-drip--left"></div>
      <div class="sauce-drip sauce-drip--right"></div>
    </div>
    <div class="food-parallax-cheese food-parallax-cheese--left" data-side="left"></div>
    <div class="food-parallax-cheese food-parallax-cheese--right" data-side="right"></div>
  </div>
  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="<?= e(asset_url('index.php')) ?>" aria-label="<?= e($site['name']) ?>">
        <img class="brand-logo" src="<?= e(asset_url('assets/logo.png')) ?>" alt="<?= e($site['name']) ?>" width="64" height="64" />
        <span class="brand-text">
          <strong>Bville</strong>
          <em>Pizza &amp; Grill</em>
        </span>
      </a>
      <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
      <nav id="site-nav" class="site-nav" aria-label="Main">
        <a href="<?= e(asset_url('index.php')) ?>" class="<?= $page === 'home' ? 'active' : '' ?>">Home</a>
        <a href="<?= e(asset_url('order/')) ?>" class="<?= $page === 'order' ? 'active' : '' ?>">Order Online</a>
        <a href="<?= e(asset_url('menu.php')) ?>" class="<?= $page === 'menu' ? 'active' : '' ?>">Menu</a>
        <a href="<?= e(asset_url('cafe.php')) ?>" class="<?= $page === 'cafe' ? 'active' : '' ?>">Cafe Robust</a>
        <a href="<?= e(asset_url('about.php')) ?>" class="<?= $page === 'about' ? 'active' : '' ?>">About Us</a>
        <a href="<?= e(asset_url('catering.php')) ?>" class="<?= $page === 'catering' ? 'active' : '' ?>">Catering</a>
        <a href="<?= e(asset_url('contact.php')) ?>" class="<?= $page === 'contact' ? 'active' : '' ?>">Contact</a>
      </nav>
      <div class="header-tools">
        <div class="lang-toggle" role="group" aria-label="Story language">
          <button type="button" class="lang-btn active" data-lang="en">EN</button>
          <button type="button" class="lang-btn" data-lang="blend">EN·RU</button>
        </div>
        <div class="header-social" aria-label="Social media">
          <a href="<?= e($site['social']['instagram']) ?>" aria-label="Instagram">IG</a>
          <a href="<?= e($site['social']['facebook']) ?>" aria-label="Facebook">FB</a>
        </div>
      </div>
    </div>
  </header>
  <main id="main">
