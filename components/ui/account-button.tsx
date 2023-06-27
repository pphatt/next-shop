import React from "react";
import styles from "@/styles/components/ui/account-button.module.scss";

interface AccountButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset" | undefined
}

const AccountButton = ({ children, type, ...props }: AccountButtonProps) => {
  return (
    <button type={type} className={styles["account-button"]} {...props}>
      {children}
    </button>
  );
};

export default AccountButton;
