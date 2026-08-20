<?php
/**
 * Order-first guest-check board for the WordPress theme.
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

function bville_hours(): string
{
    return 'Open daily — call for hours';
}

function bville_product_url(string $sku): string
{
    if (function_exists('wc_get_product_id_by_sku')) {
        $id = wc_get_product_id_by_sku($sku);
        if ($id) {
            return (string) get_permalink($id);
        }
    }

    return bville_shop_url();
}

/**
 * @return list<array{no:string,tag:string,name:string,desc:string,price:string,sku:string}>
 */
function bville_house_checks(): array
{
    return [
        [
            'no' => '01',
            'tag' => 'House pie',
            'name' => "B'Ville Special",
            'desc' => 'Shawarma chicken, garlic drizzle',
            'price' => '12" 14.95 · 16" 20.95',
            'sku' => 'BVL-PIZZA-BVILLE-SPECIAL',
        ],
        [
            'no' => '02',
            'tag' => 'Jersey grill',
            'name' => 'Jersey Cheesesteak',
            'desc' => 'Brown gravy potatoes & mozzarella',
            'price' => '10.95',
            'sku' => 'BVL-CHEESESTEAK-JERSEY',
        ],
        [
            'no' => '03',
            'tag' => 'Angus',
            'name' => 'Chetzel',
            'desc' => 'Bacon, cheddar & jack on pretzel bun',
            'price' => '12.95',
            'sku' => 'BVL-BURGERS-CHETZEL',
        ],
    ];
}

function bville_order_board_schema(): void
{
    $graph = [
        '@context' => 'https://schema.org',
        '@type' => 'PizzaRestaurant',
        'name' => get_bloginfo('name') ?: 'Bville Pizza & Grill',
        'image' => bville_asset('logo.png'),
        'telephone' => '+1' . bville_phone_raw(),
        'url' => home_url('/'),
        'servesCuisine' => ['Pizza', 'Italian', 'American', 'Mediterranean'],
        'address' => [
            '@type' => 'PostalAddress',
            'streetAddress' => '159 Morristown Rd',
            'addressLocality' => 'Bernardsville',
            'addressRegion' => 'NJ',
            'postalCode' => '07924',
            'addressCountry' => 'US',
        ],
        'hasMenu' => home_url('/menu/'),
        'acceptsReservations' => 'False',
        'potentialAction' => [
            '@type' => 'OrderAction',
            'target' => bville_shop_url(),
        ],
    ];

    echo '<script type="application/ld+json">' . wp_json_encode($graph) . "</script>\n";
}

function bville_order_board_ticket(): void
{
    $shop = bville_shop_url();
    ?>
    <div class="order-ticket" role="navigation" aria-label="<?php esc_attr_e('Hours, phone, and online order', 'bville'); ?>">
      <div class="site-header-inner order-ticket-inner">
        <a class="order-ticket-cell" href="<?php echo esc_url(home_url('/contact/')); ?>"><?php echo esc_html(bville_address()); ?></a>
        <a class="order-ticket-cell" href="tel:<?php echo esc_attr(bville_phone_raw()); ?>"><?php echo esc_html(bville_phone()); ?></a>
        <span class="order-ticket-cell"><?php echo esc_html(bville_hours()); ?></span>
        <span class="order-ticket-cell"><?php esc_html_e('Pickup first', 'bville'); ?></span>
        <span class="order-ticket-cell"><?php esc_html_e('Delivery', 'bville'); ?></span>
        <a class="order-ticket-cta" href="<?php echo esc_url($shop); ?>"><?php esc_html_e('Order pickup', 'bville'); ?></a>
      </div>
    </div>
    <?php
}

function bville_order_board_house_checks(): void
{
    ?>
    <section class="house-board" aria-label="<?php esc_attr_e('Order the house favorites', 'bville'); ?>">
      <div class="feature-wrap">
        <header class="house-board-head">
          <p class="hero-kicker">Guest checks · Family table</p>
          <h2>Order the house names</h2>
          <p class="hero-lede">Tap a check for pickup or delivery on this store — 16" for the table, no marketplace freeze.</p>
        </header>
        <div class="house-checks">
          <?php foreach (bville_house_checks() as $check) : ?>
            <a class="guest-check" href="<?php echo esc_url(bville_product_url($check['sku'])); ?>">
              <span class="guest-check-meta">
                <span class="guest-check-no">No. <?php echo esc_html($check['no']); ?></span>
                <span class="guest-check-tag"><?php echo esc_html($check['tag']); ?></span>
              </span>
              <h3><?php echo esc_html($check['name']); ?></h3>
              <p><?php echo esc_html($check['desc']); ?></p>
              <span class="guest-check-price"><?php echo esc_html($check['price']); ?></span>
              <span class="guest-check-cta"><?php esc_html_e('Add to order', 'bville'); ?></span>
            </a>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
    <?php
}

function bville_order_board_dock(): void
{
    if (function_exists('is_checkout') && (is_checkout() || is_cart())) {
        return;
    }
    ?>
    <div class="order-dock" aria-label="<?php esc_attr_e('Place an order', 'bville'); ?>">
      <a class="order-dock-call" href="tel:<?php echo esc_attr(bville_phone_raw()); ?>"><?php echo esc_html(bville_phone()); ?></a>
      <a class="btn btn-primary" href="<?php echo esc_url(bville_shop_url()); ?>"><?php esc_html_e('Order pickup', 'bville'); ?></a>
    </div>
    <?php
}

add_action('wp_head', 'bville_order_board_schema', 20);
