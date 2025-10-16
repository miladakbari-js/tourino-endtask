import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import moment from "jalali-moment";
import { useEffect, useState } from "react";
import styles from "./TravellerForm.module.css";

function TravellerForm({ setTravellerData }) {
  const [formData, setFormData] = useState({
    fullName: "",
    nationalCode: "",
    birthDate: "",
    gender: "",
  });

  useEffect(() => {
    setTravellerData(formData);
  }, [formData]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <img src="./inlineProfile.svg" />
        <p> مشخصات مسافر</p>
      </div>
      <form>
        <input
          placeholder="نام و نام خانوادگی"
          name="fullName"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
        />

        <input
          name="nationalCode"
          value={formData.nationalCode}
          onChange={(e) =>
            setFormData({ ...formData, nationalCode: e.target.value })
          }
          placeholder="کد ملی"
        />

        <div className={styles.date}>
          <DatePicker
          className={styles.datePicker}
            calendar={persian}
            locale={persian_fa}
            onChange={(date) => {
              const formatted = moment(date?.toDate())
                .locale("fa")
                .format("YYYY-MM-DD");
              setFormData({ ...formData, birthDate: formatted });
            }}
            placeholder="تاریخ تولد"
            style={{
              width: "240px",
              height: "50px",
              textAlign: "center",
              borderRadius: "5px",
              border: "1px solid #9e9e9e",
              fontFamily: "inherit",
              paddingRight: "35px",
            }}
          />

          <img
            src="/calendar.svg"
            alt="calendar"
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "20px",
              height: "20px",
              pointerEvents: "none",
              opacity: 0.7,
            }}
          />
        </div>

        <select
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        >
          <option value=""> جنسیت</option>
          <option value="male">آقا</option>
          <option value="female">خانم</option>
        </select>
      </form>
    </div>
  );
}

export default TravellerForm;
