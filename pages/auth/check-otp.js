"use client";
import { checkOtp } from "@/services/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkSchema } from "@/utils/schema";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import styles from "@/styles/CheckOtp.module.css";
import { setCookie } from "@/utils/cookie";
import { useQueryClient } from "@tanstack/react-query";

function CheckOtp({ mobile, onBack, setShowModal }) {
  const [timeLeft, setTimeLeft] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const inputsRef = useRef([]);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(checkSchema),
    defaultValues: { code: "", mobile: mobile || "" },
  });

  const otpValue = watch("code");

  useEffect(() => {
    setValue("mobile", mobile);
  }, [mobile, setValue]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleResendCode = () => {
    setTimeLeft(120);
    setCanResend(false);
    toast.success("کد جدید ارسال شد 📩");
  };

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");
    const otpArray = otpValue.split("");
    otpArray[index] = value;
    const newOtp = otpArray.join("").slice(0, 6);
    setValue("code", newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValue[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const renderInputs = () => {
    const otpArray = otpValue.split("");
    return Array(6)
      .fill(0)
      .map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          inputMode="numeric"
          className={styles.otpInput}
          value={otpArray[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputsRef.current[index] = el)}
        />
      ));
  };

  const onSubmit = async (data) => {
    try {
      const res = await checkOtp(data.mobile, data.code);
      console.log("checkOtp response:", res);
      setCookie(res);

      await queryClient.invalidateQueries(["profile"]);
      toast.success("ورود موفق - به تورینو خوش آمدید 🎉");
      queryClient.invalidateQueries(["profile"]);
      setShowModal(false);
      reset();
    } catch (err) {
      toast.error("کد تایید اشتباه است ❌");
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <div className={styles.head}>
        <h4>کد تایید را وارد کنید</h4>
        <button onClick={onBack}>
          <img src="/back.svg" alt="back" />
        </button>
      </div>

      <p>کد تایید به شماره {mobile} ارسال شد</p>

      <div className={styles.otpContainer}>{renderInputs()}</div>

      {errors.code && <p className={styles.error}>{errors.code.message}</p>}

      <div className={styles.timerBox}>
        {canResend ? (
          <button
            type="button"
            className={styles.resendBtn}
            onClick={handleResendCode}
          >
            ارسال مجدد کد
          </button>
        ) : (
          <p className={styles.timerText}>
            {formatTime(timeLeft)} تا ارسال مجدد کد
          </p>
        )}
      </div>

      <input type="hidden" {...register("code")} />
      <input type="hidden" {...register("mobile")} />

      <button
        type="submit"
        disabled={isSubmitting}
        className={styles.submiBtutton}
      >
        {isSubmitting ? "در حال بررسی..." : "ورود به تورینو"}
      </button>
    </form>
  );
}

export default CheckOtp;
