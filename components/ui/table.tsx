import React from "react";
import styles from "@/styles/components/ui/table.module.scss";

interface TableProps extends React.HTMLAttributes<HTMLElement> {}

const Table = ({ children }: TableProps) => {
  return (
    <section className={styles["table-layout"]}>
      <div className={styles["outer-table-layout"]}>
        <div className={styles["inner-table-layout"]}>
          <table className={styles["table"]}>{children}</table>
        </div>
      </div>
    </section>
  );
};

interface TableCaptionProps extends React.HTMLAttributes<HTMLElement> {}

const TableCaption = ({ children, ...props }: TableCaptionProps) => {
  return (
    <caption className={styles["table-caption"]} {...props}>
      {children}
    </caption>
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

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

const TableCell = ({ children, ...props }: TableCellProps) => {
  return <td {...props}>{children}</td>;
};

interface TableActionProps extends React.HTMLAttributes<HTMLDivElement> {}

const TableAction = ({ children, ...props }: TableActionProps) => {
  return (
    <div {...props} className={styles["view"]}>
      {children}
    </div>
  );
};

export {
  Table,
  TableCaption,
  TableRow,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableAction,
};
