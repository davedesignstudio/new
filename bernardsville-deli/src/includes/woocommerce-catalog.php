<?php

declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/woocommerce-config.php';

function wc_sku(string ...$parts): string
{
    $chunks = [];
    foreach ($parts as $part) {
        $clean = strtoupper((string) preg_replace('/[^A-Za-z0-9]+/', '-', $part));
        $clean = trim($clean, '-');
        if ($clean !== '') {
            $chunks[] = $clean;
        }
    }

    return 'BVL-' . implode('-', $chunks);
}

function wc_money(float|string $value): string
{
    return number_format((float) $value, 2, '.', '');
}

function wc_catalog_categories(): array
{
    return [
        ['id' => 'pizza', 'name' => 'Stone Oven Baked', 'slug' => 'stone-oven-baked'],
        ['id' => 'garden', 'name' => 'From The Garden', 'slug' => 'from-the-garden'],
        ['id' => 'starters', 'name' => 'Starters', 'slug' => 'starters'],
        ['id' => 'shakes', 'name' => 'Shakes', 'slug' => 'shakes'],
        ['id' => 'burgers', 'name' => 'Burgers', 'slug' => 'burgers'],
        ['id' => 'wraps', 'name' => 'Wrap & Roll', 'slug' => 'wrap-and-roll'],
        ['id' => 'pasta', 'name' => 'Pastabilities', 'slug' => 'pastabilities'],
        ['id' => 'cheesesteak', 'name' => 'Cheesesteak', 'slug' => 'cheesesteak'],
        ['id' => 'sandwiches', 'name' => 'Sandwiches', 'slug' => 'sandwiches'],
        ['id' => 'panini', 'name' => 'Panini', 'slug' => 'panini'],
        ['id' => 'platters', 'name' => 'Headlines', 'slug' => 'headlines'],
        ['id' => 'kids', 'name' => 'Kids Menu', 'slug' => 'kids-menu'],
        ['id' => 'desserts', 'name' => 'Sweet Endings', 'slug' => 'sweet-endings'],
        ['id' => 'drinks', 'name' => 'Cafe Robust', 'slug' => 'cafe-robust'],
    ];
}

function wc_pizza_defaults(): array
{
    return [
        'pizza-classic' => [],
        'pizza-margherita' => ['basil'],
        'pizza-meat-lovers' => ['pepperoni', 'sausage', 'bacon', 'meatball'],
        'pizza-white-pie' => ['ricotta'],
        'pizza-chicken-parm' => ['chicken', 'basil'],
        'pizza-bbq-buffalo' => ['chicken'],
        'pizza-veggie' => ['peppers', 'onions', 'mushrooms', 'olives'],
        'pizza-philly' => ['onions', 'peppers', 'mushrooms'],
        'pizza-bville-special' => ['shawarma', 'onions', 'tomato'],
        'pizza-thai-chili' => ['chicken'],
        'pizza-don-pomodoro' => ['tomato', 'basil'],
        'pizza-combination' => ['pepperoni', 'sausage', 'mushrooms', 'onions', 'peppers'],
    ];
}

function wc_pizza_topping_options(): array
{
    return [
        ['id' => 'pepperoni', 'label' => 'Pepperoni', 'price' => 1.5],
        ['id' => 'sausage', 'label' => 'Sausage', 'price' => 1.5],
        ['id' => 'bacon', 'label' => 'Bacon', 'price' => 1.5],
        ['id' => 'meatball', 'label' => 'Meatballs', 'price' => 1.5],
        ['id' => 'chicken', 'label' => 'Chicken', 'price' => 2],
        ['id' => 'shawarma', 'label' => 'Shawarma chicken', 'price' => 2],
        ['id' => 'mushrooms', 'label' => 'Mushrooms', 'price' => 1],
        ['id' => 'onions', 'label' => 'Onions', 'price' => 1],
        ['id' => 'peppers', 'label' => 'Peppers', 'price' => 1],
        ['id' => 'olives', 'label' => 'Olives', 'price' => 1],
        ['id' => 'spinach', 'label' => 'Spinach', 'price' => 1],
        ['id' => 'tomato', 'label' => 'Fresh tomato', 'price' => 1],
        ['id' => 'basil', 'label' => 'Fresh basil', 'price' => 0.5],
        ['id' => 'ricotta', 'label' => 'Ricotta', 'price' => 1.5],
    ];
}

