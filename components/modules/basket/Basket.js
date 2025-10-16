import { getBasket, orderTour } from "@/services/auth";
import React, { useEffect, useState } from "react";
import styles from "./Basket.module.css";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

function Basket({ travellerData }) {
  const [basket, setBasket] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBasket = async () => {
      try {
        const data = await getBasket();
        setBasket(data);
      } catch (err) {
        console.log("خطا در گرفتن سبد:", err);
      }
    };
    fetchBasket();
  }, []);

  const handleOrder = async () => {
    try {
      if (
        !travellerData?.fullName ||
        !travellerData?.nationalCode ||
        !travellerData?.gender ||
        !travellerData?.birthDate
      ) {
        toast.error("لطفاً تمام اطلاعات مسافر را وارد کنید");
        return;
      }

      const res = await orderTour(travellerData);
      console.log(res);
      
      toast.success("خرید با موفقیت ثبت شد ");
      router.push("/profile/personal")
    } catch (err) {
      toast.error(err.response?.data?.message || "خطا در ثبت سفارش ");
    }
  };

  const diffTime = new Date(basket?.endDate) - new Date(basket?.startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h4>{basket?.title}</h4>
        <p>
          {diffDays} روز و {diffDays + 1} شب
        </p>
      </div>
      <div className={styles.bottom}>
        <div className={styles.price}>
          <span>قیمت نهایی</span>
          <p>{basket?.price}</p>
          <span>تومان</span>
        </div>

        <div>
          <button onClick={handleOrder}>ثبت و خرید نهایی</button>
        </div>
      </div>
    </div>
  );
}

export default Basket;
