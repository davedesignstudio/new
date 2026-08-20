<?php

declare(strict_types=1);

/**
 * Two conversion audiences for the Bville site.
 *
 * Demo A is the local table: Somerset family households around 159 Morristown Rd.
 * Demo B is the phone: millennial / Gen Z guests who already order food on a screen.
 * The millennial parent is the overlap — Chudo №1 is the kid-and-parent issue,
 * pickup is the family ticket.
 *
 * Russian-speaking NJ (Fair Lawn / Bergen) is a real state cluster, but it is not
 * Bernardsville’s order market. EN·RU on this site is Chudo house voice, not ACS language.
 *
 * @return array{
 *   family: array<string, mixed>,
 *   phone: array<string, mixed>,
 *   overlap: string,
 *   sources: list<array{title:string,url:string}>
 * }
 */
return [
    'family' => [
        'id' => 'family-table',
        'kicker' => 'Family table',
        'kicker_blend' => 'Family table / Семейный стол',
        'title' => 'After practice. After the train.',
        'lede' => 'Pickup at 159 Morristown Rd. 16" for the table, kids plates, your name on the bag.',
        'cta' => 'Order pickup',
        'cta_href' => 'order/',
        'secondary' => 'Kids menu',
        'secondary_href' => 'menu.php#kids',
        'facts' => [
            '39.4% of Bernardsville households have kids under 18 (2020 Census).',
            'Persons under 18: 25.2%. Under 5: 6.6%. Mean commute: 28.3 minutes. Drive-alone, about two cars per home (ACS 2020–2024 / Data USA).',
            'Family household median income $242,750 (ACS 2023). Borough median $236,115 in 2024 dollars (QuickFacts).',
            'Parents with kids under 12 prefer curbside pickup over walking in (DoorDash Restaurant Online Ordering, April 2023).',
            '57% of pizza orders are a Large (CouponFollow National Pizza Study). 19.1% of the borough is 65+ — keep the phone on the ticket.',
        ],
    ],
    'phone' => [
        'id' => 'phone-order',
        'kicker' => 'On your phone',
        'kicker_blend' => 'On your phone / На телефоне',
        'title' => 'Read with the kids. Build the pie.',
        'lede' => 'Order from this kitchen on your phone — sauce, toppings, pickup or delivery. Чудо №1 is the origin story you can open while it bakes.',
        'cta' => 'Build a pie',
        'cta_href' => 'order/',
        'secondary' => 'Read Чудо №1',
        'secondary_href' => 'comic.php',
        'facts' => [
            'Nearly 40% of Gen Z and millennials order food through an app at least weekly (Bloomberg Opinion).',
            '66% of Gen Z / young millennials prefer the internet for pizza; 53% of millennials prefer a mobile device (CouponFollow, n=1,026).',
            '63% of Gen Z regularly use delivery apps vs 51% of millennials; 75% of Gen Z customize orders (Deliverect / Civic Science).',
            'Gen Z is the only group that ranked food photos in their top reasons to try a new restaurant; 25% Gen Z / 21% millennials use the restaurant’s social (DoorDash 2023).',
            '69% of Gen Z used a third-party aggregator in six months, but pickup still beats delivery to dodge fees (PYMNTS Connected Dining, Feb 2023). Direct checkout is the conversion.',
            'Comics reach the same age band: 52% of readers are under 35; 35% of fans buy for kids; millennials are ~40% of fans (industry compilations). Kids’ comics were ~38% of 2023 BookScan graphic-novel units.',
        ],
    ],
    'overlap' => 'Millennial parents in the Somerset Hills — the table that picks up after practice, and the issue they can read with the kids.',
    'sources' => [
        [
            'title' => 'U.S. Census Bureau QuickFacts: Bernardsville borough, New Jersey (ACS 2020–2024)',
            'url' => 'https://www.census.gov/quickfacts/fact/table/bernardsvilleboroughnewjersey/PST040224',
        ],
        [
            'title' => '2020 Census household figures as compiled for Bernardsville, NJ',
            'url' => 'https://en.wikipedia.org/wiki/Bernardsville,_New_Jersey',
        ],
        [
            'title' => 'Neilsberg / ACS 2023 family vs non-family income, Bernardsville',
            'url' => 'https://www.neilsberg.com/insights/bernardsville-nj-median-household-income/',
        ],
        [
            'title' => 'Data USA: Bernardsville commute and household vehicles',
            'url' => 'https://datausa.io/profile/geo/bernardsville-nj',
        ],
        [
            'title' => 'DoorDash, Restaurant Online Ordering (U.S., April 2023, n=1,505)',
            'url' => 'https://assets.ctfassets.net/trvmqu12jq2l/5fTVhyjeP5pNS29PrXNaA5/5abf1cac979159aeaf9615b7b8e8d2e4/2023_Restaurant_Online_Ordering_EN-US.pdf',
        ],
        [
            'title' => 'CouponFollow National Pizza Study (Jan 2020, n=1,026)',
            'url' => 'https://couponfollow.com/research/national-pizza-study',
        ],
        [
            'title' => 'Deliverect: Gen Z food-delivery behavior (Civic Science / Dig Insights)',
            'url' => 'https://www.deliverect.com/en-us/blog/trending/gen-z-their-identity-food-delivery-behavior-and-key-stats-in-2024',
        ],
        [
            'title' => 'PYMNTS, Connected Dining: Rising Costs Push Consumers Toward Pickup (Feb 2023)',
            'url' => 'https://www.pymnts.com/wp-content/uploads/2023/02/PYMNTS-Connected-Dining-February-2023.pdf',
        ],
        [
            'title' => 'Comics Beat / BookScan 2023: kids comics share of graphic-novel units',
            'url' => 'https://www.comicsbeat.com/tilting-at-windmills-297-bookscan-2023-comics-sales-sag-but-scholastic-was-still-a-powerhouse/',
        ],
    ],
];
