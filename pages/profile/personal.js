"use client";
import { useEffect, useState } from "react";
import { getCookie } from "@/utils/cookie";
import styles from "@/styles/Personal.module.css";
import ProfileDetials from ".";
import MyTours from "./my-tours";
import Transactions from "./transactions";
import { useRouter } from "next/router";

function personal() {
  const [profile, setProfile] = useState(true);
  const [myTours, setMyTours] = useState(false);
  const [transactions, setTransactions] = useState(false);
  const router = useRouter()


  useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      router.push("/"); 
    }
  }, [router]);

  const profileHandler = () => {
    setProfile(true);
    setMyTours(false);
    setTransactions(false);
  };

  const myToursHandler = () => {
    setProfile(false);
    setMyTours(true);
    setTransactions(false);
  };

  const transactionsHandler = () => {
    setProfile(false);
    setMyTours(false);
    setTransactions(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <ul>
          <li
            onClick={profileHandler}
            className={profile ? styles.selected : null}
          >
            <img src="/inlineProfile.svg" />
            <p>پروفایل</p>
          </li>

          <li
            onClick={myToursHandler}
            className={myTours ? styles.selected : null}
          >
            <img src="/sun.svg" />
            <p>تورهای من</p>
          </li>

          <li
            onClick={transactionsHandler}
            className={transactions ? styles.selected : null}
          >
            <img src="/convert-card.svg" />
            <p>تراکنش ها</p>
          </li>
        </ul>
      </div>

      {/* --------------------LEFT */}
      <div className={styles.left}>
        {profile ? <ProfileDetials /> : null}
        {myTours ? <MyTours /> : null}
        {transactions ? <Transactions /> : null}
      </div>
    </div>
  );
}

export default personal;
