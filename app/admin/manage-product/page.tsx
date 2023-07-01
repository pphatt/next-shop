"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import AccountHeader from "@/components/account-header";
import styles from "@/styles/account-layout.module.scss";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Table,
  TableAction,
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
import Skeleton from "@/components/ui/skeleton";
import {
  BadgeAlert,
  Delete,
  Edit,
  KeyRound,
  PackageSearch,
} from "lucide-react";
import AccountButton from "@/components/ui/account-button";
import useSWRInfinite from "swr/infinite";
import {
  Dialog,
  DialogBackdrop,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface IProduct {
  message?: string;
  _id: string;
  name: string;
  price: string;
  manufacturer: string;
  scale: string;
  state: "Active";
}

const PAGE_SIZE = 6;

const Page = () => {
  const routes = [
    { href: "/admin/manage-product", name: "Manage Product" },
    { href: "/admin/add-product", name: "Add Product" },
  ];

  const [filter, setFilter] = useState<string>("");
  const [currentPriceOptions, setCurrentPriceOptions] = useState<number[]>([]);
  const [currentScaleOptions, setCurrentScaleOptions] = useState<number[]>([]);

  const [deleteProduct, setDeleteProduct] = useState(false);
  const [productInfo, setProductInfo] = useState({
    status: "closed",
    id: "",
    name: "",
    price: "",
  });

  /*
   * TODO:
   *  - Delete product request is not really good
   *    -> animation should wait until the data is validated
   *    -> how things are implemented here is not really optimized
   *  - product controller server is not really optimized
   * */

  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end

    return `http://localhost:8000/products?page=${
      pageIndex + 1
    }&search=${filter}`;
  };

  const {
    data: product,
    mutate,
    size,
    setSize,
    isValidating,
    isLoading,
  } = useSWRInfinite(getKey, fetcher);

  const paginatedProducts: IProduct[] = product
    ? product.reduce(
        (previousValue, currentValue) => previousValue.concat(currentValue),
        []
      )
    : [];

  const isLoadingNextPage =
    isLoading ||
    (size > 0 && product && typeof product[size - 1] === "undefined");

  const isEmpty = product?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (product && product[product.length - 1]?.length < PAGE_SIZE);

  const isRefreshing = isValidating && product && product.length === size;

  const handleDelete = async (e: any) => {
    e.preventDefault();

    setDeleteProduct(true);

    const data = await fetch("http://localhost:8000/products", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: productInfo.id,
      }),
    });

    if (data.ok) {
      const validating = await mutate();
      setDeleteProduct(false);
      setProductInfo({ ...productInfo, status: "closed" });
    }
  };

  const handleAnimationEnd = useCallback(
    (animationEvent: React.AnimationEvent<HTMLDivElement>) => {
      if (animationEvent.animationName.includes("exit")) {
        setProductInfo({
          status: "closed",
          id: "",
          name: "",
          price: "",
        });
      }
    },
    []
  );

  return (
    <div className={styles["account-layout"]}>
      <AccountHeader />

      {productInfo.id && (
        <>
          <DialogBackdrop
            onClick={() => {
              if (!deleteProduct) {
                setProductInfo({ ...productInfo, status: "closed" });
              }
            }}
          />
          <Dialog
            state={productInfo.status}
            onAnimationEnd={handleAnimationEnd}
          >
            <DialogHeader>
              <DialogTitle>Delete product confirmation</DialogTitle>
              <DialogDescription>
                Delete product. Click delete when you are sure
              </DialogDescription>
            </DialogHeader>

            <DialogContent>
              <div style={{ display: "flex" }}>
                <span style={{ display: "block", width: "53px" }}>ID: </span>
                <span>{productInfo.id}</span>
              </div>
              <div style={{ display: "flex" }}>
                <span style={{ display: "block", width: "53px" }}>Name:</span>
                <span>{productInfo.name}</span>
              </div>
              <div style={{ display: "flex" }}>
                <span style={{ display: "block", width: "53px" }}>Price: </span>
                <span>{productInfo.price}₫</span>
              </div>
            </DialogContent>

            <form
              onSubmit={handleDelete}
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <DialogTrigger disabled={deleteProduct}>
                {deleteProduct && (
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
                    className="mr-2 h-4 w-4 animate-spin"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                  </svg>
                )}
                Delete
              </DialogTrigger>
            </form>
          </Dialog>
        </>
      )}

      <main className={styles["content-layout"]}>
        <div className={styles["inner-content-layout"]}>
          <div
            className={styles["account-navigation-layout"]}
            style={{ flex: "0.2", width: "100%" }}
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
                  onChange={(e) => setFilter(e.target.value)}
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
                  <TableHead>
                    <KeyRound
                      width={15}
                      height={15}
                      style={{ verticalAlign: "middle" }}
                    />
                    <span style={{ marginLeft: "5px" }}>ID</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Manufacturer</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Scale</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead style={{ width: "15%" }}></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading &&
                  [...Array(10)].map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton
                          width={71.844}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          width={172.5}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          width={91.5}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          width={75.906}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          width={76.219}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          width={195.984}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          width={69.578}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Skeleton
                          width={140.219}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}

                {paginatedProducts[0]?.message && (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <BadgeAlert
                          style={{
                            display: "block",
                            verticalAlign: "center",
                          }}
                        />
                        <span>{paginatedProducts[0]?.message}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {product?.length &&
                  !paginatedProducts[0]?.message &&
                  paginatedProducts.map(
                    (
                      { _id, name, manufacturer, price, scale, state },
                      index: number
                    ) => (
                      <TableRow key={index}>
                        <TableCell style={{ maxWidth: "100px" }}>
                          {_id}
                        </TableCell>
                        <TableCell style={{ maxWidth: "200px" }}>
                          {name}
                        </TableCell>
                        <TableCell style={{ maxWidth: "100px" }}>
                          {manufacturer}
                        </TableCell>
                        <TableCell>{price}₫</TableCell>
                        <TableCell>{scale}</TableCell>
                        <TableCell>Something here is really long</TableCell>
                        <TableCell>{state}</TableCell>
                        <TableCell>
                          <TableAction>
                            <Link href={"/"}>
                              <PackageSearch
                                style={{
                                  display: "block",
                                  verticalAlign: "middle",
                                  color: "#fafafa",
                                  textDecoration: "none",
                                }}
                                width={15}
                                height={15}
                              />
                            </Link>
                            <Link href={"/"}>
                              <Edit
                                style={{
                                  display: "block",
                                  verticalAlign: "middle",
                                  color: "#fafafa",
                                  textDecoration: "none",
                                }}
                                width={15}
                                height={15}
                              />
                            </Link>
                            <button
                              type={"button"}
                              onClick={() =>
                                setProductInfo({
                                  status: "open",
                                  id: _id,
                                  name: name,
                                  price: price,
                                })
                              }
                            >
                              <Delete
                                style={{
                                  display: "block",
                                  verticalAlign: "middle",
                                  color: "#fafafa",
                                  textDecoration: "none",
                                }}
                                width={15}
                                height={15}
                              />
                            </button>
                          </TableAction>
                        </TableCell>
                      </TableRow>
                    )
                  )}

                {isLoadingNextPage &&
                  !isLoading &&
                  [...Array(4)].map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton
                          width={71.844}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          width={172.5}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          width={91.5}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          width={75.906}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          width={76.219}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          width={195.984}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Skeleton
                          width={69.578}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
                      <TableCell
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Skeleton
                          width={140.219}
                          height={20}
                          style={{ background: "hsl(240 3.7% 15.9%)" }}
                        />
                      </TableCell>
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
