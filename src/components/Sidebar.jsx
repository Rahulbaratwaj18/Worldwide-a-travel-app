import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Sidebar.module.css";
import AppNav from "./AppNav";
import Logo from "./Logo";
export default function Sidebar() {
  return <div className={styles.sidebar}>
    <Logo />
    <AppNav />
    <Outlet />
    <footer className={styles.footer}>
        <p className={styles.copyright}> &copy; {new Date().getFullYear()} Worldwide Inc.</p>
    </footer>

  </div>;
}
