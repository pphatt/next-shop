import React from "react";
import styles from "@/styles/components/ui/navigation-menu.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

const NavigationMenu = ({ children, ...props }: NavigationMenuProps) => {
  return (
    <div className={styles["navigation-menu"]} {...props}>
      {children}
    </div>
  );
};

interface NavigationMenuLinkProps extends React.HTMLAttributes<HTMLDivElement> {
  href: string;
}

const NavigationMenuLink = ({ href, children }: NavigationMenuLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={styles["navigation-menu-link"]}
      style={
        pathname?.endsWith(href)
          ? {
              borderBottom: "2px solid #fafafa",
            }
          : {}
      }
    >
      {children}
    </Link>
  );
};

export { NavigationMenu, NavigationMenuLink };
