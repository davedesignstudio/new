# D Philhower Studio — dphilhower.com

WordPress theme and all-in-one WordPress package for **D Philhower Studio**, a graphic design studio in the Morristown, NJ area.

## Get the site

The installable files live in `dphilhower-studio-wp/releases/` after you run the build (they are also committed when built):

1. **`dphilhower-studio-html-css-js.zip`** — static site (HTML, CSS, JS). Unzip and open `index.html`, or upload to `public_html`.
2. **`dphilhower-studio-theme.zip`** — upload this in WordPress: Appearance → Themes → Add New → Upload Theme.
3. **`dphilhower-studio-wordpress-all-in-one.zip`** — WordPress + the theme in one folder. Unzip, upload `wordpress/` to `public_html` for dphilhower.com, create a database, run the installer.

Full steps: [`dphilhower-studio-wp/INSTALL.md`](dphilhower-studio-wp/INSTALL.md)

```bash
bash dphilhower-studio-wp/scripts/build-packages.sh
```

## Preview the design without WordPress

```bash
python3 -m http.server 3000 --directory dphilhower-studio-wp/preview
```

Then open http://localhost:3000

## Theme source

`dphilhower-studio-wp/theme/dphilhower-studio/`
