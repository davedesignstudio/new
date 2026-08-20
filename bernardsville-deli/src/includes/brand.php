<?php

declare(strict_types=1);

/**
 * Bville house brand — identity, not a research deck.
 * Research shaped the feelings. The brand is what the table should feel.
 */
return [
    'name' => 'Bville Pizza & Grill',
    'short' => 'Bville',
    'tagline' => 'For the table.',
    'line' => 'The kitchen that already knows the table.',
    'imprint' => 'Чудо Комикс',
    'address' => '159 Morristown Rd, Bernardsville',
    'manifesto' => [
        'This address used to be The Grill. It still is, in the way that matters: the recipes, the road, the usual.',
        'Bville is the louder welcome. A stone oven for Friday. A bag with a name on it. Kids’ pasta without asking twice.',
        'We do not perform newness. We keep the heat. We keep the names. We meet you after practice, after the train, at the counter.',
        'If a Moscow comics house told this kitchen’s story, it would still end at the same table.',
    ],
    'places' => [
        [
            'id' => 'warmth',
            'word' => 'Warmth',
            'mark' => 'assets/brand/oven-heat.svg',
            'line' => 'We’ll have it warm at the counter.',
            'body' => 'Orange is oven heat. Cream is kitchen paper. The pie should still be hot when it meets the car.',
        ],
        [
            'id' => 'closeness',
            'word' => 'Closeness',
            'mark' => 'assets/brand/house-stamp.svg',
            'line' => 'Name on the bag. We know the kids’ pasta.',
            'body' => 'The counter is close even when dinner is in the driveway. Address and phone stay on the ticket. Grandma can still call it in.',
        ],
        [
            'id' => 'familiarity',
            'word' => 'Familiarity',
            'mark' => 'assets/logo.svg',
            'line' => 'The names this table already knows.',
            'body' => 'Parkside on the sign you drive past. B’Ville Special. Jersey Cheesesteak. Chetzel. The Grill never left.',
        ],
        [
            'id' => 'family',
            'word' => 'Family',
            'mark' => 'assets/brand/table-mark.svg',
            'line' => 'After practice. After the train.',
            'body' => 'The unit of order is the table. Чудо №1 is the origin the kids can open while it bakes — a shared blanket, not a collector fight.',
        ],
    ],
    'colors' => [
        ['name' => 'Oven', 'hex' => '#e45c24', 'use' => 'Heat, the sign, the one invitation'],
        ['name' => 'Counter', 'hex' => '#142820', 'use' => 'Ink, outlines, the pass'],
        ['name' => 'Cream paper', 'hex' => '#f4e6c4', 'use' => 'Kitchen paper, the board'],
        ['name' => 'Check gold', 'hex' => '#e8b84a', 'use' => 'Guest-check rule, Cafe Robust'],
        ['name' => 'Note maroon', 'hex' => '#8b2e12', 'use' => 'Kickers, the quiet voice'],
        ['name' => 'Plate', 'hex' => '#fffaf0', 'use' => 'Guest checks, open paper'],
    ],
    'type' => [
        ['role' => 'The sign', 'family' => 'Parkside', 'sample' => 'Bville', 'note' => 'The word on Morristown Rd. Printed-board titles. Never replace with comic type.'],
        ['role' => 'The line', 'family' => 'EB Garamond', 'sample' => "B’Ville Special", 'note' => 'Menu item titles. The name on the board, in the same face as the house ledes.'],
        ['role' => 'The note', 'family' => 'Alegreya italic', 'sample' => 'Stone Oven Baked', 'note' => 'Featured captions, menu section titles, and dish descriptions.'],
        ['role' => 'The story', 'family' => 'EB Garamond italic', 'sample' => 'The kitchen that already knows the table.', 'note' => 'Ledes, captions, the voice of the counter.'],
        ['role' => 'The issue', 'family' => 'Russo One / Bangers', 'sample' => 'FOR THE TABLE', 'note' => 'Issue chrome and house-name bursts. Sparingly.'],
    ],
    'story' => [
        'title' => 'Same kitchen. New flame.',
        'beats' => [
            ['photo' => 'table', 'title' => 'The Grill', 'text' => 'Wings on game night. Kabobs on the ride home. Bernardsville already had a usual.'],
            ['photo' => 'kitchen', 'title' => 'The pass', 'text' => 'The rename was not a reset. Mediterranean and American still share the fire.'],
            ['photo' => 'pizza', 'title' => 'The oven', 'text' => 'Friday got a stone oven. The B’Ville Special became the name on the board.'],
            ['photo' => 'dining', 'title' => 'The table', 'text' => 'Kids’ pasta. A comic while it bakes. Pickup with the bag still warm.'],
        ],
    ],
    'voice' => [
        'we' => 'The counter talking to the table.',
        'you' => 'You means the family.',
        'always' => ['Say the address.', 'Say the house names.', 'One orange invitation.', 'Unhurried sentences.'],
        'never' => ['App tax.', 'New menu drop.', 'Members only.', 'Three gold buttons.'],
        'lines' => [
            'We’ll have it warm at the counter.',
            'Name on the bag.',
            'After practice. After the train.',
            'Order for the table.',
        ],
    ],
    'why' => 'Somerset family households (kids in nearly four in ten homes, rooted, car-first) and millennial parents who already order on a phone. The brand is the overlap: pickup as care, house names as vocabulary, Чудо as the story you read together. Research stays in the kitchen. The table only feels the meal.',
];