function wc_select_addon(string $id, string $name, array $options, bool $required = true): array
{
    return [
        'id' => $id,
        'name' => $name,
        'type' => 'select',
        'required' => $required,
        'options' => $options,
    ];
}

function wc_checkbox_addon(string $id, string $name, array $options): array
{
    return [
        'id' => $id,
        'name' => $name,
        'type' => 'checkbox',
        'required' => false,
        'options' => $options,
    ];
}

function wc_product_addons(string $sectionId, array $item): array
{
    $addons = [];
    $photo = (string) ($item['photo'] ?? '');

    if ($sectionId === 'pizza') {
        $addons[] = wc_select_addon('crust', 'Crust', [
            ['id' => 'stone', 'label' => 'Stone oven classic', 'price' => 0],
            ['id' => 'thin', 'label' => 'Thin & crispy', 'price' => 0],
            ['id' => 'thick', 'label' => 'Thick crust', 'price' => 1.5],
            ['id' => 'gf', 'label' => 'Gluten free', 'price' => 3],
        ]);
        $addons[] = wc_select_addon('sauce', 'Sauce', [
            ['id' => 'pizza', 'label' => 'House pizza sauce', 'price' => 0],
            ['id' => 'fra', 'label' => 'Fra Diavolo (spicy)', 'price' => 1],
            ['id' => 'vodka', 'label' => 'B-ville pink vodka', 'price' => 2],
            ['id' => 'white', 'label' => 'White / garlic', 'price' => 0],
            ['id' => 'bbq', 'label' => 'BBQ', 'price' => 0],
        ]);
        $addons[] = wc_select_addon('cheese', 'Cheese', [
            ['id' => 'normale', 'label' => 'Regular', 'price' => 0],
            ['id' => 'leggera', 'label' => 'Light', 'price' => 0],
            ['id' => 'abbondante', 'label' => 'Extra cheese', 'price' => 2],
            ['id' => 'senza', 'label' => 'No cheese', 'price' => 0],
        ]);
        $addons[] = wc_checkbox_addon('toppings', 'Extra toppings', wc_pizza_topping_options());
    }

    if ($sectionId === 'garden') {
        $addons[] = wc_select_addon('protein', 'Add on', [
            ['id' => 'none', 'label' => 'No add-on', 'price' => 0],
            ['id' => 'chicken', 'label' => 'Chicken', 'price' => 4],
            ['id' => 'buffalo-chicken', 'label' => 'Buffalo chicken', 'price' => 4],
            ['id' => 'tuna', 'label' => 'Tuna salad', 'price' => 4],
            ['id' => 'cajun-chicken', 'label' => 'Cajun chicken (spicy)', 'price' => 5],
            ['id' => 'gyro', 'label' => 'Gyro (lamb)', 'price' => 5],
            ['id' => 'shawarma', 'label' => 'Shawarma', 'price' => 6],
            ['id' => 'shrimp', 'label' => 'Shrimp', 'price' => 6],
            ['id' => 'salmon', 'label' => 'Grilled salmon', 'price' => 7],
            ['id' => 'chicken-kabab', 'label' => 'Chicken kabab', 'price' => 7],
            ['id' => 'steak', 'label' => 'Steak', 'price' => 8],
            ['id' => 'cajun-salmon', 'label' => 'Cajun salmon (spicy)', 'price' => 8],
        ], false);
    }

    if ($sectionId === 'wraps') {
        $addons[] = wc_select_addon('bread', 'Wrap', [
            ['id' => 'white', 'label' => 'White', 'price' => 0],
            ['id' => 'wheat', 'label' => 'Wheat', 'price' => 0],
            ['id' => 'spinach', 'label' => 'Spinach', 'price' => 0],
            ['id' => 'pita', 'label' => 'Pita', 'price' => 0],
            ['id' => 'gf', 'label' => 'Gluten free wrap', 'price' => 1.5],
        ]);
        if ($photo === 'wraps-gyro') {
            $addons[] = wc_select_addon('meat', 'Meat', [
                ['id' => 'chicken', 'label' => 'Chicken', 'price' => 0],
                ['id' => 'lamb', 'label' => 'Lamb', 'price' => 0],
            ]);
        }
    }

    if ($photo === 'starters-wings') {
        $addons[] = wc_select_addon('style', 'Style', [
            ['id' => 'bone-in', 'label' => 'Bone-in', 'price' => 0],
            ['id' => 'boneless', 'label' => 'Boneless (white meat)', 'price' => 0],
        ]);
        $addons[] = wc_select_addon('wing-sauce', 'Sauce', [
            ['id' => 'buffalo', 'label' => 'Buffalo', 'price' => 0],
            ['id' => 'teriyaki', 'label' => 'Teriyaki', 'price' => 0],
            ['id' => 'bbq', 'label' => 'BBQ', 'price' => 0],
            ['id' => 'sweet-chili', 'label' => 'Sweet chili', 'price' => 0],
        ]);
    }

    if ($photo === 'starters-fried-calamari') {
        $addons[] = wc_select_addon('marinara', 'Marinara', [
            ['id' => 'sweet', 'label' => 'Sweet marinara', 'price' => 0],
            ['id' => 'spicy', 'label' => 'Spicy marinara', 'price' => 0],
        ]);
    }

    if ($photo === 'starters-hummus') {
        $addons[] = wc_select_addon('serve', 'Served with', [
            ['id' => 'pita', 'label' => 'Pita', 'price' => 0],
            ['id' => 'veggie', 'label' => 'Veggie', 'price' => 0],
        ]);
    }

    if ($photo === 'shakes-milkshake') {
        $addons[] = wc_select_addon('flavor', 'Flavor', [
            ['id' => 'nutterbutter', 'label' => 'NutterButter', 'price' => 0],
            ['id' => 'cookies-cream', 'label' => 'Cookies & Cream', 'price' => 0],
            ['id' => 'chocolate', 'label' => 'Chocolate', 'price' => 0],
            ['id' => 'vanilla', 'label' => 'Vanilla', 'price' => 0],
            ['id' => 'strawberry', 'label' => 'Strawberry', 'price' => 0],
        ]);
    }

    if ($photo === 'pasta-penne-vodka') {
        $addons[] = wc_select_addon('heat', 'Heat', [
            ['id' => 'regular', 'label' => 'Regular', 'price' => 0],
            ['id' => 'spicy', 'label' => 'Spicy', 'price' => 0],
        ], false);
    }

    if ($photo === 'sandwiches-chicken-parm') {
        $addons[] = wc_select_addon('sauce', 'Sauce', [
            ['id' => 'marinara', 'label' => 'Marinara', 'price' => 0],
            ['id' => 'vodka', 'label' => 'Pink vodka sauce', 'price' => 1],
        ]);
    }

    if (in_array($photo, ['kids-grilled-cheese', 'kids-tenders', 'kids-hot-dog'], true)) {
        $addons[] = wc_select_addon('side', 'Side', [
            ['id' => 'fries', 'label' => 'Fries', 'price' => 0],
            ['id' => 'broccoli', 'label' => 'Broccoli', 'price' => 0],
        ]);
    }

    if ($photo === 'kids-pasta') {
        $addons[] = wc_select_addon('sauce', 'Sauce', [
            ['id' => 'butter', 'label' => 'Butter', 'price' => 0],
            ['id' => 'marinara', 'label' => 'Marinara', 'price' => 0],
        ]);
    }

    if ($photo === 'drinks-espresso' || ($item['slug'] ?? '') === 'espresso') {
        $addons[] = wc_select_addon('shots', 'Shots', [
            ['id' => 'single', 'label' => 'Single', 'price' => 0],
            ['id' => 'double', 'label' => 'Double', 'price' => 0.5],
        ]);
    }

    return $addons;
}

