import styles from "./HeroPhotos.module.css";

export default function HeroPhotos() {
  return (
    <div className={styles.stage} aria-hidden="true">
      <span className={styles.blob} />
      <span className={styles.ring} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://commons.wikimedia.org/wiki/Special:FilePath/Nike_Air_Max_Plus_(604133-050).jpg?width=600"
        alt=""
        className={styles.mainPhoto}
        loading="lazy"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://commons.wikimedia.org/wiki/Special:FilePath/Yamaha_Acoustic_Guitar_FG-331v2.jpg?width=500"
        alt=""
        className={styles.subPhoto}
        loading="lazy"
      />
      <span className={styles.dot} />
    </div>
  );
}
