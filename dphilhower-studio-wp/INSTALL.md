# Install D Philhower Studio on dphilhower.com

You have three zip files. Pick one path.

## A. HTML / CSS / JS only (`dphilhower-studio-html-css-js.zip`)

Use this if you want the studio site as plain files — no WordPress, no database.

1. Unzip `dphilhower-studio-html-css-js.zip`.
2. Open `START-HERE.html` or `index.html`.
3. To go live on dphilhower.com, upload the unzipped files into `public_html`.

All `.html`, `.css`, and `.js` files are listed in `files.html` and `FILE-LIST.txt`.

## B. Theme only (`dphilhower-studio-theme.zip`)

Use this if WordPress is already installed.

1. Log in to wp-admin.
2. Appearance → Themes → Add New → Upload Theme.
3. Upload `dphilhower-studio-theme.zip`.
4. Activate **D Philhower Studio**.
5. Appearance → Customize → Studio details — set email to the inbox you check (default `hello@dphilhower.com`).
6. Settings → Permalinks → Post name → Save.

The theme creates pages and sample work on first activation.

## C. All-in-one (`dphilhower-studio-wordpress-all-in-one.zip`)

Use this for a new site. It includes WordPress core plus the studio theme.

### 1. Unzip

You should see:

```
dphilhower-studio-wordpress/
  INSTALL.md
  README.md
  docker-compose.yml
  wordpress/          ← this is WordPress
  dphilhower-studio-theme.zip
```

### 2. Upload to hosting

Upload the **contents** of `wordpress/` (not the folder name itself, unless you want `/wordpress/` in the URL) into the web root for `dphilhower.com` — usually `public_html`.

### 3. Create a database

In cPanel or your host:

- Create a MySQL database
- Create a user and grant all privileges
- Note the database name, user, password, and host (`localhost` on most hosts)

### 4. Run the installer

Visit `https://dphilhower.com`. Complete the WordPress 5-minute install:

- Site title: **D Philhower Studio**
- Admin user: choose a strong password
- Email: your studio email

After install, the studio theme is the default. Visit the site, then Appearance → Themes and activate **D Philhower Studio** if pages are empty — activation seeds Home, Work, Services, About, and Contact.

### 5. Point the domain

At your domain registrar, set `dphilhower.com` (and `www` if you want it) to your host’s nameservers or A record.

## Docker (optional, for a local copy)

From the unzipped all-in-one folder:

```bash
docker compose up -d
```

Then open http://localhost:8080 and run the installer.

Database fields for the installer:

- Database name: `dphilhower`
- Username: `wordpress`
- Password: `wordpress`
- Database host: `db`

## GitHub Pages (static site)

The HTML site is copied to the `gh-pages` branch on every push. Enable it once in the GitHub repo:

1. Settings → Pages
2. Deploy from a branch
3. Branch `gh-pages`, folder `/` (root)
4. Save

The public URL is https://davedesignstudio.github.io/new/

## After install

1. Delete any default “Hello world” post if you do not want a blog.
2. Replace sample Work projects with real client work (Work → All Work).
3. Customize → Studio details for email, phone, location, and hero copy.
4. Customize → Site Identity for a logo if you have one.
5. Test the contact form (it uses `wp_mail`; on cheap hosting you may need an SMTP plugin such as WP Mail SMTP).
