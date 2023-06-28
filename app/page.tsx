"use client";
import styles from "@/styles/index.module.scss";
import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";
import { use, useEffect, useMemo, useState } from "react";
import Carousel from "@/components/carousel";
import useSWR from "swr";
import {b64toBlob} from "@/lib/helper"
import { IProduct } from "@/type/IProduct"

export default function Home() {
  //@ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/products",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const parserImageBlob: IProduct[] = useMemo(() => {
    if (typeof window !== "undefined") {
      return data?.map((value: IProduct) => {
        return {
          ...value,
          image: URL.createObjectURL(b64toBlob(value.image[0], "image/png")),
        };
      });
    }
  }, [data]);

  return (
    <main className={styles.home}>
      <NavigationBar />

      <header className={styles["header"]}>
        <div className={styles["header-container"]}>
          <div className={styles["poster-wrapper"]}>
            <div className={styles["poster"]}></div>
            <div className={styles["colorize"]}></div>
          </div>
          <div className={styles["info-card"]}>
            <div className={styles["info-card-wrapper"]}>
              <h2>
                TRANSPORT YOURSELF TO THE NEWEST FIGURE OF THIS ISEKAI FAVORITE
              </h2>
              <h1>Am I Actually the Strongest?</h1>
              <div>
                <span>Made in Japan</span>
                <a href={"/"}>
                  <span>VIEW MORE INFO</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {isLoading && (
          <Carousel.Skeleton
            length={4}
            line_1={"THIS WEEK&apos;S NEW FIGURE RELEASES"}
            line_2={"Check out our latest and greatest"}
          />
        )}

        {data?.length && (
          <Carousel.Layout
            products={parserImageBlob}
            line_1={"THIS WEEK&apos;S NEW FIGURE RELEASES"}
            line_2={"Check out our latest and greatest"}
          />
        )}
      </div>

      <Footer />
    </main>
  );
}
