=== Bville Menu for WooCommerce ===
Requires at least: 6.0
Tested up to: 6.6
Requires PHP: 8.1
Stable tag: 1.0.0

Imports the Bville Pizza & Grill printed menu as WooCommerce products.

== Setup ==

1. Install and activate WooCommerce.
2. Copy this `bville-menu` folder into `wp-content/plugins/`.
3. Activate **Bville Menu for WooCommerce**.
4. WooCommerce → Bville Menu → Import / update products.
5. Optional: Products → Import and upload `public/woocommerce/bville-products.csv` instead.

Each dish uses SKU `BVL-{SECTION}-{SLUG}`. Pizzas are variable products (12" / 16"). Wings are 6 or 12 pieces.

The SolidJS order page at `/order/` posts to `/api/checkout.php`. Set `WC_STORE_URL`, `WC_CONSUMER_KEY`, and `WC_CONSUMER_SECRET` on the PHP host to also create the WooCommerce order.
