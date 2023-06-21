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
import { useRouter, useSearchParams, usePathname } from "next/navigation";

// urlQuery = "http://localhost:3000/shop?page=1&manufacture=1,2,3,4,5&price=1,2,3,4,5&scale=1,2,3,4,5"

const Page = ({
  searchParams,
}: {
  searchParams: { page: string; manufacture: string; p: string; scale: string };
}) => {
  // const parserQuery = searchParams

  //@ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/products?manufacture=${searchParams.manufacture}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const [filter, setFilter] = useState<string[]>([]);

  const [currentPriceOptions, setCurrentPriceOptions] = useState<string[]>([]);
  const sortPriceOptions: string[] = useMemo(
    () => [
      "Under 1.000.000₫",
      "1.000.000₫ - 2.000.000₫",
      "2.000.000₫ - 3.000.000₫",
      "3.000.000₫ - 4.000.000₫",
      "Above 4.000.000₫",
    ],
    []
  );

  const [currentScaleOptions, setCurrentScaleOptions] = useState<string[]>([]);
  const sortScaleOptions: string[] = useMemo(
    () => [
      "1/12",
      "1/10",
      "1/8",
      "1/7",
      "1/6",
      "1/5",
      "1/4",
      "1/3",
      "none-scale",
    ],
    []
  );

  const [currentSortOption, setCurrentSortOption] = useState("Name: A-Z");
  const [sortIsOpen, setSortIsOpen] = useState<boolean>(false);
  const sortOptions = useMemo(
    () => [
      "Name: A-Z",
      "Name: Z-A",
      "Price: Decreased",
      "Price: Increased",
      "Newest",
      "Oldest",
    ],
    []
  );

  const router = useRouter();

  const handleFilter = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setFilter([...filter, event.target.id]);
      } else {
        const tempFilter = [];

        for (let i = 0; i < filter.length; i++) {
          if (event.target.id !== filter[i]) {
            tempFilter.push(filter[i]);
          }
        }

        setFilter(tempFilter);
      }
    },
    [filter]
  );

  // console.log("Filter:")
  // console.log(filter)
  //
  // console.log("Price:")
  // console.log(currentPriceOptions)
  //
  // console.log("Scale:")
  // console.log(currentScaleOptions)

  const company = [
    "Good Smile Company",
    "Kotobukiya",
    "Max Factory",
    "FREEing",
    "MegaHouse",
    "Bandai Spirit",
    "Phat Company",
    "Kadokawa",
  ];

  const parserImageBlob: IProduct[] = useMemo(() => {
    return data?.map((value: IProduct) => {
      const blob = b64toBlob(value.image, "image/png");
      const blobURL = URL.createObjectURL(blob);
      console.log(blobURL);

      return {
        ...value,
        image: blobURL,
        hoverImage: blobURL,
      };
    });
  }, [data]);

  const { push, replace } = useRouter();
  const pathName = usePathname();
  // const basedQuery = useSearchParams()
  // console.log(searchParams)
  // let query = ""

  // TODO: add query search for both frontend and backend

  // const buttonHandler = () => push(`${pathName}?`);

  useEffect(() => {
    let manufacture: number[] = [];

    for (let i = 0; i < filter.length; i++) {
      let index = company.indexOf(filter[i])

      if (index !== -1) {
        manufacture.push(index + 1)
      }
    }

    console.log(manufacture)

    let queryManufacture = "manufacture=" + manufacture.join(",")

    push(`${pathName}?${queryManufacture}`);
  }, [filter, currentPriceOptions, currentScaleOptions])

  // const queryReplacer = useCallback(() => {
  //   let manufacture: string[] = [];
  //
  //   for (let i = 0; i < filter.length; i++) {
  //     let intToString = parseInt(filter[i])
  //
  //     if (0 < intToString && intToString <= company.length) {
  //       manufacture.push(filter[i])
  //     }
  //   }
  //
  //   let queryManufacture = "manufacture=" + manufacture.join(",")
  //
  //   push(`${pathName}?${queryManufacture}`);
  // }, [filter, currentPriceOptions, currentScaleOptions]);

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
                        checked={filter.includes(value)}
                        id={value}
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
              <span>Display 10 of 100 figures</span>
              <div className={styles["divider"]}></div>
              <div className={styles["figure-list-container"]}>
                {isLoading &&
                  [...Array(8)].map((_, index) => (
                    <Skeleton height={329} width={235} key={index}></Skeleton>
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
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;
