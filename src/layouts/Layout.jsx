import { Outlet } from "react-router-dom";
import GNB from "./GNB";
import styles from "./Layout.module.css";

function Layout() {
  return (
    <>
      <GNB />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
