import Head from "next/head";
import Basket from "@/components/modules/basket/Basket";
import TravellerForm from "@/components/modules/basket/TravellerForm";
import styles from "@/styles/BasketPage.module.css";
import { useEffect, useState } from "react";
import { getCookie } from "@/utils/cookie";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { withAuth } from "@/utils/withAuth";


function BasketPage() {
  const [travellerData, setTravellerData] = useState(null);
  
  const router = useRouter();

  useEffect(()=>{
    const token = getCookie("accessToken");
    
    if (!token) {
    toast.error("لطفاً ابتدا وارد شوید");
    router.replace("/");
  }
  },[])

  return (
    <div className={styles.container}>
      <Head>
        <title>ثبت سبد خرید</title>
        <meta name="description" content="اطلاعات مسافر برای سبد خرید" />
      </Head>
      <div className={styles.right}>
        <TravellerForm setTravellerData={setTravellerData} />
      </div>

      <div className={styles.left}>
        <Basket travellerData={travellerData} />
      </div>
    </div>
  );
}


export const getServerSideProps = withAuth();

export default BasketPage;
