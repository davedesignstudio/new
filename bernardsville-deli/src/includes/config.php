<?php

declare(strict_types=1);

return [
    'name' => 'Bville Pizza & Grill',
    'short_name' => 'Bville',
    'tagline' => 'Stone oven pizza · Mediterranean & American cuisine',
    'address' => '159 Morristown Rd',
    'city' => 'Bernardsville, NJ 07924',
    'phone' => '(908) 766-1666',
    'phone_raw' => '9087661666',
    'email' => 'info@bvillepizzagrill.com',
    'hours' => 'Open daily — call for hours',
    'social' => [
        'instagram' => '#',
        'facebook' => '#',
    ],
    'about' => 'The Grill is now Bville Pizza and Grill! Although our name has changed, the high-quality Mediterranean and American cuisine we serve our customers in the Bernardsville area remains the same. From chicken wings to paninis to kabobs, our food will be sure to please. Check out our creative selection of pizzas, the latest addition to our menu. Whether you are a returning customer or thinking about trying us for the first time, you\'ll find something on our diverse menu to satisfy your appetite. But don\'t take our word for it, check out our 4-star ratings on Google, Yelp, and Trip Advisor!',
    'menu_categories' => [
        ['id' => 'pizza', 'label' => 'Stone Oven Pizza', 'emoji' => '🍕'],
        ['id' => 'wraps', 'label' => 'Wraps', 'emoji' => '🌯'],
        ['id' => 'handhelds', 'label' => 'Handhelds', 'emoji' => '🍢'],
        ['id' => 'sandwiches', 'label' => 'Sandwiches', 'emoji' => '🥪'],
        ['id' => 'panini', 'label' => 'Panini', 'emoji' => '🥙'],
        ['id' => 'burgers', 'label' => 'Burgers', 'emoji' => '🍔'],
    ],
    'cafe_robust' => [
        'name' => 'Cafe Robust',
        'tagline' => 'Bold coffee · Fresh roasts',
        'colors' => [
            'brown' => '#4B2C20',
            'gold' => '#D4A34F',
            'white' => '#FFFFFF',
        ],
        'logos' => [
            'bean' => 'assets/cafe-robust/bean-logo.svg',
            'cup' => 'assets/cafe-robust/cup-logo.svg',
            'wordmark' => 'assets/cafe-robust/wordmark-bubble.svg',
            'arch' => 'assets/cafe-robust/wordmark-arch.svg',
            'cr' => 'assets/cafe-robust/cr-mark.svg',
        ],
        'drinks' => [
            ['name' => 'Robust House Blend', 'desc' => 'Dark roast, smooth finish', 'price' => '2.99'],
            ['name' => 'Espresso', 'desc' => 'Single or double shot', 'price' => '2.49'],
            ['name' => 'Cappuccino', 'desc' => 'Steamed milk, thick foam', 'price' => '4.49'],
            ['name' => 'Latte', 'desc' => 'Espresso with steamed milk', 'price' => '4.99'],
            ['name' => 'Cold Brew', 'desc' => 'Slow-steeped, served over ice', 'price' => '4.49'],
            ['name' => 'Seasonal Special', 'desc' => 'Ask your barista', 'price' => '5.49'],
        ],
    ],
    'designer' => [
        'name' => 'Philhower',
        'studio' => 'Warped Minds Design',
        'person' => 'David Philhower',
        'logo' => 'assets/philhower/philhower-logo.svg',
        'url' => 'https://linkedin.com/in/david-philhower-984264169',
        'colors' => [
            'purple' => '#5B2488',
            'blue' => '#1E4FA8',
            'gold' => '#F5C518',
            'navy' => '#0D2B6E',
        ],
    ],
    'menu_graphic' => [
        'ai' => 'assets/source/graphic for front menu deli bernardsville.ai',
        'idlk' => 'assets/source/~bernardsville deli~07z_p2.idlk',
        'export_png' => 'public/assets/menu/front-menu.png',
        'export_jpg' => 'public/assets/menu/front-menu.jpg',
        'export_webp' => 'public/assets/menu/front-menu.webp',
        'placeholder' => 'assets/menu/front-menu-board.svg',
    ],
];
