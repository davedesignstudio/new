<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/src/includes/woocommerce-catalog.php';

$root = dirname(__DIR__);
$outDir = $root . '/public/woocommerce';
$pluginDir = $root . '/woocommerce/bville-menu';

if (!is_dir($outDir)) {
    mkdir($outDir, 0775, true);
}
if (!is_dir($pluginDir)) {
    mkdir($pluginDir, 0775, true);
}

$catalog = wc_build_catalog();
$json = json_encode($catalog, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?: '{}';
$csv = wc_catalog_csv($catalog);

file_put_contents($outDir . '/catalog.json', $json);
file_put_contents($outDir . '/bville-products.csv', $csv);
file_put_contents($pluginDir . '/catalog.json', $json);

$count = count($catalog['products']);
$variations = 0;
foreach ($catalog['products'] as $product) {
    $variations += count($product['variations']);
}

fwrite(STDOUT, "Exported {$count} products ({$variations} variations)\n");
fwrite(STDOUT, "  {$outDir}/catalog.json\n");
fwrite(STDOUT, "  {$outDir}/bville-products.csv\n");
fwrite(STDOUT, "  {$pluginDir}/catalog.json\n");
