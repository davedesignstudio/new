<?php

declare(strict_types=1);

/**
 * ЧУДО Комикс №1 — original Russian-house superhero issue
 * about Bville Pizza & Grill. Not Marvel; original publisher and heroes.
 */

return [
    'no' => '1',
    'publisher' => 'Чудо Комикс',
    'publisher_latin' => 'Chudo Comics',
    'city' => 'Москва · Bernardsville',
    'title_en' => 'Oven Origins',
    'title_ru' => 'Истоки Печи',
    'kicker_en' => 'If a Moscow comics house told the Bville story',
    'kicker_ru' => 'Если бы московское издательство рассказало историю Bville',
    'disclaimer_en' => 'Original heroes. Original publisher. The kitchen at 159 Morristown Rd is real.',
    'disclaimer_ru' => 'Герои и издательство вымышлены. Кухня на 159 Morristown Rd — настоящая.',
    'pages' => [
        [
            'file' => 'chudo-cover.webp',
            'label_en' => 'Cover',
            'label_ru' => 'Обложка',
            'caption_en' => 'Чудо Комикс №1 — Oven Origins. Five house heroes. One stone oven. Bernardsville, NJ.',
            'caption_ru' => 'Чудо Комикс №1 — Истоки Печи. Пять героев дома. Одна каменная печь. Bernardsville, NJ.',
            'order_item' => null,
            'cta_en' => 'Order the house pie',
            'cta_ru' => 'Заказать фирменную пиццу',
        ],
        [
            'file' => 'chudo-01-origins.webp',
            'label_en' => 'The Grill',
            'label_ru' => 'The Grill',
            'caption_en' => 'For years Bernardsville knew this address as The Grill — wings, paninis, kabobs. Then the sign went quiet.',
            'caption_ru' => 'Годами этот адрес знали как The Grill — крылышки, panini, kebab. Потом вывеска затихла.',
            'order_item' => null,
            'cta_en' => 'See the full menu',
            'cta_ru' => 'Все меню',
            'cta_href' => 'menu.php',
        ],
        [
            'file' => 'chudo-02-oven.webp',
            'label_en' => 'The oven wakes',
            'label_ru' => 'Печь просыпается',
            'caption_en' => 'The rename was not a reset. Same kitchen. New flame. Captain Oven steps out of the stone.',
            'caption_ru' => 'Переименование не сброс. Та же кухня. Новый огонь. Капитан Печь выходит из камня.',
            'order_item' => 'pizza-classic',
            'cta_en' => 'Build a pie',
            'cta_ru' => 'Собрать пиццу',
        ],
        [
            'file' => 'chudo-03-team.webp',
            'label_en' => 'Two menus, one pass',
            'label_ru' => 'Два меню, одна линия',
            'caption_en' => 'Shawerma is the B’Ville Special. Chetzel holds the pretzel bun. Jersey Steak owns Morristown Rd. Robust keeps the bar.',
            'caption_ru' => 'Шаверма — это B’Ville Special. Чецел держит pretzel. Джерси Стейк — Morristown Rd. Робаст держит бар.',
            'order_item' => 'pizza-bville-special',
            'cta_en' => 'Add B’Ville Special',
            'cta_ru' => 'Добавить B’Ville Special',
        ],
        [
            'file' => 'chudo-04-villain.webp',
            'label_en' => 'Cold Delivery',
            'label_ru' => 'Холодная Доставка',
            'caption_en' => 'The marketplace golem steals heat and the guest. Commission freeze rays. Lukewarm pies. Not on this site.',
            'caption_ru' => 'Голем витрин крадёт тепло и гостя. Луч комиссии. Тёплая пицца. Не на этом сайте.',
            'order_item' => null,
            'cta_en' => 'Order on this site',
            'cta_ru' => 'Заказ на этом сайте',
        ],
        [
            'file' => 'chudo-05-road.webp',
            'label_en' => 'Morristown Road',
            'label_ru' => 'Morristown Road',
            'caption_en' => 'Route 202. Little League pickup. Train lunch. This road feeds the room — and the heroes hold it.',
            'caption_ru' => 'Трасса 202. Little League. Обед после поезда. Эта дорога кормит зал — герои её держат.',
            'order_item' => 'cheesesteak-jersey',
            'cta_en' => 'Add Jersey Cheesesteak',
            'cta_ru' => 'Добавить Jersey Cheesesteak',
        ],
        [
            'file' => 'chudo-06-victory.webp',
            'label_en' => 'Order from the house',
            'label_ru' => 'Заказывай у печи',
            'caption_en' => 'Pickup or delivery. Paid on this site. Keep the heat. Keep the guest check.',
            'caption_ru' => 'Самовывоз или доставка. Оплата здесь. Сохрани жар. Сохрани чек.',
            'order_item' => null,
            'cta_en' => 'Order pickup or delivery',
            'cta_ru' => 'Заказ — самовывоз или доставка',
        ],
        [
            'file' => 'chudo-07-credits.webp',
            'label_en' => 'Credits',
            'label_ru' => 'Титры',
            'caption_en' => 'Script: the Bville kitchen. Art: the stone oven. Next issue: Cafe Robust. Heroes fictional. The pizza is real.',
            'caption_ru' => 'Сценарий: кухня Bville. Рисунок: каменная печь. Следующий номер: Cafe Robust. Герои вымышлены. Пицца настоящая.',
            'order_item' => 'burgers-chetzel',
            'cta_en' => 'Add Chetzel',
            'cta_ru' => 'Добавить Chetzel',
        ],
    ],
];
