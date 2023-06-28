"use client";
import React, { useState } from "react";
import AccountHeader from "@/components/account-header";
import styles from "@/styles/account-layout.module.scss";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/account-dropdown";
import { company, sortScaleOptions } from "@/lib/filter-options";
import useSWR from "swr";
import Skeleton from "@/components/ui/skeleton";
import { KeyRound } from "lucide-react";
import AccountButton from "@/components/ui/account-button";
import useSWRInfinite from "swr/infinite";

interface IProduct {
  _id: string;
  name: string;
  price: string;
  manufacturer: string;
  scale: string;
  state: "Active";
}

const PAGE_SIZE = 2;

const Page = () => {
  const routes = [
    { href: "/admin/manage-product", name: "Manage Product" },
    { href: "/admin/add-product", name: "Add Product" },
  ];

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<number[]>([]);
  const [currentPriceOptions, setCurrentPriceOptions] = useState<number[]>([]);
  const [currentScaleOptions, setCurrentScaleOptions] = useState<number[]>([]);

  //@ts-ignore
  // const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // const { data, isLoading } = useSWR<IProduct[]>(
  //   `http://localhost:8000/products?page=${page}&manufacture=${filter.join(
  //     ","
  //   )}&price=${currentPriceOptions.join(",")}&scale=${currentScaleOptions.join(
  //     ","
  //   )}&name=`,
  //   fetcher,
  //   {
  //     // revalidateIfStale: true,
  //     // revalidateOnFocus: true,
  //     // revalidateOnReconnect: true,
  //   }
  // );

  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end

    return `http://localhost:8000/products?page=${pageIndex + 1}`;
  };

  const { data, mutate, size, setSize, isValidating, isLoading } =
    useSWRInfinite(getKey, fetcher);

  const paginatedProducts: IProduct[] = data
    ? data.reduce(
        (previousValue, currentValue) => previousValue.concat(currentValue),
        []
      )
    : [];

  const isLoadingNextPage =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  const isRefreshing = isValidating && data && data.length === size;

  console.log(data);

  return (
    <div className={styles["account-layout"]}>
      <AccountHeader />

      <main className={styles["content-layout"]} style={{ maxWidth: "110rem" }}>
        <div className={styles["inner-content-layout"]}>
          <div
            className={styles["account-navigation-layout"]}
            style={{ maxWidth: "240px" }}
          >
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
              {routes.map(({ href, name }, index) => (
                <NavigationMenuLink key={index} href={href}>
                  {name}
                </NavigationMenuLink>
              ))}
            </NavigationMenu>

            <div className={styles["filter-section"]}>
              <div>
                <input
                  style={{ width: "250px" }}
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
              <TableCaption>
                <AccountButton
                  style={{ borderWidth: "1px" }}
                  onClick={() => setSize(size + 1)}
                >
                  Show more
                </AccountButton>
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <KeyRound width={15} height={15} />
                    ID
                  </TableHead>
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
                {isLoading &&
                  [...Array(10)].map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton
                          width={150}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          width={250}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          width={150}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          width={130}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          width={130}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          width={250}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          width={115}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))}

                {data?.length &&
                  paginatedProducts.map(
                    (
                      { _id, name, manufacturer, price, scale, state },
                      index: number
                    ) => (
                      <TableRow key={index}>
                        <TableCell style={{ maxWidth: "150px" }}>
                          {_id}
                        </TableCell>
                        <TableCell style={{ maxWidth: "250px" }}>
                          {name}
                        </TableCell>
                        <TableCell style={{ maxWidth: "150px" }}>{manufacturer}</TableCell>
                        <TableCell>{price}</TableCell>
                        <TableCell>{scale}</TableCell>
                        <TableCell>Something here is really long</TableCell>
                        <TableCell>{state}</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    )
                  )}

                {(isLoadingNextPage && !isLoading) &&
                  [...Array(4)].map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton
                          width={150}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          width={250}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          width={150}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          width={130}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          width={130}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          width={280}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          width={115}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
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
