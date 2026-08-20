<?php

declare(strict_types=1);

/**
 * Order-first “guest check” board used on the PHP site.
 * Markup lives in partials/ so header, home, and footer stay short.
 */

function order_item_url(string $itemId): string
{
    return asset_url('order/?item=' . rawurlencode($itemId));
}

function order_board_origin(): string
{
    $forwarded = (string) ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '');
    $https = $forwarded === 'https'
        || (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');
    $host = (string) ($_SERVER['HTTP_HOST'] ?? 'bvillepizzagrill.com');

    return ($https ? 'https' : 'http') . '://' . $host;
}

function order_board_schema(): void
{
    $site = site_config();
    $geo = $site['geo'];
    $origin = order_board_origin();
    $graph = [
        '@context' => 'https://schema.org',
        '@type' => 'PizzaRestaurant',
        'name' => $site['name'],
        'image' => $origin . asset_url('assets/logo.png'),
        'telephone' => '+1' . $site['phone_raw'],
        'email' => $site['email'],
        'url' => $origin . asset_url('index.php'),
        'servesCuisine' => ['Pizza', 'Italian', 'American', 'Mediterranean'],
        'address' => [
            '@type' => 'PostalAddress',
            'streetAddress' => $geo['street'],
            'addressLocality' => $geo['locality'],
            'addressRegion' => $geo['region'],
            'postalCode' => $geo['postal'],
            'addressCountry' => $geo['country'],
        ],
        'hasMenu' => $origin . asset_url('menu.php'),
        'acceptsReservations' => 'False',
        'potentialAction' => [
            '@type' => 'OrderAction',
            'target' => $origin . asset_url($site['order']['path']),
        ],
    ];

    echo '<script type="application/ld+json">' . json_encode($graph, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . "</script>\n";
}

function order_board_ticket(): void
{
    require __DIR__ . '/partials/order-ticket.php';
}

function order_board_house_checks(): void
{
    require __DIR__ . '/partials/house-checks.php';
}

function order_board_dock(): void
{
    require __DIR__ . '/partials/order-dock.php';
}