function wc_product_variations(string $sectionId, array $item, string $parentSku): array
{
    $photo = (string) ($item['photo'] ?? '');

    if ($sectionId === 'pizza' && !empty($item['price_12']) && !empty($item['price_16'])) {
        return [
            [
                'sku' => $parentSku . '-12',
                'attributes' => ['Size' => '12"'],
                'regular_price' => wc_money($item['price_12']),
            ],
            [
                'sku' => $parentSku . '-16',
                'attributes' => ['Size' => '16"'],
                'regular_price' => wc_money($item['price_16']),
            ],
        ];
    }

    if ($photo === 'starters-wings') {
        return [
            [
                'sku' => $parentSku . '-6',
                'attributes' => ['Count' => '6'],
                'regular_price' => '8.95',
            ],
            [
                'sku' => $parentSku . '-12',
                'attributes' => ['Count' => '12'],
                'regular_price' => '14.95',
            ],
        ];
    }

    return [];
}

function wc_item_id(string $sectionId, array $item): string
{
    $photo = (string) ($item['photo'] ?? '');
    if ($photo !== '') {
        return $photo;
    }

    $slug = (string) ($item['slug'] ?? item_slug((string) $item['name']));
    return $sectionId . '-' . $slug;
}

function wc_public_path(string $relative): string
{
    return '/' . ltrim($relative, '/');
}

