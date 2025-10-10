"use client";
import { sendOtp } from "@/services/auth";
import styles from "@/styles/SendOtp.module.css";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { otpSchema } from "@/utils/schema";


function SendOtp({ onOtpSent , onClose}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(otpSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await sendOtp(data.mobile);
      console.log("OTP:", res);
      toast.success(res.message);
      toast.success(res.code);
      if (onOtpSent) onOtpSent(data.mobile);
      reset();
    } catch (err) {
      toast.error("خطادر ارسال کد تایید");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>

      <button onClick={onClose}>X</button>
      <h4>ورود به تورینو</h4>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.mobile}>
        <div className={styles.inputs}>
          <span>شماره موبایل خود را وارد کنید</span>

          <input
            type="text"
            placeholder="3456***0912"
            {...register("mobile")}
          />
        </div>

        <div>
          {errors.mobile && (
            <p className={styles.error}>{errors.mobile.message}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "لطفا صبر کنید..." : "ارسال کد تایید"}
        </button>
      </form>
    </div>
  );
}

export default SendOtp;
