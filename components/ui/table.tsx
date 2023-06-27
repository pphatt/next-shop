import React from "react";
import styles from "@/styles/components/ui/table.module.scss";

interface TableProps extends React.HTMLAttributes<HTMLElement> {}

const Table = ({ children }: TableProps) => {
  return (
    <section className={styles["table-layout"]}>
      <div className={styles["outer-table-layout"]}>
        <div className={styles["inner-table-layout"]}>
          <table className={styles["table"]}>
            {children}

            {/*      /!*<td colSpan={8}>*!/*/}
            {/*      /!*  <div className="no-product-message">*!/*/}
            {/*      /!*    <svg*!/*/}
            {/*      /!*      xmlns="http://www.w3.org/2000/svg"*!/*/}
            {/*      /!*      width="16"*!/*/}
            {/*      /!*      height="16"*!/*/}
            {/*      /!*      viewBox="0 0 24 24"*!/*/}
            {/*      /!*      fill="none"*!/*/}
            {/*      /!*      stroke="currentColor"*!/*/}
            {/*      /!*      strokeWidth="2"*!/*/}
            {/*      /!*      strokeLinecap="round"*!/*/}
            {/*      /!*      strokeLinejoin="round"*!/*/}
            {/*      /!*    >*!/*/}
            {/*      /!*      <circle cx="12" cy="12" r="10"></circle>*!/*/}
            {/*      /!*      <line x1="12" y1="8" x2="12" y2="12"></line>*!/*/}
            {/*      /!*      <line x1="12" y1="16" x2="12.01" y2="16"></line>*!/*/}
            {/*      /!*    </svg>*!/*/}
            {/*      /!*    <p>No products in database</p>*!/*/}
            {/*      /!*  </div>*!/*/}
            {/*      /!*</td>*!/*/}
            {/*    </tr>*/}
            {/*  ))}*/}
            {/*</tbody>*/}
          </table>
        </div>
      </div>
    </section>
  );
};

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

const TableRow = ({ children, ...props }: TableRowProps) => {
  return <tr {...props}>{children}</tr>;
};

interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableHeaderCellElement> {}

const TableHeader = ({ children }: TableHeaderProps) => {
  return <thead>{children}</thead>;
};

interface TableHeadProps extends React.HTMLAttributes<HTMLTableCellElement> {}

const TableHead = ({ children, ...props }: TableHeadProps) => {
  return <th {...props}>{children}</th>;
};

interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableBody = ({ children, ...props }: TableBodyProps) => {
  return <tbody {...props}>{children}</tbody>;
};

interface TableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {}

const TableCell = ({ children, ...props }: TableCellProps) => {
  return <td {...props}>{children}</td>;
};

export { Table, TableRow, TableHeader, TableHead, TableBody, TableCell };