function wc_item_images(array $item): array
{
    $photo = (string) ($item['photo'] ?? '');
    $root = dirname(__DIR__, 2) . '/public/';
    $candidates = [];
    if (str_starts_with($photo, 'gelato-')) {
        $candidates[] = 'assets/photos/' . $photo . '.png';
    }
    if ($photo !== '') {
        $candidates[] = 'assets/photos/menu/' . $photo . '.jpg';
        $candidates[] = 'assets/photos/' . $photo . '.png';
        $candidates[] = 'assets/photos/' . $photo . '.jpg';
    }

    foreach ($candidates as $rel) {
        if (is_file($root . $rel)) {
            return [wc_public_path($rel)];
        }
    }

    return [wc_public_path('assets/photos/pizza.jpg')];
}

function wc_absolute_images(array $relativeUrls): array
{
    $base = wc_public_base_url();
    $out = [];
    foreach ($relativeUrls as $url) {
        if (str_starts_with((string) $url, 'http://') || str_starts_with((string) $url, 'https://')) {
            $out[] = $url;
            continue;
        }
        $out[] = $base . '/' . ltrim((string) $url, '/');
    }

    return $out;
}

function wc_product_from_menu_item(array $section, array $item): array
{
    $sectionId = (string) $section['id'];
    $id = wc_item_id($sectionId, $item);
    $sku = wc_sku($sectionId, str_replace($sectionId . '-', '', $id));
    $variations = wc_product_variations($sectionId, $item, $sku);
    $addons = wc_product_addons($sectionId, $item);
    $price = $item['price_12'] ?? $item['price'] ?? '0';
    if ($id === 'starters-wings') {
        $price = '8.95';
    }

    $categories = wc_catalog_categories();
    $categoryName = $section['title'];
    foreach ($categories as $cat) {
        if ($cat['id'] === $sectionId) {
            $categoryName = $cat['name'];
            break;
        }
    }

    $badge = null;
    if (!empty($item['veg'])) {
        $badge = 'Veg';
    } elseif (!empty($item['spicy'])) {
        $badge = 'Spicy';
    } elseif ($sectionId === 'pizza') {
        $badge = 'Build';
    }

    $legacy = [
        'pizza-classic' => 'classic',
        'pizza-margherita' => 'margherita',
        'pizza-meat-lovers' => 'meat-lovers',
        'pizza-white-pie' => 'white-pie',
        'pizza-chicken-parm' => 'chicken-parm',
        'pizza-bbq-buffalo' => 'bbq-buffalo',
        'pizza-veggie' => 'veggie',
        'pizza-philly' => 'philly',
        'pizza-bville-special' => 'bville-special',
        'pizza-thai-chili' => 'thai-chili',
        'pizza-don-pomodoro' => 'don-pomodoro',
        'pizza-combination' => 'combination',
        'burgers-classic' => 'classic-burger',
        'burgers-boom-boom' => 'boom-boom',
        'starters-wings' => 'wings',
        'starters-mozzarella-sticks' => 'mozz-sticks',
        'wraps-chicken-caesar' => 'chicken-wrap',
    ];

    $attributes = [];
    if ($variations) {
        $attrName = array_key_first($variations[0]['attributes']);
        $options = [];
        foreach ($variations as $variation) {
            $options[] = $variation['attributes'][$attrName];
        }
        $attributes[] = [
            'name' => $attrName,
            'options' => $options,
            'variation' => true,
            'visible' => true,
        ];
    }

    return [
        'id' => $id,
        'legacy_id' => $legacy[$id] ?? null,
        'sku' => $sku,
        'type' => $variations ? 'variable' : 'simple',
        'name' => (string) $item['name'],
        'description' => (string) ($item['desc'] ?? ''),
        'short_description' => (string) ($item['desc'] ?? ''),
        'category' => $sectionId,
        'category_name' => $categoryName,
        'regular_price' => wc_money($price),
        'images' => wc_item_images($item),
        'photo' => wc_item_images($item)[0] ?? null,
        'purchasable' => true,
        'in_stock' => true,
        'published' => true,
        'virtual' => true,
        'tax_status' => 'taxable',
        'tax_class' => '',
        'catalog_visibility' => 'visible',
        'customizable' => $sectionId === 'pizza',
        'default_toppings' => wc_pizza_defaults()[$id] ?? [],
        'variations' => $variations,
        'attributes' => $attributes,
        'addons' => $addons,
        'badge' => $badge,
        'veg' => !empty($item['veg']),
        'spicy' => !empty($item['spicy']),
    ];
}

