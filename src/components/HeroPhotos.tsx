import styles from "./HeroPhotos.module.css";

const PHOTOS = [
  "https://commons.wikimedia.org/wiki/Special:FilePath/Nike_Air_Max_Plus_(604133-050).jpg?width=500",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Yamaha_Acoustic_Guitar_FG-331v2.jpg?width=500",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Krups_Vivo_F880_home_espresso_maker.jpg?width=500",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Xiaomi_Redmi_Note_10_Pro.jpg?width=500",
];

export default function HeroPhotos() {
  return (
    <div className={styles.grid} aria-hidden="true">
      {PHOTOS.map((src) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={src} src={src} alt="" className={styles.photo} loading="lazy" />
      ))}
    </div>
  );
}
