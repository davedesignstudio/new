<?php

declare(strict_types=1);

/**
 * WooCommerce connection (optional). When URL + keys are set, checkout
 * also creates a WooCommerce order via the REST API.
 */
function wc_store_config(): array
{
    $url = trim((string) (getenv('WC_STORE_URL') ?: ''));
    $key = trim((string) (getenv('WC_CONSUMER_KEY') ?: ''));
    $secret = trim((string) (getenv('WC_CONSUMER_SECRET') ?: ''));

    return [
        'url' => rtrim($url, '/'),
        'consumer_key' => $key,
        'consumer_secret' => $secret,
        'enabled' => $url !== '' && $key !== '' && $secret !== '',
        'tax_rate' => 0.06625,
        'currency' => 'USD',
        'currency_symbol' => '$',
    ];
}

function wc_public_base_url(): string
{
    $env = trim((string) (getenv('BVILLE_PUBLIC_URL') ?: ''));
    if ($env !== '') {
        return rtrim($env, '/');
    }

    $https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || ((string) ($_SERVER['SERVER_PORT'] ?? '') === '443');
    $host = (string) ($_SERVER['HTTP_HOST'] ?? '127.0.0.1:8080');

    return ($https ? 'https://' : 'http://') . $host;
}