function wc_cafe_products(): array
{
    $site = site_config();
    $drinks = $site['cafe_robust']['drinks'] ?? [];
    $products = [];

    foreach ($drinks as $drink) {
        $slug = (string) ($drink['slug'] ?? item_slug((string) $drink['name']));
        $id = 'drinks-' . $slug;
        $item = [
            'name' => $drink['name'],
            'desc' => $drink['desc'] ?? '',
            'price' => $drink['price'],
            'photo' => '',
            'slug' => $slug,
        ];
        $product = wc_product_from_menu_item(
            ['id' => 'drinks', 'title' => 'Cafe Robust'],
            $item
        );
        $product['id'] = $id;
        $product['sku'] = wc_sku('drinks', $slug);
        $product['images'] = [wc_public_path('assets/photos/coffee.jpg')];
        $product['photo'] = $product['images'][0];
        $product['addons'] = wc_product_addons('drinks', $item);
        if ($slug === 'robust-house-blend') {
            $product['legacy_id'] = 'house-blend';
        }
        if ($slug === 'latte' || $id === 'drinks-latte') {
            $product['legacy_id'] = 'latte';
        }
        $products[] = $product;
    }

    return $products;
}

function wc_build_catalog(): array
{
    $products = [];
    foreach (menu_sections() as $section) {
        foreach ($section['items'] as $item) {
            $product = wc_product_from_menu_item($section, $item);
            $product['photo'] = $product['images'][0] ?? null;
            $products[] = $product;
        }
    }

    foreach (wc_cafe_products() as $drink) {
        $products[] = $drink;
    }

    $cfg = wc_store_config();
    $site = site_config();

    return [
        'store' => [
            'name' => $site['name'],
            'address' => $site['address'],
            'city' => $site['city'],
            'phone' => $site['phone'],
            'email' => $site['email'],
            'currency' => $cfg['currency'],
            'tax_rate' => $cfg['tax_rate'],
            'woocommerce' => [
                'ready' => true,
                'connected' => $cfg['enabled'],
                'import' => [
                    'csv' => wc_public_path('api/woocommerce-export.php'),
                    'json' => wc_public_path('woocommerce/catalog.json'),
                ],
            ],
        ],
        'categories' => wc_catalog_categories(),
        'products' => $products,
    ];
}

