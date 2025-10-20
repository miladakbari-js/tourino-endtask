import Head from "next/head";
import { useEffect, useState } from "react";
import { getCookie } from "@/utils/cookie";
import styles from "@/styles/Personal.module.css";
import ProfileDetials from ".";
import MyTours from "./my-tours";
import Transactions from "./transactions";
import { useRouter } from "next/router";
import { withAuth } from "@/utils/withAuth";

function Personal() {
  const [activeTab, setActiveTab] = useState("profile");
  const router = useRouter();

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      router.push("/");
    }
  }, [router]);

  const profileHandler = () => setActiveTab("profile");
  const myToursHandler = () => setActiveTab("myTours");
  const transactionsHandler = () => setActiveTab("transactions");

  return (
    <div className={styles.container}>
      <Head>
        <title>اطلاعات شخصی</title>
        <meta name="description" content="اطلاعات شخصی کاربر تورینو" />
      </Head>
      <div className={styles.right}>
        <ul>
          <li
            onClick={profileHandler}
            className={activeTab === "profile" ? styles.selected : null}
          >
            <img src="/inlineProfile.svg" />
            <p>پروفایل</p>
          </li>

          <li
            onClick={myToursHandler}
            className={activeTab === "myTours" ? styles.selected : null}
          >
            <img src="/sun.svg" />
            <p>تورهای من</p>
          </li>

          <li
            onClick={transactionsHandler}
            className={activeTab === "transactions" ? styles.selected : null}
          >
            <img src="/convert-card.svg" />
            <p>تراکنش‌ها</p>
          </li>
        </ul>
      </div>

      <div className={styles.left}>
        {activeTab === "profile" && <ProfileDetials />}
        {activeTab === "myTours" && <MyTours />}
        {activeTab === "transactions" && <Transactions />}
      </div>
    </div>
  );
}
export const getServerSideProps = withAuth();
export default Personal;


