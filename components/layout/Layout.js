import Footer from "./Footer";
import Header from "./Header";
import styles from "../../styles/Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className={`${styles.container} all`}>{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
