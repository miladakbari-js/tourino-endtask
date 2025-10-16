import toast from "react-hot-toast";
import { putProfile } from "@/services/auth";
import styles from "@/styles/AccountInfo.module.css"
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from "@/utils/schema";

export function AccountInfo({ data, editEmail, setEditEmail }) {
  const [email, setEmail] = useState("");
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(emailSchema),
    mode: "onTouched",
  });

  const emailHandler = async () => {
  if (errors.email || !email) return
    try {
      await putProfile({ email });
      toast.success("ایمیل با موفقیت به‌روزرسانی شد ✅");
      await queryClient.invalidateQueries(["profile"])
      setEditEmail(true);
    } catch (err) {
      toast.error("خطا در به‌روزرسانی اطلاعات ❌");
    }
  };

  return (
    <div className={styles.container}>
      <h4>اطلاعات حساب کاربری</h4>
      <div className={styles.actions_acount}>
        <div className={styles.information}>
          <span>شماره موبایل</span>
          <p>{data?.mobile}</p>
        </div>
        {editEmail ? (
          <div>
            <div className={styles.email_information}>
              <span>ایمیل</span>
              {data.email ? <p>{data.email}</p> : <p>-</p>}
            </div>
            <button
              className={styles.edit_button}
              onClick={() => setEditEmail(false)}
            >
              <img src="/edit.svg" alt="Edit_icon" />
              افزودن
            </button>
          </div>
        ) : (
          <div className={styles.edit_form}>
          <form onSubmit={handleSubmit(emailHandler)}>
            <input
              type="email"
              placeholder="آدرس ایمیل"
              {...register("email")}
              onChange={e=>{
                  setEmail(e.target.value);
                }}
                
            />
            <div className={styles.error_message}>

            {errors.email && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.email.message}
              </p>
            )}
            </div>

              </form>
            <div className={styles.buttons}>
              <button type="submit" className={styles.enter_button} onClick={emailHandler}>
                تایید
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditEmail(true);
                  reset();
                }}
                className={styles.cancel_button}
              >
                انصراف
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
