import Link from "next/link";
import styles from "../../styles/Footer.module.css";

function Footer() {
  return (
    <div className={`${styles.container} all`}>
      <div className={styles.line}></div>
      <div className={styles.footer}>
        <div className={styles.right}>
          <div className={styles.torino}>
            <h4>تورینو</h4>
            <Link href="/about_us">درباره ما</Link>
            <Link href="/contact_us">تماس با ما</Link>
            <Link href="/">چرا تورینو</Link>
            <Link href="/">بیمه مسافرتی</Link>
          </div>
          <div className={styles.customers}>
            <h4>خدمات مشتریان</h4>
            <Link href="/"> پشتیبانی آنلاین</Link>
            <Link href="/">راهنمای خرید</Link>
            <Link href="/">راهنمای استرداد</Link>
            <Link href="/">پرسش و پاسخ</Link>
          </div>
        </div>
        <div className={styles.left}>
          <div className={styles.torino_up}>
            <img src="./torino.svg" />
            <p>تلفن پشتیبانی : 8574-021</p>
          </div>
          <div className={styles.torino_down}>
            <img src="./airline.svg" />
            <img src="./passenger.svg" />
            <img src="./ecunion.svg" />
            <img src="./samandehi.svg" />
            <img src="./aira.svg" />
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>کلیه حقوق این وبسایت متعلق به تورینو می باشد</p>
      </div>
    </div>
  );
}

export default Footer;
