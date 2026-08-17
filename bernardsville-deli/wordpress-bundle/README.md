# Bville WordPress Bundle (GoDaddy-ready)

Upload-ready WordPress theme + WooCommerce plugin for **Bville Pizza & Grill**.

## What’s inside

| Path | Purpose |
|---|---|
| `plugins/bville-menu/` | WooCommerce importer + `catalog.json` + dish photos |
| `themes/bville/` | Clean modern-line theme (home, shop, checkout chrome) |
| `exports/bville-products.csv` | Optional CSV product import |
| `exports/catalog.json` | Full product catalog copy |
| `bville-wordpress.zip` | Single archive for GoDaddy upload (built by `build.sh`) |

## Upload these files (from `releases/`)

| File | Where in WordPress |
|---|---|
| `bville-menu.zip` (13MB) | **Plugins → Add New → Upload Plugin** |
| `bville-theme.zip` (1.8MB) | **Appearance → Themes → Add New → Upload** |
| `bville-wordpress.zip` | Optional archive of everything (docs + sources) |

Rebuild anytime: `./build.sh`

## Install on GoDaddy Managed WordPress

1. Log into GoDaddy → your WordPress site → **Admin**.
2. Install/activate **WooCommerce** (built-in wizard creates Shop / Cart / Checkout).
3. **Plugins → Add New → Upload Plugin** → `bville-menu.zip` → Activate.
4. **WooCommerce → Bville Menu** → keep photo checkbox on → **Import / update products** (~108 items).
5. **Appearance → Themes → Add New → Upload** → `bville-theme.zip` → Activate.
6. Create pages **Menu** and **Contact**; assign templates **Menu** / **Contact** under Page Attributes.
7. **Settings → Reading** → static homepage (or keep front-page.php as home).
8. **WooCommerce → Settings → Payments** → enable Stripe / Square / PayPal.
9. Point DNS to GoDaddy and force SSL.

## After import

- Shop page = online menu (clean line product grid)
- Cart + Checkout = WooCommerce transactions
- Pickup/delivery select appears on checkout notes

## Optional: keep the custom PHP order app talking to this store

On the PHP host `.env`:

```
WC_STORE_URL=https://your-godaddy-domain.com
WC_CONSUMER_KEY=ck_...
WC_CONSUMER_SECRET=cs_...
```

Then `/order/` Place order creates a WC order and redirects to order-pay.

## Support paths in this repo

- Setup page (PHP site): `/woocommerce.php`
- Status API: `/api/woocommerce-status.php`
