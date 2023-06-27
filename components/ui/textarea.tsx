import React from "react";
import styles from "@/styles/components/ui/textarea.module.scss";

interface TextareaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  name: string;
  placeholder: string;
}

const Textarea = ({ name, placeholder, ...props }: TextareaProps) => {
  return (
    <textarea
      name={name}
      className={styles["textarea"]}
      placeholder={placeholder}
      {...props}
    ></textarea>
  );
};

export { Textarea };
