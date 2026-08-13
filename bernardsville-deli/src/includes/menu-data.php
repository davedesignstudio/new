<?php

declare(strict_types=1);

return [
    [
        'id' => 'pizza',
        'title' => 'Stone Oven Pizza',
        'note' => 'Creative pies from our stone oven',
        'items' => [
            ['name' => 'Margherita', 'desc' => 'Fresh mozzarella, basil, tomato sauce', 'price' => '14.99'],
            ['name' => 'Bville Special', 'desc' => 'Pepperoni, sausage, peppers, onion', 'price' => '17.99'],
            ['name' => 'Mediterranean', 'desc' => 'Feta, olives, spinach, sun-dried tomato', 'price' => '16.99'],
            ['name' => 'BBQ Chicken', 'desc' => 'Grilled chicken, red onion, BBQ drizzle', 'price' => '16.99'],
        ],
    ],
    [
        'id' => 'wraps',
        'title' => 'Wraps',
        'items' => [
            ['name' => 'Chicken Caesar Wrap', 'desc' => 'Romaine, parmesan, caesar dressing', 'price' => '11.99'],
            ['name' => 'Greek Wrap', 'desc' => 'Feta, cucumber, tomato, tzatziki', 'price' => '11.49'],
            ['name' => 'Steak Wrap', 'desc' => 'Sliced steak, peppers, melted cheese', 'price' => '13.49'],
        ],
    ],
    [
        'id' => 'handhelds',
        'title' => 'Handhelds',
        'items' => [
            ['name' => 'Chicken Kabob Plate', 'desc' => 'Marinated chicken, rice, salad', 'price' => '14.99'],
            ['name' => 'Lamb Skewers', 'desc' => 'Grilled lamb, pita, hummus', 'price' => '16.99'],
            ['name' => 'Falafel Pocket', 'desc' => 'Crispy falafel, tahini, pickles', 'price' => '10.99'],
        ],
    ],
    [
        'id' => 'sandwiches',
        'title' => 'Sandwiches',
        'items' => [
            ['name' => 'Italian Sub', 'desc' => 'Ham, salami, provolone, oil & vinegar', 'price' => '11.99'],
            ['name' => 'Turkey Avocado', 'desc' => 'Roasted turkey, avocado, sprouts', 'price' => '12.49'],
            ['name' => 'Philly Cheesesteak', 'desc' => 'Onions, peppers, melted provolone', 'price' => '13.99'],
        ],
    ],
    [
        'id' => 'panini',
        'title' => 'Panini',
        'items' => [
            ['name' => 'Caprese Panini', 'desc' => 'Tomato, mozzarella, basil pesto', 'price' => '11.99'],
            ['name' => 'Chicken Pesto Panini', 'desc' => 'Grilled chicken, roasted peppers', 'price' => '12.99'],
            ['name' => 'Ham & Swiss', 'desc' => 'Pressed on ciabatta', 'price' => '11.49'],
        ],
    ],
    [
        'id' => 'burgers',
        'title' => 'Burgers',
        'note' => 'Angus · Prime Rib — So Sweet, So Tasty, So Juicy',
        'items' => [
            ['name' => 'Classic Angus Burger', 'desc' => 'Lettuce, tomato, pickle, brioche bun', 'price' => '13.99'],
            ['name' => 'Prime Rib Burger', 'desc' => 'Aged cheddar, caramelized onions', 'price' => '15.99'],
            ['name' => 'Bville Bacon Burger', 'desc' => 'Crispy bacon, special sauce', 'price' => '14.99'],
        ],
    ],
];
