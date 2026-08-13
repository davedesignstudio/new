<?php

declare(strict_types=1);

return [
    [
        'id' => 'breakfast',
        'title' => 'Breakfast',
        'note' => 'Served all morning · fresh eggs & house coffee',
        'items' => [
            ['name' => 'Classic Egg & Cheese', 'desc' => 'On a roll or bagel', 'price' => '5.99'],
            ['name' => 'Taylor Ham, Egg & Cheese', 'desc' => 'Jersey classic', 'price' => '7.49'],
            ['name' => 'Bacon, Egg & Cheese', 'desc' => 'Crispy bacon, melted cheese', 'price' => '7.99'],
            ['name' => 'Western Omelette Wrap', 'desc' => 'Peppers, onions, ham & cheese', 'price' => '8.49'],
            ['name' => 'Avocado Toast', 'desc' => 'Multigrain, lemon, sea salt', 'price' => '7.25'],
        ],
    ],
    [
        'id' => 'cold-subs',
        'title' => 'Cold Subs & Sandwiches',
        'note' => 'Boar\'s Head meats · build your own',
        'items' => [
            ['name' => 'Italian Sub', 'desc' => 'Ham, salami, provolone, oil & vinegar', 'price' => '10.99'],
            ['name' => 'Turkey Club', 'desc' => 'Roasted turkey, bacon, lettuce, tomato', 'price' => '11.49'],
            ['name' => 'Roast Beef Special', 'desc' => 'Rare roast beef, horseradish, onion', 'price' => '12.49'],
            ['name' => 'Veggie Delight', 'desc' => 'Hummus, roasted peppers, greens', 'price' => '9.99'],
            ['name' => 'Tuna Salad Sandwich', 'desc' => 'House-made, on your choice of bread', 'price' => '9.49'],
        ],
    ],
    [
        'id' => 'hot',
        'title' => 'Hot Sandwiches & Grill',
        'note' => 'From the lunch counter',
        'items' => [
            ['name' => 'Chicken Cutlet Parm', 'desc' => 'Marinara, mozzarella, hero roll', 'price' => '12.99'],
            ['name' => 'Philly Cheesesteak', 'desc' => 'Onions, peppers, melted provolone', 'price' => '13.49'],
            ['name' => 'Grilled Chicken Wrap', 'desc' => 'Caesar, romaine, parmesan', 'price' => '11.99'],
            ['name' => 'Hot Pastrami on Rye', 'desc' => 'Steamed pastrami, mustard', 'price' => '12.49'],
            ['name' => 'Fresh Chicken Sandwich & Fries', 'desc' => 'Crispy chicken, house fries', 'price' => '13.99'],
        ],
    ],
    [
        'id' => 'salads-platters',
        'title' => 'Salads & Platters',
        'items' => [
            ['name' => 'Chef Salad', 'desc' => 'Turkey, ham, Swiss, hard-boiled egg', 'price' => '12.99'],
            ['name' => 'Grilled Chicken Caesar', 'desc' => 'Romaine, parmesan, croutons', 'price' => '11.99'],
            ['name' => 'Antipasto Platter', 'desc' => 'Meats, cheeses, olives — feeds 2–3', 'price' => '18.99'],
            ['name' => 'Macaroni Salad Pint', 'desc' => 'House-made deli side', 'price' => '5.49'],
        ],
    ],
    [
        'id' => 'grocery',
        'title' => 'Deli & Grocery',
        'note' => 'Local favorites behind the counter',
        'items' => [
            ['name' => 'Fresh Bread & Rolls', 'desc' => 'Daily delivery', 'price' => 'Market'],
            ['name' => 'Deli Meats & Cheeses', 'desc' => 'Sliced to order', 'price' => 'Market'],
            ['name' => 'Homemade Salads', 'desc' => 'Potato, pasta, coleslaw', 'price' => 'Market'],
            ['name' => 'Snacks & Beverages', 'desc' => 'Cold drinks, chips, local treats', 'price' => 'Market'],
        ],
    ],
];
