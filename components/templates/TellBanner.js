import Image from "next/image";
import styles from "../../styles/TellBanner.module.css";

function TellBanner() {
  return (
    <div className={styles.container}>
      <div className={styles.rectangle}>
        <Image src="/telephone.png" width={300} height={249} />
        <div>
          <p>
            خرید تلفنی از <span style={{color:"var(--color-secondary)"}}>تورینو</span>
          </p>
          <span style={{color:"#fff",fontSize:"30px"}} className={styles.text2}>به هرکجا که میخواهید!</span>
        </div>
      </div>
      <div className={styles.telephone}>
        <div>
          <Image src="/call.svg" width={24} height={24} />
          <p>021-1840</p>
        </div>
        <button>اطلاعات بیشتر</button>
      </div>
    </div>
  );
}

export default TellBanner;
