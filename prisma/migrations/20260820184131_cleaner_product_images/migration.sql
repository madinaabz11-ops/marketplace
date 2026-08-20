-- Swap out listing photos that had a cluttered/environmental background
-- (outdoors, retail store, worn by a person, or wrong brand visible) for
-- cleaner, more isolated product-style shots.
UPDATE "Listing" SET "imageUrl" = 'https://commons.wikimedia.org/wiki/Special:FilePath/Redmi_note_9_pro_black.jpg?width=600' WHERE "title" = 'Смартфон Xiaomi Redmi Note 13, 128 ГБ';
UPDATE "Listing" SET "imageUrl" = 'https://commons.wikimedia.org/wiki/Special:FilePath/ZOOMLP-5447-Zesty-AM-827-ESHOCK-075.jpg?width=600' WHERE "title" = 'Велосипед горный Stern Dynamic';
UPDATE "Listing" SET "imageUrl" = 'https://commons.wikimedia.org/wiki/Special:FilePath/OutDoor%202018,%20Friedrichshafen%20(1X7A0534).jpg?width=600' WHERE "title" = 'Палатка туристическая, 4-местная';
UPDATE "Listing" SET "imageUrl" = 'https://commons.wikimedia.org/wiki/Special:FilePath/Belizesofa.jpg?width=600' WHERE "title" = 'Диван-кровать из ИКЕА';
UPDATE "Listing" SET "imageUrl" = 'https://commons.wikimedia.org/wiki/Special:FilePath/Polo%20Ralph%20Lauren%20down%20jacket%20with%20Aztec%20style%20print.jpg?width=600' WHERE "title" = 'Зимняя куртка Uniqlo, размер M';
