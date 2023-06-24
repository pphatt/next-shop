"use client"
import React, { useState } from "react"
import styles from "@/styles/components/account-header.module.scss"
import Link from "next/link"
import { Cat } from 'lucide-react';

const AccountHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className={styles["account-header-layout"]}>
      <header className={styles["account-header"]}>
        <div className={styles['navigate-home']}>
          <Link href={"/"}>
            <Cat size={32} />
          </Link>
        </div>

        <h1>Settings</h1>

        <div className={styles["user-menu"]}>
          <div className={styles["user-button"]}>
            <button data-state={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>Tien Phat</button>
          </div>
          {menuOpen && (
            <>
              <div className={styles["backdrop"]} onClick={() => setMenuOpen(false)}></div>
              <div className={styles["menu-dropdown"]}>
                <Link className={styles["menu-dropdown-content"]} href={"/setting"}>Settings</Link>
                <Link className={styles["menu-dropdown-content"]} href={"/setting"}>Support</Link>
                <Link className={styles["menu-dropdown-content"]} href={"/setting"}>FAQ</Link>
                <Link className={styles["menu-dropdown-content"]} href={"/setting"}>Send Feedback</Link>
                <div className={styles["separator"]}></div>
                <Link className={styles["menu-dropdown-content"]} href={"/setting"}>Sign out</Link>
              </div>
            </>
          )}
        </div>
      </header>
    </div>
  )
}

export default AccountHeader