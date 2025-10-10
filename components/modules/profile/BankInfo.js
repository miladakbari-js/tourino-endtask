import toast from "react-hot-toast";
import styles from "@/styles/BankInfo.module.css";
import { putProfile } from "@/services/auth";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function BanklInfo({ data, editBank, setEditBank }) {
  const [shabaCode, setShabaCode] = useState("");
  const [accountIdentifier, setAccountIdentifier] = useState("");
  const [debitCardCode, setDebitCardCode] = useState("");
  const accountIdentifierRegex = /^[0-9]{6,18}$/;
  const shabaRegex = /^IR[0-9]{24}$/;
  const debitCardRegex = /^[0-9]{16}$/;
  const queryClient = useQueryClient();

  const paymentHandler = async () => {
    if (!shabaCode || !accountIdentifier || !debitCardCode) {
      toast.error("تمامی فیلدها کامل نشده اند");
      return;
    }

    if (
      !shabaRegex.test(shabaCode) ||
      !debitCardRegex.test(debitCardCode) ||
      !accountIdentifierRegex.test(accountIdentifier)
    ) {
      return;
    }
    try {
      await putProfile({
        payment: {
          shaba_code: shabaCode,
          debitCard_code: debitCardCode,
          accountIdentifier: accountIdentifier,
        },
      });
      await queryClient.invalidateQueries(["profile"]);
      toast.success("اطلاعات بانکی با موفقیت به‌روزرسانی شد ✅");

      setEditBank(true);
    } catch (err) {
      toast.error("خطا در به‌روزرسانی اطلاعات ❌");
    }
  };

  return (
    <>
      <div className={styles.title}>
        <h4>اطلاعات حساب بانکی</h4>
        <button
          className={styles.edit_button}
          onClick={() => setEditBank(false)}
        >
          <img src="/edit.svg" alt="Edit_icon" />
          ویرایش اطلاعات
        </button>
      </div>

      {editBank ? (
        <div className={styles.bottom}>
          <div className={styles.name}>
            <div>
              <span> شماره شبا </span>
              {data.payment?.shaba_code ? (
                <p>{data.payment.shaba_code}</p>
              ) : (
                <p> - </p>
              )}
            </div>

            <div>
              <span>شماره حساب</span>

              {data.payment?.accountIdentifier ? (
                <p>{data.payment.accountIdentifier}</p>
              ) : (
                <p> - </p>
              )}
            </div>
          </div>

          <div className={styles.melli}>
            <div>
              <span>شماره کارت</span>
              {data.payment?.debitCard_code ? (
                <p>{data.payment.debitCard_code}</p>
              ) : (
                <p> - </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.edit_list}>
          <div className={styles.edit_input}>
            <div  className={styles.inputs}>
              <input
                type="text"
                placeholder="شماره شبا-حتما با IR شروع شود"
                value={shabaCode}
                name="shabaCode"
                onChange={(e) => setShabaCode(e.target.value)}
              />
              {shabaCode && !shabaRegex.test(shabaCode) && (
                <span className={styles.error}>شماره شبا معتبر نیست</span>
              )}
            </div>
            <div className={styles.inputs}>
              <input
                type="text"
                placeholder="شماره کارت"
                value={debitCardCode}
                name="debitCardCode"
                onChange={(e) => setDebitCardCode(e.target.value)}
              />
              {debitCardCode && !debitCardRegex.test(debitCardCode) && (
                <span className={styles.error}>شماره کارت معتبر نیست</span>
              )}
            </div>

            <div className={styles.inputs}>
              <input
                type="text"
                placeholder="شماره حساب"
                value={accountIdentifier}
                name="accountIdentifier"
                onChange={(e) => setAccountIdentifier(e.target.value)}
              />
              {accountIdentifier &&
                !accountIdentifierRegex.test(accountIdentifier) && (
                  <span className={styles.error}>شماره حساب معتبر نیست</span>
                )}
            </div>
          </div>
          <div className={styles.buttons}>
            <button onClick={paymentHandler} className={styles.enter_button}>
              تایید
            </button>
            <button
              onClick={() => setEditBank(true)}
              className={styles.cancel_button}
            >
              انصراف
            </button>
          </div>
        </div>
      )}
    </>
  );
}
