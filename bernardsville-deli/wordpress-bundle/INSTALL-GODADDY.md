# GoDaddy cutover checklist

1. [ ] GoDaddy Managed WordPress site created + SSL
2. [ ] WooCommerce installed and pages created (Shop, Cart, Checkout, My Account)
3. [ ] Upload & activate `bville-menu` plugin
4. [ ] WooCommerce → Bville Menu → Import (with photos)
5. [ ] Upload & activate `bville` theme
6. [ ] Payments gateway enabled (Stripe/Square/PayPal)
7. [ ] NJ tax rate 6.625% (WooCommerce → Settings → Tax)
8. [ ] Shipping / local pickup configured (or virtual products only for pickup)
9. [ ] Test order with a real/test card
10. [ ] DNS A/CNAME to GoDaddy, www redirect, SSL force
11. [ ] (Optional) Point old PHP site `WC_*` keys at the new store for hybrid checkout
