"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "@/styles/shop.module.scss";
import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";
import ProductCard from "@/components/card";
import useSWR from "swr";
import { b64toBlob } from "@/lib/helper";
import Skeleton from "@/components/ui/skeleton";
import { IProduct } from "@/type/IProduct";
import { DropdownMenu } from "@/components/ui/dropdown";
import Button from "@/components/ui/button";
import { company, sortOptions, sortPriceOptions, sortScaleOptions } from "@/lib/filter-options";

const Page = () => {
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<number[]>([]);
  const [currentPriceOptions, setCurrentPriceOptions] = useState<number[]>([]);
  const [currentScaleOptions, setCurrentScaleOptions] = useState<number[]>([]);

  //@ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/products?page=${page}&manufacture=${filter.join(
      ","
    )}&price=${currentPriceOptions.join(",")}&scale=${currentScaleOptions.join(
      ","
    )}`,
    fetcher,
    {
      // revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const [currentSortOption, setCurrentSortOption] = useState("Name: A-Z");
  const [sortIsOpen, setSortIsOpen] = useState<boolean>(false);

  const handleFilter = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let int = parseInt(event.target.value);

      if (event.target.checked) {
        setFilter([...filter, int]);
      } else {
        const tempFilter = [];

        for (let i = 0; i < filter.length; i++) {
          if (int !== filter[i]) {
            tempFilter.push(filter[i]);
          }
        }

        setFilter(tempFilter);
      }
    },
    [filter]
  );

  const parserImageBlob: IProduct[] = useMemo(() => {
    return data?.map((value: IProduct) => {
      const blob = b64toBlob(value.image, "image/png");
      const blobURL = URL.createObjectURL(blob);
      // console.log(blobURL);

      return {
        ...value,
        image: blobURL,
        hoverImage: blobURL,
      };
    });
  }, [data]);

  // TODO: add query search for both frontend and backend

  return (
    <>
      <div className={styles.home}>
        <NavigationBar />

        <div className={styles["browse-container"]}>
          <div className={styles["sub-nav"]}>
            <a href={"/"}>Figure</a>
          </div>
          <div className={styles["filter-price-and-scale"]}>
            <div className={styles["filter-price-and-scale-wrapper"]}>
              <DropdownMenu
                context={"Price"}
                options={sortPriceOptions}
                checked={currentPriceOptions}
                onCheckedChange={setCurrentPriceOptions}
              />

              <DropdownMenu
                context={"Scale"}
                options={sortScaleOptions}
                checked={currentScaleOptions}
                onCheckedChange={setCurrentScaleOptions}
              />
            </div>
          </div>

          <div className={styles["list-figure-wrapper"]}>
            <div className={styles["filter"]}>
              <div className={styles["filter-sort"]}>
                <span className={styles["filter-sort-title"]}>Sort by:</span>
                <div
                  className={styles["filter-box"]}
                  onClick={() => setSortIsOpen(!sortIsOpen)}
                  style={{ zIndex: "51" }}
                >
                  <div className={styles["filter-box-container"]}>
                    <div className={styles["filter-option-holder"]}>
                      <span>{currentSortOption}</span>
                      <svg
                        viewBox="0 0 10 7"
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                      >
                        <path d="m0 .5 5 5 5-5H0Z"></path>
                      </svg>
                    </div>

                    {sortIsOpen && (
                      <>
                        <div
                          className={styles["back-drop"]}
                          onClick={() => setSortIsOpen(false)}
                        ></div>
                        <ul
                          className={styles["filter-options-dropdown"]}
                          style={{ zIndex: "51" }}
                        >
                          {sortOptions.map((value, index) => (
                            <li
                              key={index}
                              onClick={() => {
                                setCurrentSortOption(value);
                                setSortIsOpen(false);
                              }}
                            >
                              {value}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles["filter-section"]}>
                <div className={styles["title"]}>Manufacturer</div>
                <ul className={styles["filter-wrapper"]}>
                  {company.map((value, index) => (
                    <li key={index}>
                      <label htmlFor={value}>{value}</label>
                      <input
                        checked={filter.includes(index)}
                        value={index}
                        name={value}
                        type={"checkbox"}
                        onChange={(e) => handleFilter(e)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles["figure-list"]}>
              <span>Display {page * 10} of 100 figures</span>
              <div className={styles["divider"]}></div>
              <div className={styles["figure-list-container"]}>
                {isLoading &&
                  [...Array(10)].map((_, index) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                      key={index}
                    >
                      <Skeleton height={329} width={235}></Skeleton>
                      <Skeleton height={40} width={200} style={{marginTop: "5px"}}></Skeleton>
                      <Skeleton height={40} width={100} style={{marginTop: "5px"}}></Skeleton>
                    </div>
                  ))}

                {data?.length > 0 &&
                  parserImageBlob.map(
                    (
                      value: {
                        productName: string;
                        price: string;
                        image: string;
                        hoverImage: string;
                      },
                      index: number
                    ) => <ProductCard product={value} key={index} />
                  )}
              </div>
              <div className={styles["divider"]}></div>
              <div className={styles["pages-container"]}>
                <span>Display 10 of 100 figures</span>
                <div className={styles["pagination"]}></div>
              </div>
            </div>
          </div>

          <Button onClick={() => setPage(page + 1)}>Show more</Button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;
