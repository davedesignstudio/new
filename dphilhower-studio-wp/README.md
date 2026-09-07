# D Philhower Studio — WordPress site for dphilhower.com

Graphic design studio site: **D Philhower Studio**, Morristown / Morris County, NJ.

This folder is the product. It ships three installable zip files plus the theme source.

## Download these files

After the package build (or from `releases/` in this repo):

| File | Use |
| --- | --- |
| `releases/dphilhower-studio-html-css-js.zip` | Static site: all HTML, CSS, and JS. Unzip and open `index.html`, or upload the folder to `public_html` |
| `releases/dphilhower-studio-theme.zip` | Upload in an existing WordPress under **Appearance → Themes → Add New → Upload Theme** |
| `releases/dphilhower-studio-wordpress-all-in-one.zip` | Full WordPress + this theme. Unzip and upload to hosting, or run with Docker |

Rebuild the zips:

```bash
bash dphilhower-studio-wp/scripts/build-packages.sh
```

## What the site includes

- Home with studio hero, selected work, process, and Morris County locale
- Work portfolio (custom post type) and case studies
- Services, About, Contact
- Project inquiry form (emails `hello@dphilhower.com` by default)
- Demo pages and projects load when you activate the theme

Edit studio email, phone, location, and hero copy under **Appearance → Customize → Studio details**.

## Install the theme zip (you already have WordPress)

1. In wp-admin go to **Appearance → Themes → Add New → Upload Theme**.
2. Choose `dphilhower-studio-theme.zip` and activate **D Philhower Studio**.
3. The theme creates Home, Services, About, Contact, the Work archive, and sample projects.

## Install the all-in-one zip (new WordPress)

### On hosting (cPanel, FTP, or SFTP)

1. Unzip `dphilhower-studio-wordpress-all-in-one.zip`.
2. Upload everything inside the `wordpress/` folder into `public_html` (or the folder for `dphilhower.com`).
3. Create a MySQL database and user in your host’s panel.
4. Visit `https://dphilhower.com` and complete the WordPress installer.
5. The D Philhower Studio theme activates and fills in demo content.

Point the domain **dphilhower.com** at this hosting account (A record or nameservers from your host).

### On your computer with Docker

```bash
unzip dphilhower-studio-wordpress-all-in-one.zip
cd dphilhower-studio-wordpress
docker compose up -d
```

Open [http://localhost:8080](http://localhost:8080), run the installer, then activate the theme if it is not already active.

Default Docker database (already wired in `docker-compose.yml`):

- Database: `dphilhower`
- User: `wordpress`
- Password: `wordpress`

## Local HTML preview (no WordPress)

```bash
python3 -m http.server 3000 --directory dphilhower-studio-wp/preview
```

Open [http://localhost:3000](http://localhost:3000). This matches the theme layouts so you can review the design without PHP.

## Theme source

`dphilhower-studio-wp/theme/dphilhower-studio/`

WordPress requires PHP 7.4+ and WordPress 6.4+.
