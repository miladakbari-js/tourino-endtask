import styles from "@/styles/Charter.module.css";
import Image from "next/image";

function Charter() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <Image src="/percentage.png" width={110} height={100} />
        <div>
          <p>بصرفه ترین قیمت</p>
          <span>بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید.</span>
        </div>
      </div>
      <div className={styles.box}>
        <Image src="/message.png" width={110} height={100} />
        <div>
          <p>پشتیبانی</p>
          <span>پشتیبانی و همراهی 24 ساعته در تمامی مراحل سفر شما.</span>
        </div>
      </div>
      <div className={styles.box}>
        <Image src="/heart.png" width={110} height={100} />
        <div>
          <p>رضایت کاربران</p>
          <span>رضایت بیش از 10هزار کاربر از تور های ما. </span>
        </div>
      </div>
    </div>
  );
}

export default Charter;
