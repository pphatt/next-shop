import React from "react";
import Link from "next/link";
import styles from "@/styles/components/ui/button.module.scss";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string;
  disabled?: boolean;
  override?: boolean;
  inherit?: boolean;
}

const Button = ({
  className,
  override = false,
  inherit = false,
  ...props
}: ButtonProps) => {
  return (
    <button className={cn(styles.btn, className)} {...props}>
      {props.children}
    </button>
  );
};

export { Button };
