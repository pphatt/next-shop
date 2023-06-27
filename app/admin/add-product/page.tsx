"use client";
import React, { useCallback, useContext, useState } from "react";
import AccountHeader from "@/components/account-header";
import styles from "@/styles/account-layout.module.scss";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/account-dropdown";
import { company, sortScaleOptions } from "@/lib/filter-options";
import AccountButton from "@/components/ui/account-button";
import { Textarea } from "@/components/ui/textarea";
import {
  NavigationMenu,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const Page = () => {
  const [pictures, setPictures] = useState<Buffer[]>([]);
  const [error, setError] = useState("");

  const upload = async (e: any) => {
    e.preventDefault();

    const { name, manufacturer, scale, price } = e.target;

    // if (name.value) {
    //
    // }

    const data = await fetch("http://localhost:8000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        price: price.value,
        manufacturer: manufacturer.value,
        scale: scale.value,
        image: pictures,
      }),
    });

    if (data.ok) {
      console.log("Upload successfully");
    } else {
      throw new Error("Upload failed");
    }
  };

  const handleImageUpload = useCallback(async (evt: any) => {
    const length = evt.target.files.length;
    const arr = [];

    for (let i = 0; i < length; i++) {
      const picture = evt.target.files![i];
      const base64 = (await convertToBase64(picture)) as string;

      const bindata = Buffer.from(base64.split(",")[1], "base64");

      arr.push(bindata);
    }

    setPictures(arr);
  }, []);

  function convertToBase64(file: File) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const routes = [
    { href: "/admin/manage-product", name: "Manage Product" },
    { href: "/admin/add-product", name: "Add Product" },
  ];

  return (
    <div className={styles["account-layout"]}>
      <AccountHeader />

      <main className={styles["content-layout"]}>
        <div className={styles["inner-content-layout"]}>
          <div className={styles["account-navigation-layout"]}>
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
            <NavigationMenu style={{width: "640px"}}>
              {routes.map(({href , name}, index) => (
                <NavigationMenuLink key={index} href={href}>{name}</NavigationMenuLink>
              ))}
            </NavigationMenu>

            <form
              style={{paddingTop: "16px"}}
              className={styles["add-product-form"]}
              method={"POST"}
              encType={"multipart/form-data"}
              onSubmit={(event) => upload(event)}
            >
              <div className={styles["input-section"]}>
                <label htmlFor={"name"}>Product Name</label>
                <input
                  type={"text"}
                  name={"name"}
                  id={"name"}
                  placeholder={"Naruto"}
                  required
                />
              </div>

              <div className={styles["input-section"]}>
                <label htmlFor={"name"}>Product Price</label>
                <input
                  type={"text"}
                  name={"price"}
                  placeholder={"100.000₫"}
                  required
                />
              </div>

              <div style={{ display: "flex" }}>
                <div className={styles["input-section"]}>
                  <label>Manufacturer</label>

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

                <div
                  className={styles["input-section"]}
                  style={{ marginBottom: "20px", marginLeft: "30px" }}
                >
                  <label>Scale</label>

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

              <div className={styles["input-section"]}>
                <label htmlFor={"description"}>Description</label>
                <Textarea
                  name={"description"}
                  placeholder={"Description"}
                  id={"description"}
                  style={{ marginTop: "8px" }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <div className={styles["input-section"]}>
                  <label htmlFor={"picture"}>Picture</label>
                  <input
                    name={"picture"}
                    type={"file"}
                    id={"picture"}
                    multiple
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={(e) => handleImageUpload(e)}
                    required
                  />
                </div>

                <AccountButton
                  type={"button"}
                  style={{
                    marginLeft: "30px",
                    borderWidth: "1px",
                    height: "40px",
                  }}
                >
                  View Image
                </AccountButton>
              </div>

              <AccountButton type={"submit"} style={{ borderWidth: "1px" }}>
                Submit
              </AccountButton>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
