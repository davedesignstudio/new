# Bernardsville Deli & Food Store — Website

Website for **Bernardsville Deli & Food Store**, 75 Morristown Rd, Bernardsville, NJ.

Built with PHP and designed to showcase the **front menu graphic** from your Illustrator/InDesign files.

## Quick start

```bash
cd bernardsville-deli
php -S localhost:8080 -t public
```

Open http://localhost:8080

## Composer (optional)

```bash
chmod +x composer-installer.sh
./composer-installer.sh
php composer.phar install
```

Includes standard `composer-setup.php` and `composer-installer.sh` for PHP dependency management.

## Menu graphic assets

1. Copy your files into `assets/source/`:
   - `graphic for front menu deli bernardsville.ai`
   - `~bernardsville deli~07z_p2.idlk`

2. Export the menu board to `public/assets/menu/front-menu.png`

3. Refresh the site — the live graphic replaces the SVG placeholder.

## Structure

```
bernardsville-deli/
├── public/           # Web root (index.php, menu.php, CSS, JS)
├── assets/source/    # Original AI / IDLK design files
├── src/includes/     # PHP config, menu data, helpers
├── composer.json
├── composer-setup.php
└── composer-installer.sh
```

## Pages

- **Home** — hero, front menu graphic, visit info, map
- **Menu** — full front menu graphic + categorized menu list
