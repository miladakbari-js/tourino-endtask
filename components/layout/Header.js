"use client";
import Link from "next/link";
import styles from "../../styles/Header.module.css";
import Modal from "../ui/Modal";
import SendOtp from "@/pages/auth/send-otp";
import CheckOtp from "@/pages/auth/check-otp";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/services/auth";
import { getCookie } from "@/utils/cookie";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState("send");
  const [mobile, setMobile] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [isClient, setIsClient] = useState(false);

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setDropdownOpen(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (!isClient) return null;

  const handleOtpSent = (mobileNumber) => {
    setMobile(mobileNumber);
    setStep("check");
  };

  const handleClose = () => {
    setShowModal(false);
    setStep("send");
    setMobile("");
  };

  const logoutHandler = () => {
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  };

  return (
    <div className={`${styles.container} all`}>
      <Link href="/">
      <img className={styles.logo} src="./torino.svg" alt="LogoIcon" />
      </Link>

      <div className={styles.menuItem}>
        <Link href="/">صفحه اصلی</Link>
        <Link href="/">خدمات گردشگری</Link>
        <Link href="/about_us">درباره ما</Link>
        <Link href="/contact_us">تماس با ما</Link>
      </div>

      {user ? (
        <div
          className={styles.profileWrapper}
          onClick={(e) => {
            e.stopPropagation();
            setDropdownOpen(!dropdownOpen);
          }}
        >
          <div className={styles.profileLoggedIn}>
            <img
              src="./profile.svg"
              alt="ProfileIcon"
              className={styles.signin}
            />
            <p>{user.mobile}</p>
            <img
              src="./arrow-down.svg"
              alt="arrow"
              className={`${styles.arrowIcon} ${
                dropdownOpen ? styles.arrowUp : ""
              }`}
            />
          </div>

          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              <div className={styles.inlineProfile}>
                <img src="/inlineProfile.svg" alt="inline_pofile Icon" />
                <p className={styles.dropdownItem}>{user.mobile}</p>
              </div>
              <Link href="/profile/personal" className={styles.dropdownItem}>
                <img src="/outlineProfile.svg" alt="outline_pofile Icon" />
                اطلاعات حساب کاربری
              </Link>
              <button className={styles.logoutButton} onClick={logoutHandler}>
                <img src="/logout.svg" alt="logout Icon" />
                خروج از حساب کاربری
              </button>
            </div>
          )}
        </div>
      ) : getCookie("accessToken") ? (
        <p style={{ fontSize: "14px", color: "gray" }}>
          در حال بارگذاری حساب...
        </p>
      ) : (
        <button
          onClick={() => {
            setShowModal(true);
            setStep("send");
          }}
          className={styles.signin_button_wrapper}
        >
          <img
            src="./signin.svg"
            alt="signinIcon"
            className={styles.signin_button}
          />
          <div className={styles.profile}>
            <img
              src="./profile.svg"
              alt="ProfileIcon"
              className={styles.signin}
            />
            <p>ورود | ثبت نام</p>
          </div>
        </button>
      )}

      <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/">صفحه اصلی</Link>
          <Link href="/">خدمات گردشگری</Link>
          <Link href="/about_us">درباره ما</Link>
          <Link href="/contact_us">تماس با ما</Link>
        </div>
      )}

      <Modal isOpen={showModal} onClose={handleClose}>
        {step === "send" ? (
          <SendOtp onOtpSent={handleOtpSent} onClose={handleClose} />
        ) : (
          <CheckOtp
            mobile={mobile}
            onBack={() => setStep("send")}
            setShowModal={setShowModal}
          />
        )}
      </Modal>
    </div>
  );
}

export default Header;
