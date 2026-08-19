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
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Xiaomi_Redmi_Note_10_Pro.jpg?width=600",
      sellerId: irina.id,
    },
    {
      title: "Игровая приставка PlayStation 5",
      description: "Новая, в заводской упаковке. Официальный гарантийный талон, чек прилагается.",
      price: 320000,
      category: "Электроника",
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/PlayStation_5_and_DualSense_with_transparent_background.png?width=600",
      sellerId: sveta.id,
    },
    {
      title: "Велосипед горный Stern Dynamic",
      description: "Новый велосипед в сборе. Рама 19 дюймов, 21 скорость. Гарантия производителя.",
      price: 145000,
      category: "Спорт и отдых",
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Instinctiv_gearbox_mountain_bike.jpg?width=600",
      sellerId: daniyar.id,
    },
    {
      title: "Палатка туристическая, 4-местная",
      description: "Новая, в упаковке. Полный комплект колышков и растяжек, инструкция внутри.",
      price: 28000,
      category: "Спорт и отдых",
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Coleman_Pop-Up_Tent.jpg?width=600",
      sellerId: daniyar.id,
    },
    {
      title: "Диван-кровать из ИКЕА",
      description: "Новый, в заводской упаковке. Механизм еврокнижка, сборка по инструкции.",
      price: 65000,
      category: "Мебель",
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Sofa_bed_at_Ashley_HomeStore_-_December_2022_-_Sarah_Stierch.jpg?width=600",
      sellerId: sveta.id,
    },
    {
      title: "Письменный стол из массива дуба",
      description: "Новый стол ручной работы, 120х60 см. Покрытие лаком, гарантия 2 года.",
      price: 42000,
      category: "Мебель",
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Стол_руководителя.jpg?width=600",
      sellerId: daniyar.id,
    },
    {
      title: "Зимняя куртка Uniqlo, размер M",
      description: "Новая, с биркой, оригинал. Тёплый пуховый наполнитель.",
      price: 24000,
      category: "Одежда и обувь",
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Adidas_Helionic_Down_Jacket.jpg?width=600",
      sellerId: irina.id,
    },
    {
      title: "Кроссовки Nike Air Max, 42 размер",
      description: "Новые, оригинал. В комплекте коробка и чек.",
      price: 32000,
      category: "Одежда и обувь",
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Nike_Air_Max_Plus_(604133-050).jpg?width=600",
      sellerId: irina.id,
    },
    {
      title: "Комплект книг по программированию",
      description: "Новый комплект, 8 книг: JavaScript, чистый код, алгоритмы. Прямо от издательства.",
      price: 18000,
      category: "Книги",
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/The_Art_of_Computer_Programming_(vol._1-4B)-2808.jpg?width=600",
      sellerId: sveta.id,
    },
    {
      title: "Кофемашина De'Longhi",
      description: "Новая, в заводской упаковке. Официальная гарантия 24 месяца.",
      price: 145000,
      category: "Дом и сад",
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Krups_Vivo_F880_home_espresso_maker.jpg?width=600",
      sellerId: daniyar.id,
    },
    {
      title: "Детская коляска Cybex, 2 в 1",
      description: "Новая, прогулочный блок и люлька в комплекте. Полная заводская гарантия.",
      price: 210000,
      category: "Детские товары",
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Carrito_de_bebé_Vizaro_Pearl_Azul_Denim_Chasis_Blanco_Trío_3_en_1.jpg?width=600",
      sellerId: irina.id,
    },
    {
      title: "Гитара акустическая Yamaha F310",
      description: "Новая, с чехлом и комплектом струн. Официальный дилер Yamaha.",
      price: 55000,
      category: "Хобби и творчество",
      imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Yamaha_Acoustic_Guitar_FG-331v2.jpg?width=600",
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
