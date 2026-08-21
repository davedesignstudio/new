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

## Preview

Open `dphilhower-studio-wp/preview/index.html` in a browser, or:

```bash
npm start
```

Then open http://localhost:3000

Netlify publish is the static studio site in `dphilhower-studio-wp/preview` (copied to `dist/`).

To preview without installing anything, unzip `dphilhower-studio-wp/releases/dphilhower-studio-html-css-js.zip` and open `dphilhower-studio-html/index.html`.

## Theme source

`dphilhower-studio-wp/theme/dphilhower-studio/`
