import React from "react";
import Link from "next/link";
import styles from "@/styles/components/ui/button.module.scss";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  name?: string;
  disabled?: boolean;
  override?: boolean;
  inherit?: boolean;
}

export default function Button({
  className,
  name,
  override = false,
  inherit = false,
  ...props
}: ButtonProps) {
  if (override) {
    return (
      <button className={className} {...props}>
        {name || props.children}
      </button>
    );
  } else if (inherit) {
    return (
      <button className={`${styles.btn} ${className}`} {...props}>
        {name || props.children}
      </button>
    );
  }

  return (
    <button className={styles.btn} {...props}>
      {name || props.children}
    </button>
  );
}

interface ButtonTagSpanProps extends React.HTMLAttributes<HTMLSpanElement> {
  name?: string;
  disabled?: boolean;
  override?: boolean;
  inherit?: boolean;
}

Button.Span = function ButtonTagSpan({
  className,
  name,
  override = false,
  inherit = false,
  ...props
}: ButtonTagSpanProps) {
  if (override) {
    return (
      <span className={className} {...props}>
        {name || props.children}
      </span>
    );
  } else if (inherit) {
    return (
      <span className={`${styles.btn} ${className}`} {...props}>
        {name || props.children}
      </span>
    );
  }

  return (
    <span className={styles.btn} {...props}>
      {name || props.children}
    </span>
  );
};

interface ButtonTagLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  name?: string;
  disabled?: boolean;
  href: string;
  override?: boolean;
  inherit?: boolean;
}

Button.Link = function ButtonTagNextLink({
  className,
  href,
  name,
  override = false,
  inherit = false,
  ...props
}: ButtonTagLinkProps) {
  if (override) {
    return (
      <Link href={href} className={className} {...props}>
        {name || props.children}
      </Link>
    );
  } else if (inherit) {
    return (
      <Link href={href} className={`${styles.btn} ${className}`} {...props}>
        {name || props.children}
      </Link>
    );
  }

  return (
    <Link href={href} className={styles.btn} {...props}>
      {name || props.children}
    </Link>
  );
};

interface ButtonSkeletonProps extends React.HTMLAttributes<HTMLButtonElement> {}

Button.Skeleton = function ButtonSkeleton({...props}: ButtonSkeletonProps) {
  return <Button {...props} inherit className={styles["button-loading"]} />
};
