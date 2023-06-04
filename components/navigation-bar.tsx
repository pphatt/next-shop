import React from "react";
import styles from "@/styles/components/navigation-bar.module.scss";
import Link from "next/link";
import Button from "@/components/ui/button";

const NavigationBar = () => {
  return (
    <nav className={styles["navigation-bar"]}>
      <div className={styles["inner-nav"]}>
        <div className={styles["logo"]}>
          <a>⌘</a>
          <span>Japan Figure</span>
        </div>
        <div className={styles["sub-nav"]}>
          <ul>
            <li>
              <Link href={"/browser"}>Browser</Link>
            </li>
            <li>
              <Link href={"/news"}>News</Link>
            </li>
            <li>
              <Link href={"/library"}>Library</Link>
            </li>
            <li>
              <Link href={"/search"}>Search</Link>
            </li>
          </ul>
          <div className={styles["btn-group"]}>
            <div className={styles["cart"]}>
              <Button.Link inherit href={"/"} className={styles.btn}>
                Cart
              </Button.Link>
              <span>0</span>
            </div>
            <div style={{ marginLeft: "5px" }}>
              <Button.Link inherit href={"/"} className={styles.btn}>
                Menu
              </Button.Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
