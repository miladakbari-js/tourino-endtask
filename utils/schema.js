import * as yup from "yup";
export const otpSchema = yup.object().shape({
  mobile: yup
    .string()
    .required("شماره موبایل الزامی است")
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
});

export const checkSchema = yup.object().shape({
  mobile: yup
    .string()
    .required("شماره موبایل الزامی است")
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
  code: yup
    .string()
    .required("کد تایید الزامی است")
    .length(6, "کد باید 6 رقم باشد"),
});

export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .required("وارد کردن ایمیل الزامی است")
    .email("ایمیل وارد شده معتبر نیست"),
});

