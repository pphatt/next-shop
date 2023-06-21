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
  searchParams: {
    page: string;
    manufacture: string;
    price: string;
    scale: string;
  };
}) => {
  // const parserQuery = searchParams

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

  const { push } = useRouter();
  const pathName = usePathname();

  const [filter, setFilter] = useState<number[]>([]);
  const [currentPriceOptions, setCurrentPriceOptions] = useState<number[]>([]);
  const [currentScaleOptions, setCurrentScaleOptions] = useState<number[]>([]);

  const sanitizedQuery = useCallback((query: string[], length: number) => {
    const returnedArray: number[] = [];

    for (let i = 0; i < query.length; i++) {
      let index = parseInt(query[i]);

      if (0 < index && index <= length) {
        returnedArray.push(index);
      }
    }

    return returnedArray;
  }, []);

  const compareEqual = useCallback((arr_1: number[], arr_2: number[]) => {
    if (arr_1.length !== arr_2.length) {
      return false;
    }

    for (let i = 0; i < arr_1.length; i++) {
      if (arr_1[i] !== arr_2[i]) {
        return false;
      }
    }

    return true;
  }, []);

  useEffect(() => {
    let manufacture = "manufacture=";
    let price = "price=";
    let scale = "scale=";

    const manufactureQuery = sanitizedQuery(
      searchParams.manufacture.split(","),
      company.length
    ).sort((a, b) => a - b);

    const compareManufacture = compareEqual(manufactureQuery, filter);

    if (!compareManufacture) {
      const arr = filter.sort((a, b) => a - b);

      manufacture += arr.join(",");

      setFilter(arr);
    } else {
      manufacture += manufactureQuery.join(",");
    }

    const priceQuery = sanitizedQuery(
      searchParams.price.split(","),
      company.length
    ).sort((a, b) => a - b);

    const comparePrice = compareEqual(priceQuery, filter);

    if (!comparePrice) {
      const arr = currentPriceOptions.sort((a, b) => a - b);

      price += arr.join(",");

      setFilter(arr);
    } else {
      price += priceQuery.join(",");
    }

    const scaleQuery = sanitizedQuery(
      searchParams.scale.split(","),
      company.length
    ).sort((a, b) => a - b);

    const compareScale = compareEqual(scaleQuery, filter);

    if (!compareScale) {
      const arr = currentScaleOptions.sort((a, b) => a - b);

      scale += arr.join(",");

      setFilter(arr);
    } else {
      price += scaleQuery.join(",");
    }

    push(`${pathName}?${manufacture}&${price}&${scale}`);
  }, [filter, currentPriceOptions, currentScaleOptions]);

  useEffect(() => {
    let manufacture = "manufacture=";
    let price = "price=";
    let scale = "scale=";

    if (searchParams.manufacture) {
      const manufactureQuery = sanitizedQuery(
        searchParams.manufacture.split(","),
        company.length
      ).sort((a, b) => a - b);

      const manufactureArr = manufactureQuery.filter(
        (value, index, array) => array.indexOf(value) === index
      );

      manufacture += manufactureArr.join(",");

      setFilter(manufactureArr);
    }

    if (searchParams.price) {
      const priceQuery = sanitizedQuery(
        searchParams.price.split(","),
        company.length
      ).sort((a, b) => a - b);

      const priceArr = priceQuery.filter(
        (value, index, array) => array.indexOf(value) === index
      );

      price += priceArr.join(",");

      setCurrentPriceOptions(priceArr);
    }

    if (searchParams.scale) {
      const scaleQuery = sanitizedQuery(
        searchParams.scale.split(","),
        company.length
      ).sort((a, b) => a - b);

      const scaleArr = scaleQuery.filter(
        (value, index, array) => array.indexOf(value) === index
      );

      manufacture += scaleArr.join(",");

      setCurrentScaleOptions(scaleArr);
    }

    push(`${pathName}?${manufacture}&${price}&${scale}`);
  }, []);

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

  const [currentSortOption, setCurrentSortOption] = useState("Name: A-Z");
  const [sortIsOpen, setSortIsOpen] = useState<boolean>(false);

  const router = useRouter();

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
