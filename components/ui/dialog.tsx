import React from "react";
import styles from "@/styles/components/ui/dialog.module.scss";

export const DialogSelect = React.createContext<{
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}>({
  state: "closed",
  setState: () => {},
});

interface DialogProps extends React.HTMLAttributes<HTMLElement> {
  state: string;
}

const Dialog = ({ children, state, ...props }: DialogProps) => {
  React.useEffect(() => {
    if (state === "open") {
      document.querySelector("html")?.setAttribute("style", "overflow: hidden");
    } else {
      document.querySelector("html")?.removeAttribute("style");
    }
  }, [state]);

  return (
    <div className={styles["dialog"]} data-state={state} {...props}>
      {children}
    </div>
  );
};

interface DialogBackdropProps extends React.HTMLAttributes<HTMLElement> {}

const DialogBackdrop = ({ ...props }: DialogBackdropProps) => {
  return <div className={styles["backdrop"]} {...props}></div>;
};

interface DialogTriggerProps extends React.HTMLAttributes<HTMLElement> {}

const DialogTrigger = ({ children, ...props }: DialogTriggerProps) => {
  return (
    <button className={styles["dialog-trigger"]} {...props}>
      {children}
    </button>
  );
};

interface DialogActionTriggerProps extends React.HTMLAttributes<HTMLElement> {}

const DialogActionTrigger = ({
  children,
  ...props
}: DialogActionTriggerProps) => {
  return (
    <button className={styles["dialog-action-trigger"]} {...props}>
      {children}
    </button>
  );
};

interface DialogExitTriggerProps extends React.HTMLAttributes<HTMLElement> {}

const DialogExitTrigger = ({ children, ...props }: DialogExitTriggerProps) => {
  return <button {...props}>{children}</button>;
};

interface DialogHeaderProps extends React.HTMLAttributes<HTMLElement> {}

const DialogHeader = ({ children, ...props }: DialogHeaderProps) => {
  return (
    <div className={styles["dialog-header"]} {...props}>
      {children}
    </div>
  );
};

interface DialogTitleProps extends React.HTMLAttributes<HTMLElement> {}

const DialogTitle = ({ children, ...props }: DialogTitleProps) => {
  return (
    <div className={styles["dialog-title"]} {...props}>
      {children}
    </div>
  );
};

interface DialogDescriptionProps extends React.HTMLAttributes<HTMLElement> {}

const DialogDescription = ({ children, ...props }: DialogDescriptionProps) => {
  return (
    <div className={styles["dialog-description"]} {...props}>
      {children}
    </div>
  );
};

interface DialogContentProps extends React.HTMLAttributes<HTMLElement> {}

const DialogContent = ({ children, ...props }: DialogContentProps) => {
  return (
    <div className={styles["dialog-content"]} {...props}>
      {children}
    </div>
  );
};

export {
  Dialog,
  DialogBackdrop,
  DialogTrigger,
  DialogActionTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogContent,
};
