import React, { useState } from "react";
import styles from "@/styles/shop.module.scss";

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  options: string[];
  context: string;
  checked: string[];
  onCheckedChange: React.Dispatch<React.SetStateAction<string[]>>;
}

/*
* <DropdownMenu>
    <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>
      *
      </DropdownMenuItem>
    </DropdownMenuContent>
* </DropdownMenu>
*
* */

export const DropdownMenu = ({
  options,
  checked,
  onCheckedChange,
  context,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles["filter-sort"]}>
      <span className={styles["filter-sort-title"]}>Sort by {context}:</span>
      <div
        className={styles["filter-box"]}
        onClick={() => setIsOpen(!isOpen)}
        style={isOpen ? { zIndex: "51" } : {}}
      >
        <div className={styles["filter-box-container"]}>
          <div className={styles["filter-option-holder"]}>
            <span>{context}</span>
            <svg
              viewBox="0 0 10 7"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
            >
              <path d="m0 .5 5 5 5-5H0Z"></path>
            </svg>
          </div>
        </div>
      </div>

      {isOpen && (
        <>
          <div
            className={styles["back-drop"]}
            onClick={() => setIsOpen(false)}
          ></div>
          <div className={styles["filter-p-and-s-dropdown"]}>
            <ul className={styles["filter-p-and-s-dropdown-wrapper"]}>
              {options.map((option, index) => (
                <li key={index}>
                  <label htmlFor={option}>{option}</label>

                  <input
                    checked={checked.includes(option)}
                    id={option}
                    name={option}
                    type={"checkbox"}
                    onChange={(event) => {
                      if (checked.includes(option)) {
                        let temp = [];

                        for (let i = 0; i < checked.length; i++) {
                          if (checked[i] !== option) {
                            temp.push(checked[i]);
                          }
                        }

                        onCheckedChange(temp);
                      } else {
                        onCheckedChange([...checked, option]);
                      }
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};