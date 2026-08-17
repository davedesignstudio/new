<?php

declare(strict_types=1);

require_once __DIR__ . '/woocommerce-catalog.php';

function wc_orders_dir(): string
{
    $dir = dirname(__DIR__, 2) . '/data/orders';
    if (!is_dir($dir)) {
        mkdir($dir, 0775, true);
    }

    return $dir;
}

function wc_next_order_number(): string
{
    $stamp = gmdate('Ymd');
    $seqFile = wc_orders_dir() . '/.seq-' . $stamp;
    $seq = 1;
    if (is_file($seqFile)) {
        $seq = ((int) file_get_contents($seqFile)) + 1;
    }
    file_put_contents($seqFile, (string) $seq, LOCK_EX);

    return sprintf('BVL-%s-%03d', $stamp, $seq);
}

function wc_normalize_phone(string $phone): string
{
    return preg_replace('/\D+/', '', $phone) ?? '';
}

function wc_validate_checkout(array $payload, array $catalog): array
{
    $errors = [];
    $customer = $payload['customer'] ?? [];
    $name = trim((string) ($customer['name'] ?? ''));
    $phone = wc_normalize_phone((string) ($customer['phone'] ?? ''));
    $email = trim((string) ($customer['email'] ?? ''));
    $fulfillment = (string) ($payload['fulfillment'] ?? $payload['orderType'] ?? 'pickup');
    if ($fulfillment === 'carryout') {
        $fulfillment = 'pickup';
    }
    if (!in_array($fulfillment, ['pickup', 'delivery'], true)) {
        $fulfillment = 'pickup';
    }

    $address = trim((string) ($payload['address'] ?? $customer['address'] ?? ''));
    $notes = trim((string) ($payload['notes'] ?? ''));

    if ($name === '') {
        $errors[] = 'Name is required.';
    }
    if (strlen($phone) < 10) {
        $errors[] = 'A valid phone number is required.';
    }
    if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Email looks invalid.';
    }
    if ($fulfillment === 'delivery' && $address === '') {
        $errors[] = 'Delivery address is required.';
    }

    $items = $payload['items'] ?? [];
    if (!is_array($items) || $items === []) {
        $errors[] = 'Add at least one menu item.';
    }

    $lines = [];
    $subtotal = 0.0;
    foreach (is_array($items) ? $items : [] as $raw) {
        if (!is_array($raw)) {
            continue;
        }
        $id = (string) ($raw['id'] ?? $raw['sku'] ?? $raw['itemId'] ?? '');
        $product = $id !== '' ? wc_find_product($catalog, $id) : null;
        $qty = max(1, (int) ($raw['quantity'] ?? 1));

        if (!$product) {
            $customName = trim((string) ($raw['name'] ?? ''));
            $customPrice = (float) ($raw['price'] ?? $raw['unit_price'] ?? 0);
            if ($customName === '' || $customPrice <= 0) {
                $errors[] = 'Unknown item: ' . ($id !== '' ? $id : 'custom');
                continue;
            }
            $lineTotal = round($customPrice * $qty, 2);
            $subtotal += $lineTotal;
            $lines[] = [
                'id' => $id !== '' ? $id : 'custom',
                'sku' => 'BVL-CUSTOM',
                'parent_sku' => 'BVL-CUSTOM',
                'name' => $customName,
                'quantity' => $qty,
                'unit_price' => wc_money($customPrice),
                'total' => wc_money($lineTotal),
                'meta' => [
                    ['key' => 'source', 'value' => 'custom'],
                ],
            ];
            continue;
        }

        $unit = wc_line_unit_price($product, $raw);
        $lineTotal = round($unit * $qty, 2);
        $subtotal += $lineTotal;
        $variation = wc_find_variation($product, $raw);
        $lines[] = [
            'id' => $product['id'],
            'sku' => $variation['sku'] ?? $product['sku'],
            'parent_sku' => $product['sku'],
            'name' => $product['name'],
            'quantity' => $qty,
            'unit_price' => wc_money($unit),
            'total' => wc_money($lineTotal),
            'meta' => wc_line_meta($product, $raw),
        ];
    }

    $taxRate = (float) $catalog['store']['tax_rate'];
    $tax = round($subtotal * $taxRate, 2);
    $total = round($subtotal + $tax, 2);

    $payMethod = (string) ($payload['payment_method'] ?? 'auto');
    $wcConnected = wc_store_config()['enabled'];
    if ($payMethod === 'auto') {
        $payMethod = $wcConnected ? 'woocommerce' : 'cod';
    }
    if ($payMethod === 'woocommerce' && !$wcConnected) {
        $payMethod = 'cod';
    }

    return [
        'ok' => $errors === [],
        'errors' => $errors,
        'order' => [
            'customer' => [
                'name' => $name,
                'phone' => $phone,
                'email' => $email,
                'address' => $address,
            ],
            'fulfillment' => $fulfillment,
            'notes' => $notes,
            'items' => $lines,
            'totals' => [
                'subtotal' => wc_money($subtotal),
                'tax' => wc_money($tax),
                'tax_rate' => $taxRate,
                'total' => wc_money($total),
                'currency' => $catalog['store']['currency'],
            ],
            'payment' => [
                'method' => $payMethod === 'woocommerce' ? 'woocommerce' : 'cod',
                'title' => $payMethod === 'woocommerce'
                    ? 'Pay online with WooCommerce'
                    : ($fulfillment === 'delivery' ? 'Pay on delivery' : 'Pay at pickup'),
            ],
        ],
    ];
}

