import styles from "@/styles/WhyTourino.module.css";
import Slider from "../modules/Slider";

function WhyTourino() {
  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <div className={styles.whytourino}>
          <div className={styles.question}>؟</div>
          <img
            src="/question.jpg"
            alt="question_icon"
            className={styles.question_icon}
          />
          <h4>
            {" "}
            چرا <span style={{ color: "#28A745" }}>تورینو </span> ؟{" "}
          </h4>
        </div>
        <div className={styles.slider_text}>
          <div className={styles.question_text}>
            <p>تور طبیعت گردی و تاریخی</p>
            <span>
              اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل
              طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید
              تورهای طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های
              گردشگری و آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای
              فرهنگی و تاریخی را خریداری کنید.
            </span>
          </div>
        </div>
      </div>
      <div className={styles.left}>
        <Slider />
      </div>
    </div>
  );
}

export default WhyTourino;
