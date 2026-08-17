<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/src/includes/woocommerce-catalog.php';

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store');
header('Access-Control-Allow-Origin: *');

$catalog = wc_build_catalog();
echo json_encode($catalog, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
