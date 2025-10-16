import { putProfile } from "@/services/auth";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import styles from "@/styles/PersonalInfo.module.css";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import moment from "jalali-moment";

export function PersonalInfo({
  data,
  editPersonal,
  setEditPersonal,

}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [error, setError] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      setFirstName(data.firstName || "");
      setLastName(data.lastName || "");
      setGender(data.gender || "");
      setNationalCode(data.nationalCode || "");
      setBirthDate(
        data.birthDate
          ? new Date(moment(data.birthDate, "YYYY-MM-DD").toDate())
          : null
      );
    }
  }, [data]);

  const toJalali = (date) => {
    if (!date) return "-";
    return moment(date, "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD");
  };

  const personalHandler = async () => {
    if (!firstName || !lastName || !gender || !nationalCode || !birthDate) {
      toast.error(" تمامی فیلد ها تکمیل نشده اند");
      return;
    }
    if (nationalCode.length < 10) {
      setError(true);
      return;
    }

    try {
      const birthDateGregorian = birthDate
        ? birthDate.toISOString().split("T")[0]
        : "";

      await putProfile({
        firstName,
        lastName,
        nationalCode,
        birthDate: birthDateGregorian,
        gender,
      });
      toast.success("اطلاعات شخصی با موفقیت به‌روزرسانی شد ✅");
      await queryClient.invalidateQueries(["profile"]);
      setEditPersonal(true);
    } catch (err) {
      toast.error("خطا در به‌روزرسانی اطلاعات ❌");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h4>اطلاعات شخصی</h4>

        <button
          className={styles.edit_button}
          onClick={() => setEditPersonal(false)}
        >
          <img src="/edit.svg" alt="Edit_icon" />
          ویرایش اطلاعات
        </button>
      </div>

      {editPersonal ? (
        <div className={styles.bottom}>
          <div className={styles.name}>
            <div>
              <span>نام</span>
              <p>{data?.firstName || "-"}</p>
            </div>
            <div>
              <span>نام خانوادگی</span>
              <p>{data?.lastName || "-"}</p>
            </div>
            <div>
              <span>جنسیت</span>
              <p>
                {data?.gender ? (data.gender === "male" ? "آقا" : "خانم") : "-"}
              </p>
            </div>
          </div>

          <div className={styles.melli}>
            <div>
              <span>کد ملی</span>
              <p>{data?.nationalCode || "-"}</p>
            </div>
            <div>
              <span>تاریخ تولد</span>
              <p>{toJalali(data?.birthDate)}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.edit_list}>
          <input
            placeholder="نام"
            name="firstName"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />

          <input
            placeholder="نام خانوادگی"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <div className={styles.melli_input}>
            <input
              type="number"
              placeholder="کدملی"
              name="nationalCode"
              value={nationalCode}
              onChange={(e) => setNationalCode(e.target.value)}
            />
            {error ? (
              <span className={styles.error_message}>
                کدملی باید 10 رقم باشد
              </span>
            ) : null}
          </div>

          <div className={styles.datePicker}>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={birthDate}
              onChange={setBirthDate}
              placeholder="تاریخ تولد"
              style={{
                width: "200px",
                height: "35px",
                textAlign: "center",
                borderRadius: "5px",
                border: "1px solid var(--color-text2)",
                fontFamily: "inherit",
              }}
            />
          </div>

          <div className={styles.selectField}>
            <label htmlFor="gender">جنسیت</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">انتخاب کنید</option>
              <option value="male">آقا</option>
              <option value="female">خانم</option>
            </select>
          </div>

          <div className={styles.buttons}>
            <button onClick={personalHandler} className={styles.enter_button}>
              تایید
            </button>
            <button
              onClick={() => setEditPersonal(true)}
              className={styles.cancel_button}
            >
              انصراف
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
