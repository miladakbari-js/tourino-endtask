import Link from "next/link";
import styles from "../../styles/Header.module.css";
import { useState } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className={`${styles.container} all`}>
      <img className={styles.logo} src="./torino.svg" alt="LogoIcon" />

      <div className={styles.menuItem}>
        <Link href="/">صفحه اصلی</Link>
        <Link href="/">خدمات گردشگری</Link>
        <Link href="/about_us">درباره ما</Link>
        <Link href="/contact_us">تماس با ما</Link>
      </div>

      <Link href="/">
          <img src="./signin.svg" alt="signinIcon" className={styles.signin_button}/>
        <div className={styles.profile}>
          <img src="./profile.svg" alt="ProfileIcon" className={styles.signin}/>
          <p>ورود | ثبت نام</p>
        </div>
      </Link>

      <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/">صفحه اصلی</Link>
          <Link href="/">خدمات گردشگری</Link>
          <Link href="/about_us">درباره ما</Link>
          <Link href="/contact_us">تماس با ما</Link>
        </div>
      )}
    </div>
  );
}

export default Header;
