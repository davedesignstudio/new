<?php

declare(strict_types=1);

/**
 * WooCommerce connection (optional). When URL + keys are set, checkout
 * creates a WooCommerce order and returns a payment URL for card transactions.
 */
function wc_load_dotenv(): void
{
    static $loaded = false;
    if ($loaded) {
        return;
    }
    $loaded = true;
    $path = dirname(__DIR__, 2) . '/.env';
    if (!is_file($path)) {
        return;
    }
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [];
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#')) {
            continue;
        }
        if (!str_contains($line, '=')) {
            continue;
        }
        [$key, $value] = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value, " \t\"'");
        if ($key !== '' && getenv($key) === false) {
            putenv($key . '=' . $value);
            $_ENV[$key] = $value;
        }
    }
}

function wc_store_config(): array
{
    wc_load_dotenv();
    $url = trim((string) (getenv('WC_STORE_URL') ?: ($_ENV['WC_STORE_URL'] ?? '')));
    $key = trim((string) (getenv('WC_CONSUMER_KEY') ?: ($_ENV['WC_CONSUMER_KEY'] ?? '')));
    $secret = trim((string) (getenv('WC_CONSUMER_SECRET') ?: ($_ENV['WC_CONSUMER_SECRET'] ?? '')));

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
