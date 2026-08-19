import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  const irina = await prisma.user.upsert({
    where: { email: "irina@example.com" },
    update: {},
    create: { name: "Ирина", email: "irina@example.com", passwordHash },
  });

  const daniyar = await prisma.user.upsert({
    where: { email: "daniyar@example.com" },
    update: {},
    create: { name: "Данияр", email: "daniyar@example.com", passwordHash },
  });

  const sveta = await prisma.user.upsert({
    where: { email: "sveta@example.com" },
    update: {},
    create: { name: "Света", email: "sveta@example.com", passwordHash },
  });

  const listings = [
    {
      title: "Смартфон Xiaomi Redmi Note 13, 128 ГБ",
      description: "Новый, запечатан в заводской плёнке. Официальная гарантия 12 месяцев. Быстрая доставка.",
      price: 89000,
      category: "Электроника",
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Blackview_A60_Smartphone_Android_mobile_phone_and_folio_case.jpg?width=600",
      sellerId: irina.id,
    },
    {
      title: "Игровая приставка PlayStation 5",
      description: "Новая, в заводской упаковке. Официальный гарантийный талон, чек прилагается.",
      price: 320000,
      category: "Электроника",
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Gamecube-controller.jpg?width=600",
      sellerId: sveta.id,
    },
    {
      title: "Велосипед горный Stern Dynamic",
      description: "Новый велосипед в сборе. Рама 19 дюймов, 21 скорость. Гарантия производителя.",
      price: 145000,
      category: "Спорт и отдых",
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Mountain_bike.JPG?width=600",
      sellerId: daniyar.id,
    },
    {
      title: "Палатка туристическая, 4-местная",
      description: "Новая, в упаковке. Полный комплект колышков и растяжек, инструкция внутри.",
      price: 28000,
      category: "Спорт и отдых",
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Camping_tent_grass.jpg?width=600",
      sellerId: daniyar.id,
    },
    {
      title: "Диван-кровать из ИКЕА",
      description: "Новый, в заводской упаковке. Механизм еврокнижка, сборка по инструкции.",
      price: 65000,
      category: "Мебель",
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Couch_of_white.jpg?width=600",
      sellerId: sveta.id,
    },
    {
      title: "Письменный стол из массива дуба",
      description: "Новый стол ручной работы, 120х60 см. Покрытие лаком, гарантия 2 года.",
      price: 42000,
      category: "Мебель",
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Gfp-office-desk-area.jpg?width=600",
      sellerId: daniyar.id,
    },
    {
      title: "Зимняя куртка Uniqlo, размер M",
      description: "Новая, с биркой, оригинал. Тёплый пуховый наполнитель.",
      price: 24000,
      category: "Одежда и обувь",
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/FILA-Daunenjacke.JPG?width=600",
      sellerId: irina.id,
    },
    {
      title: "Кроссовки Nike Air Max, 42 размер",
      description: "Новые, оригинал. В комплекте коробка и чек.",
      price: 32000,
      category: "Одежда и обувь",
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Sneakers.jpg?width=600",
      sellerId: irina.id,
    },
    {
      title: "Комплект книг по программированию",
      description: "Новый комплект, 8 книг: JavaScript, чистый код, алгоритмы. Прямо от издательства.",
      price: 18000,
      category: "Книги",
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Pile_of_books.jpg?width=600",
      sellerId: sveta.id,
    },
    {
      title: "Кофемашина De'Longhi",
      description: "Новая, в заводской упаковке. Официальная гарантия 24 месяца.",
      price: 145000,
      category: "Дом и сад",
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Lelit_Semiautomatic_Espresso_Machine_with_PID_and_Pressure_Gauge.jpg?width=600",
      sellerId: daniyar.id,
    },
    {
      title: "Детская коляска Cybex, 2 в 1",
      description: "Новая, прогулочный блок и люлька в комплекте. Полная заводская гарантия.",
      price: 210000,
      category: "Детские товары",
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Stroller_or_pram%2C_Siver_Cross.JPG?width=600",
      sellerId: irina.id,
    },
    {
      title: "Гитара акустическая Yamaha F310",
      description: "Новая, с чехлом и комплектом струн. Официальный дилер Yamaha.",
      price: 55000,
      category: "Хобби и творчество",
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Yamaha_FG110_Acoustic_Guitar.JPG?width=600",
      sellerId: sveta.id,
    },
  ];

  for (const listing of listings) {
    await prisma.listing.create({ data: listing });
  }

  console.log(`Готово: ${listings.length} объявлений, 3 пользователя.`);
  console.log("Логин для входа: irina@example.com / daniyar@example.com / sveta@example.com, пароль password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
