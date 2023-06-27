"use client";
import React from "react";
import AccountHeader from "@/components/account-header";
import styles from "@/styles/account-layout.module.scss";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/account-dropdown"
import { company, sortScaleOptions } from "@/lib/filter-options"

const Page = () => {
  const routes = [
    { href: "/admin/manage-product", name: "Manage Product" },
    { href: "/admin/add-product", name: "Add Product" },
  ];

  // //@ts-ignore
  // const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // const { data, error, isLoading } = useSWR(
  //   `http://localhost:8000/products?page=${page}&manufacture=${filter.join(
  //     ","
  //   )}&price=${currentPriceOptions.join(",")}&scale=${currentScaleOptions.join(
  //     ","
  //   )}`,
  //   fetcher,
  //   {
  //     // revalidateIfStale: false,
  //     revalidateOnFocus: false,
  //     revalidateOnReconnect: false,
  //   }
  // );

  return (
    <div className={styles["account-layout"]}>
      <AccountHeader />

      <main className={styles["content-layout"]} style={{maxWidth: "110rem"}}>
        <div className={styles["inner-content-layout"]}>
          <div className={styles["account-navigation-layout"]} style={{maxWidth: "240px"}}>
            <div className={styles["account-navigation"]}>
              <Link href={"/setting"} data-state={false}>
                Account
              </Link>
              <Link href={"/manage-products"} data-state={true}>
                Manage Products
              </Link>
              <Link href={"/manage-accounts"} data-state={false}>
                Manage Accounts
              </Link>
            </div>
          </div>
          <div className={styles["content-panel"]}>
            <NavigationMenu>
              {routes.map(({href , name}, index) => (
                <NavigationMenuLink key={index} href={href}>{name}</NavigationMenuLink>
              ))}
            </NavigationMenu>

            <div className={styles["filter-section"]}>
              <div>
                <input
                  style={{width: "250px"}}
                  type={"text"}
                  name={"name"}
                  placeholder={"Filter name"}
                  required
                />
              </div>
              <div>
                <Select>
                  <SelectTrigger name={"manufacturer"}>
                    <SelectValue placeholder={"Select manufacturer"} />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectLabel value={"Manufacturer"}></SelectLabel>

                    {company.map((value, index) => (
                      <SelectItem key={index} value={value} />
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select>
                  <SelectTrigger name={"scale"}>
                    <SelectValue placeholder={"Select scale"} />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectLabel value={"Scale"}></SelectLabel>

                    {sortScaleOptions.map((value, index) => (
                      <SelectItem key={index} value={value} />
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Manufacturer</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Scale</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(10)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>00001</TableCell>
                    <TableCell>Product A</TableCell>
                    <TableCell>Company A</TableCell>
                    <TableCell>1.600.000</TableCell>
                    <TableCell>1/3</TableCell>
                    <TableCell>Something here is really long</TableCell>
                    <TableCell>Visible</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
