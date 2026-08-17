<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/src/includes/order-store.php';

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'errors' => ['POST a cart to place an order.']]);
    exit;
}

$raw = file_get_contents('php://input') ?: '';
$payload = json_decode($raw, true);
if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'errors' => ['Send JSON with customer and items.']]);
    exit;
}

$catalog = wc_build_catalog();
$checked = wc_validate_checkout($payload, $catalog);
if (!$checked['ok']) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'errors' => $checked['errors']]);
    exit;
}

$order = wc_save_order($checked['order']);
$woo = wc_rest_create_order($order);
if (!empty($woo['ok'])) {
    $order['woocommerce_id'] = $woo['woocommerce_id'];
    $order['woocommerce_number'] = $woo['woocommerce_number'];
    file_put_contents(
        $order['_path'],
        json_encode($order, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) ?: '{}',
        LOCK_EX
    );
}

unset($order['_path']);

echo json_encode([
    'ok' => true,
    'order_id' => $order['id'],
    'order' => $order,
    'woocommerce' => $woo,
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