function wc_find_product(array $catalog, string $idOrSku): ?array
{
    foreach ($catalog['products'] as $product) {
        if ($product['id'] === $idOrSku || $product['sku'] === $idOrSku) {
            return $product;
        }
        if (($product['legacy_id'] ?? null) === $idOrSku) {
            return $product;
        }
        foreach ($product['variations'] as $variation) {
            if ($variation['sku'] === $idOrSku) {
                $copy = $product;
                $copy['_matched_variation'] = $variation;
                return $copy;
            }
        }
    }

    return null;
}

function wc_find_variation(array $product, array $line): ?array
{
    if (!empty($product['_matched_variation'])) {
        return $product['_matched_variation'];
    }

    $variations = $product['variations'] ?? [];
    if (!$variations) {
        return null;
    }

    $wantedSku = (string) ($line['variation_sku'] ?? '');
    if ($wantedSku !== '') {
        foreach ($variations as $variation) {
            if ($variation['sku'] === $wantedSku) {
                return $variation;
            }
        }
    }

    $attrs = $line['variation'] ?? [];
    if (isset($line['options']['size'])) {
        $sizeMap = [
            'twelve' => '12"',
            '16' => '16"',
            'sixteen' => '16"',
            '12' => '12"',
            '12"' => '12"',
            '16"' => '16"',
        ];
        $size = $sizeMap[(string) $line['options']['size']] ?? (string) $line['options']['size'];
        $attrs['Size'] = $size;
    }
    if (isset($line['options']['count'])) {
        $attrs['Count'] = (string) $line['options']['count'];
    }

    foreach ($variations as $variation) {
        $match = true;
        foreach ($variation['attributes'] as $name => $value) {
            $given = $attrs[$name] ?? $attrs[strtolower($name)] ?? null;
            if ((string) $given !== (string) $value) {
                $match = false;
                break;
            }
        }
        if ($match && $attrs) {
            return $variation;
        }
    }

    return $variations[0];
}

function wc_addon_option(array $addon, string $optionId): ?array
{
    foreach ($addon['options'] as $option) {
        if ((string) $option['id'] === $optionId) {
            return $option;
        }
    }

    return null;
}

function wc_line_unit_price(array $product, array $line): float
{
    $price = (float) $product['regular_price'];
    $variation = wc_find_variation($product, $line);
    if ($variation) {
        $price = (float) $variation['regular_price'];
    }

    $selected = $line['addons'] ?? [];
    if (isset($line['options']) && is_array($line['options'])) {
        foreach ($line['options'] as $key => $value) {
            if (!isset($selected[$key])) {
                $selected[$key] = $value;
            }
        }
    }

    $defaults = $product['default_toppings'] ?? [];

    foreach ($product['addons'] ?? [] as $addon) {
        $value = $selected[$addon['id']] ?? null;
        if ($value === null || $value === '' || $value === 'none') {
            continue;
        }

        if ($addon['type'] === 'checkbox') {
            $ids = is_array($value) ? $value : (preg_split('/\s*,\s*/', (string) $value) ?: []);
            foreach ($ids as $optId) {
                if (in_array($optId, $defaults, true)) {
                    continue;
                }
                $option = wc_addon_option($addon, (string) $optId);
                $price += (float) ($option['price'] ?? 0);
            }
            continue;
        }

        $option = wc_addon_option($addon, (string) $value);
        $price += (float) ($option['price'] ?? 0);
    }

    return round($price, 2);
}

