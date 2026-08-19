import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import styles from "./HeroCategories.module.css";

const IMAGES: Partial<Record<(typeof CATEGORIES)[number], string>> = {
  "Электроника": "https://commons.wikimedia.org/wiki/Special:FilePath/Xiaomi_Redmi_Note_10_Pro.jpg?width=200",
  "Одежда и обувь": "https://commons.wikimedia.org/wiki/Special:FilePath/Nike_Air_Max_Plus_(604133-050).jpg?width=200",
  "Мебель": "https://commons.wikimedia.org/wiki/Special:FilePath/Стол_руководителя.jpg?width=200",
  "Книги": "https://commons.wikimedia.org/wiki/Special:FilePath/The_Art_of_Computer_Programming_(vol._1-4B)-2808.jpg?width=200",
  "Спорт и отдых": "https://commons.wikimedia.org/wiki/Special:FilePath/Instinctiv_gearbox_mountain_bike.jpg?width=200",
  "Детские товары":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Carrito_de_bebé_Vizaro_Pearl_Azul_Denim_Chasis_Blanco_Trío_3_en_1.jpg?width=200",
  "Дом и сад": "https://commons.wikimedia.org/wiki/Special:FilePath/Krups_Vivo_F880_home_espresso_maker.jpg?width=200",
  "Хобби и творчество": "https://commons.wikimedia.org/wiki/Special:FilePath/Yamaha_Acoustic_Guitar_FG-331v2.jpg?width=200",
};

export default function HeroCategories() {
  return (
    <div className={styles.panel}>
      <p className={styles.label}>Категории</p>
      <div className={styles.grid}>
        {CATEGORIES.map((category) => {
          const image = IMAGES[category];
          return (
            <Link
              key={category}
              href={`/?category=${encodeURIComponent(category)}#listings`}
              className={`${styles.tile} ${image ? "" : styles.tileFlat}`}
            >
              {image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt="" className={styles.tileImage} loading="lazy" />
              )}
              <span className={styles.tileShade} />
              <span className={styles.tileLabel}>{category}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
