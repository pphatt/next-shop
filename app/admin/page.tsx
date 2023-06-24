"use client";
import React from "react";
import AccountHeader from "@/components/account-header";
import styles from "@/styles/account-layout.module.scss";
import Link from "next/link";

const Page = () => {
  return (
    <div className={styles["account-layout"]}>
      <AccountHeader />

      <main className={styles["content-layout"]}>
        <div className={styles["inner-content-layout"]}>
          <div className={styles["account-navigation-layout"]}>
            <div className={styles["account-navigation"]}>
              <Link href={"/setting"} data-state={false}>
                Account
              </Link>
              <Link href={"/manage-products"} data-state={true}>
                Manage Products
              </Link>
              <Link href={"/manage-accounts"} data-state={false}>
                Manage Accounts
              </Link>
            </div>
          </div>
          <div className={styles["content-panel"]}>
            <form
              className={styles["add-product-form"]}
              method={"POST"}
              encType={"multipart/form-data"}
            >
              <div className={styles["input-section"]}>
                <label>Product Name</label>
                <input type={"text"} name={"name"} placeholder={"product's name"} />
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
