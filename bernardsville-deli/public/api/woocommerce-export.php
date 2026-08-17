<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/src/includes/woocommerce-catalog.php';

$catalog = wc_build_catalog();
$format = strtolower((string) ($_GET['format'] ?? 'csv'));

if ($format === 'json') {
    header('Content-Type: application/json; charset=UTF-8');
    header('Content-Disposition: attachment; filename="bville-woocommerce-catalog.json"');
    echo json_encode($catalog, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

header('Content-Type: text/csv; charset=UTF-8');
header('Content-Disposition: attachment; filename="bville-woocommerce-products.csv"');
echo wc_catalog_csv($catalog);
