import styles from "./HeroPhotos.module.css";

const PHOTOS = [
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Nike_Air_Max_Plus_(604133-050).jpg?width=300",
    className: styles.p1,
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Yamaha_Acoustic_Guitar_FG-331v2.jpg?width=300",
    className: styles.p2,
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Krups_Vivo_F880_home_espresso_maker.jpg?width=300",
    className: styles.p3,
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Xiaomi_Redmi_Note_10_Pro.jpg?width=300",
    className: styles.p4,
  },
];

export default function HeroPhotos() {
  return (
    <div className={styles.collage} aria-hidden="true">
      <span className={styles.dotLime} />
      <span className={styles.dotAccent} />
      <span className={styles.ring} />
      {PHOTOS.map((photo) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={photo.src} src={photo.src} alt="" className={`${styles.photo} ${photo.className}`} loading="lazy" />
      ))}
    </div>
  );
}