function wc_save_order(array $order): array
{
    $order['id'] = wc_next_order_number();
    $order['status'] = 'processing';
    $order['created_at'] = gmdate('c');
    $order['source'] = 'bville-order-app';
    $path = wc_orders_dir() . '/' . $order['id'] . '.json';
    file_put_contents(
        $path,
        json_encode($order, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) ?: '{}',
        LOCK_EX
    );
    $order['_path'] = $path;

    return $order;
}

function wc_rest_create_order(array $order): array
{
    $cfg = wc_store_config();
    if (!$cfg['enabled']) {
        return ['ok' => false, 'skipped' => true, 'reason' => 'WooCommerce keys are not configured.'];
    }

    $lineItems = [];
    foreach ($order['items'] as $line) {
        $lineItems[] = [
            'name' => $line['name'],
            'quantity' => $line['quantity'],
            'subtotal' => $line['total'],
            'total' => $line['total'],
            'sku' => $line['sku'] ?? '',
            'meta_data' => $line['meta'] ?? [],
        ];
    }

    $wantsOnlinePay = (($order['payment']['method'] ?? 'cod') !== 'cod');

    $body = [
        'payment_method' => $wantsOnlinePay ? '' : 'cod',
        'payment_method_title' => $wantsOnlinePay
            ? 'Pay online'
            : ($order['payment']['title'] ?? 'Pay at pickup'),
        'set_paid' => false,
        'status' => $wantsOnlinePay ? 'pending' : 'processing',
        'billing' => [
            'first_name' => $order['customer']['name'],
            'phone' => $order['customer']['phone'],
            'email' => $order['customer']['email'] ?: 'orders@bvillepizzagrill.com',
            'address_1' => $order['customer']['address'],
        ],
        'shipping' => [
            'first_name' => $order['customer']['name'],
            'address_1' => $order['customer']['address'],
        ],
        'line_items' => $lineItems,
        'customer_note' => $order['notes'],
        'meta_data' => [
            ['key' => 'bville_order_id', 'value' => $order['id']],
            ['key' => 'fulfillment', 'value' => $order['fulfillment']],
        ],
    ];

    $endpoint = $cfg['url'] . '/wp-json/wc/v3/orders';
    $ch = curl_init($endpoint);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_USERPWD => $cfg['consumer_key'] . ':' . $cfg['consumer_secret'],
        CURLOPT_POSTFIELDS => json_encode($body, JSON_UNESCAPED_SLASHES),
        CURLOPT_TIMEOUT => 20,
    ]);
    $raw = curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err = curl_error($ch);
    curl_close($ch);

    if ($raw === false) {
        return ['ok' => false, 'skipped' => false, 'reason' => $err ?: 'WooCommerce request failed.'];
    }

    $json = json_decode((string) $raw, true);
    if ($code >= 200 && $code < 300 && is_array($json)) {
        $wooId = $json['id'] ?? null;
        $orderKey = (string) ($json['order_key'] ?? '');
        $paymentUrl = null;
        if ($wooId && $orderKey !== '') {
            $paymentUrl = $cfg['url'] . '/checkout/order-pay/' . rawurlencode((string) $wooId)
                . '/?pay_for_order=true&key=' . rawurlencode($orderKey);
        }

        return [
            'ok' => true,
            'skipped' => false,
            'woocommerce_id' => $wooId,
            'woocommerce_number' => $json['number'] ?? null,
            'order_key' => $orderKey !== '' ? $orderKey : null,
            'payment_url' => $paymentUrl,
            'status' => $json['status'] ?? null,
        ];
    }

    $message = is_array($json) ? (string) ($json['message'] ?? $raw) : (string) $raw;

    return ['ok' => false, 'skipped' => false, 'reason' => $message, 'status' => $code];
}
