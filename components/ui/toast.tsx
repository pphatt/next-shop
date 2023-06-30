import React from "react"
import styles from "@/styles/components/ui/toast.module.scss"

interface ToastProps extends React.HTMLAttributes<HTMLElement>{
  state: string
}

const Toast = ({children, state, ...props}: ToastProps) => {
  return (
    <div className={styles["toast"]}>
      <div className={styles["inner-toast"]} data-state={state} {...props}>
        {children}
      </div>
    </div>
  )
}

interface ToastContentProps extends React.HTMLAttributes<HTMLElement>{}

const ToastContent = ({children}: ToastContentProps) => {
  return (
    <div className={styles["toast-content"]}>
      {children}
    </div>
  )
}

interface ToastHeaderProps extends React.HTMLAttributes<HTMLElement>{}

const ToastHeader = ({children}: ToastHeaderProps) => {
  return (
    <div className={styles["toast-header"]}>{children}</div>
  )
}

interface ToastTextProps extends React.HTMLAttributes<HTMLElement>{}

const ToastText = ({children}: ToastTextProps) => {
  return (
    <div className={styles["toast-text"]}>{children}</div>
  )
}

interface ToastExitProps extends React.HTMLAttributes<HTMLElement>{}

const ToastExit = ({...props}: ToastExitProps) => {
  return (
    <button className={styles["exit"]} {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <line x1="18" x2="6" y1="6" y2="18"></line>
        <line x1="6" x2="18" y1="6" y2="18"></line>
      </svg>
    </button>
  )
}

interface ToastActionProps extends React.HTMLAttributes<HTMLElement>{}

const ToastAction = ({children, ...props}: ToastActionProps) => {
  return (
    <button className={styles["toast-action"]} {...props}>{children}</button>
  )
}

export { Toast, ToastContent, ToastText, ToastHeader, ToastExit, ToastAction };