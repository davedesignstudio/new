<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/src/includes/woocommerce-config.php';
require_once dirname(__DIR__, 2) . '/src/includes/woocommerce-catalog.php';

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store');
header('Access-Control-Allow-Origin: *');

$cfg = wc_store_config();
$catalog = wc_build_catalog();

echo json_encode([
    'ok' => true,
    'connected' => $cfg['enabled'],
    'store_url' => $cfg['enabled'] ? $cfg['url'] : null,
    'currency' => $cfg['currency'],
    'tax_rate' => $cfg['tax_rate'],
    'product_count' => count($catalog['products']),
    'checkout' => [
        'endpoint' => '/api/checkout.php',
        'pay_online_when_connected' => true,
        'fallback' => 'Pay at pickup / delivery when WooCommerce is not connected',
    ],
    'setup' => [
        'env' => ['WC_STORE_URL', 'WC_CONSUMER_KEY', 'WC_CONSUMER_SECRET'],
        'plugin' => '/woocommerce/bville-menu',
        'page' => '/woocommerce.php',
    ],
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
