# Bville WordPress Bundle (GoDaddy-ready)

Upload-ready WordPress theme + WooCommerce plugin for **Bville Pizza & Grill** (159 Morristown Rd, Bernardsville, NJ).

This is the live-store package for the site in `bernardsville-deli/`: Parkside titles, printed menu wordmarks, text-only item rows, and paid checkout through WooCommerce.

## What’s inside

| Path | Purpose |
|---|---|
| `plugins/bville-menu/` | WooCommerce importer + `catalog.json` (~108 products) + dish photos |
| `themes/bville/` | Clean modern-line theme (home, menu wordmarks, shop, checkout chrome) |
| `exports/bville-products.csv` | Optional CSV product import |
| `exports/catalog.json` | Full product catalog copy |
| `releases/` | Upload zips built by `build.sh` |

## Upload these files (from `releases/`)

| File | Where in WordPress |
|---|---|
| `bville-menu.zip` | **Plugins → Add New → Upload Plugin** |
| `bville-theme.zip` | **Appearance → Themes → Add New → Upload** |
| `bville-wordpress.zip` | Optional archive of everything (docs + sources) |

Rebuild anytime: `./build.sh`

## Install on GoDaddy Managed WordPress

1. Log into GoDaddy → your WordPress site → **Admin**.
2. Install/activate **WooCommerce** (wizard creates Shop / Cart / Checkout).
3. **Plugins → Add New → Upload Plugin** → `bville-menu.zip` → Activate.
4. **WooCommerce → Bville Menu** → keep photo checkbox on → **Import / update products** (~108 items).
5. **Appearance → Themes → Add New → Upload** → `bville-theme.zip` → Activate.
6. Create pages **Menu** and **Contact** if they are missing; assign templates **Menu** / **Contact**.
7. **WooCommerce → Settings → Payments** → enable Stripe / Square / PayPal.
8. Set **NJ tax** 6.625% if you charge tax. Products import as virtual (pickup/delivery, no shipping weight).
9. Point DNS to GoDaddy and force SSL.

## After import

- **Menu** page = printed-board layout (wordmark section titles, no item thumbnails)
- **Shop** = WooCommerce catalog (photos hidden on the loop; they show on product pages)
- **Cart + Checkout** = card payments
- Checkout asks **Pickup at 159 Morristown Rd** or **Delivery** (address required for delivery)
- Header Instagram → [bvillepizzagrill](https://www.instagram.com/bvillepizzagrill/)

## Optional: keep the custom PHP order app talking to this store

On the PHP host `.env`:

```
WC_STORE_URL=https://your-godaddy-domain.com
WC_CONSUMER_KEY=ck_...
WC_CONSUMER_SECRET=cs_...
```

Then `/order/` Place order creates a WC order and redirects to order-pay.

## Support paths in this repo

- PHP site: `bernardsville-deli/public/`
- Setup page (PHP site): `/woocommerce.php`
- Status API: `/api/woocommerce-status.php`