function wc_line_meta(array $product, array $line): array
{
    $meta = [];
    $variation = wc_find_variation($product, $line);
    if ($variation) {
        foreach ($variation['attributes'] as $name => $value) {
            $meta[] = ['key' => $name, 'value' => $value];
        }
    }

    $selected = $line['addons'] ?? [];
    if (isset($line['options']) && is_array($line['options'])) {
        $selected = array_merge($line['options'], $selected);
    }

    $defaults = $product['default_toppings'] ?? [];

    foreach ($product['addons'] ?? [] as $addon) {
        $value = $selected[$addon['id']] ?? null;
        if ($value === null || $value === '' || $value === 'none') {
            continue;
        }
        if ($addon['type'] === 'checkbox') {
            $ids = is_array($value) ? $value : (preg_split('/\s*,\s*/', (string) $value) ?: []);
            $labels = [];
            foreach ($ids as $optId) {
                $option = wc_addon_option($addon, (string) $optId);
                if ($option) {
                    $label = $option['label'];
                    if (in_array($optId, $defaults, true)) {
                        $label .= ' (included)';
                    }
                    $labels[] = $label;
                }
            }
            if ($labels) {
                $meta[] = ['key' => $addon['name'], 'value' => implode(', ', $labels)];
            }
            continue;
        }
        $option = wc_addon_option($addon, (string) $value);
        if ($option) {
            $meta[] = ['key' => $addon['name'], 'value' => $option['label']];
        }
    }

    return $meta;
}

function wc_catalog_csv(array $catalog): string
{
    $headers = [
        'Type', 'SKU', 'Name', 'Published', 'Is featured?', 'Visibility in catalog',
        'Short description', 'Description', 'Tax status', 'Tax class', 'In stock?',
        'Stock', 'Backorders allowed?', 'Sold individually?', 'Allow customer reviews?',
        'Regular price', 'Categories', 'Tags', 'Images', 'Parent', 'Position',
        'Attribute 1 name', 'Attribute 1 value(s)', 'Attribute 1 visible', 'Attribute 1 global',
        'Meta: _virtual', 'Meta: bville_id',
    ];

    $fh = fopen('php://temp', 'r+');
    fputcsv($fh, $headers);

    $position = 0;
    foreach ($catalog['products'] as $product) {
        $images = implode(', ', wc_absolute_images($product['images']));
        $category = $product['category_name'];
        $attr = $product['attributes'][0] ?? null;
        $attrValues = $attr ? implode(' | ', $attr['options']) : '';

        fputcsv($fh, [
            $product['type'],
            $product['sku'],
            $product['name'],
            1,
            0,
            'visible',
            $product['short_description'],
            $product['description'],
            'taxable',
            '',
            1,
            '',
            0,
            0,
            0,
            $product['variations'] ? '' : $product['regular_price'],
            $category,
            'Bville Menu',
            $images,
            '',
            $position,
            $attr['name'] ?? '',
            $attrValues,
            $attr ? 1 : '',
            $attr ? 0 : '',
            'yes',
            $product['id'],
        ]);

        foreach ($product['variations'] as $index => $variation) {
            $attrName = array_key_first($variation['attributes']);
            fputcsv($fh, [
                'variation',
                $variation['sku'],
                $product['name'] . ' - ' . $variation['attributes'][$attrName],
                1,
                0,
                'visible',
                '',
                '',
                'taxable',
                '',
                1,
                '',
                0,
                0,
                0,
                $variation['regular_price'],
                '',
                '',
                $images,
                $product['sku'],
                $index,
                $attrName,
                $variation['attributes'][$attrName],
                1,
                0,
                'yes',
                $product['id'],
            ]);
        }
        $position++;
    }

    rewind($fh);
    $csv = stream_get_contents($fh) ?: '';
    fclose($fh);

    return $csv;
}
