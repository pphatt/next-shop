import React, { createContext, useContext, useState } from "react";
import styles from "@/styles/components/ui/account-dropdown.module.scss";

export const SelectContext = createContext<{
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  option: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
}>({
  state: false,
  setState: () => {},
  option: "",
  setOption: () => {},
});

interface AccountDropdownProps extends React.HTMLAttributes<HTMLElement> {}

const Select = ({ children, ...props }: AccountDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState("");

  return (
    <SelectContext.Provider
      value={{ state: isOpen, setState: setIsOpen, option, setOption }}
    >
      <div className={styles["select"]} {...props}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};

interface SelectTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  name: string;
}

const SelectTrigger = ({ name, children, ...props }: SelectTriggerProps) => {
  const { state, setState, option } = useContext(SelectContext);

  return (
    <button
      name={name}
      value={option}
      className={styles["select-trigger"]}
      type={"button"}
      onClick={() => setState(!state)}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 opacity-50"
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
  );
};

interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  placeholder: string;
}

const SelectValue = ({ placeholder, ...props }: SelectValueProps) => {
  const { option } = useContext(SelectContext);

  return <span {...props}>{option === "" ? placeholder : option}</span>;
};

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const SelectContent = ({ children, ...props }: SelectContentProps) => {
  const { state, setState, option, setOption } = useContext(SelectContext);

  if (state) {
    return (
      <>
        <div
          className={styles["backdrop"]}
          onClick={() => setState(false)}
        ></div>
        <div className={styles["select-content"]} {...props}>
          {children}
        </div>
      </>
    );
  }

  return <></>;
};

interface SelectLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const SelectLabel = ({ value, ...props }: SelectLabelProps) => {
  return (
    <div className={styles["select-item"]} data-select={false} {...props}>
      {value}
    </div>
  );
};

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const SelectItem = ({ value, ...props }: SelectItemProps) => {
  const { setState, option, setOption } = useContext(SelectContext);

  return (
    <div
      className={styles["select-item"]}
      data-select={true}
      onClick={() => {
        setOption(value);
        setState(false);
      }}
      {...props}
    >
      {value}
    </div>
  );
};

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectItem,
};
