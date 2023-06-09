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
import { sixteen } from "@/test/products";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";

const Page = ({ searchParams }: { searchParams: {} }) => {
  const [filter, setFilter] = useState<string[]>([]);

  const [currentPriceOption, setCurrentPriceOption] = useState<string[]>([]);
  const [sortByPriceIsOpen, setSortByPriceIsOpen] = useState(false);
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

  const [currentScaleOption, setCurrentScaleOption] = useState<string[]>([]);
  const [sortByScaleIsOpen, setSortByScaleIsOpen] = useState(false);
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
  // console.log(filter);
  // router.push();

  const handlePriceFilter = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setCurrentPriceOption([...currentPriceOption, event.target.id]);
      } else {
        const tempFilter = [];

        for (let i = 0; i < currentPriceOption.length; i++) {
          if (event.target.id !== currentPriceOption[i]) {
            tempFilter.push(currentPriceOption[i]);
          }
        }

        setCurrentPriceOption(tempFilter);
      }
    },
    [currentPriceOption]
  );

  const handleScaleFilter = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setCurrentScaleOption([...currentScaleOption, event.target.id]);
      } else {
        const tempFilter = [];

        for (let i = 0; i < currentScaleOption.length; i++) {
          if (event.target.id !== currentScaleOption[i]) {
            tempFilter.push(currentScaleOption[i]);
          }
        }

        setCurrentScaleOption(tempFilter);
      }
    },
    [currentScaleOption]
  );

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

  // useEffect(() => {
  //   // const filterQuery = ""
  // }, [filter])

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

  return (
    <>
      <div className={styles.home}>
        <NavigationBar />

        <div className={styles["browse-container"]}>
          {/*<header>Browse</header>*/}
          <div className={styles["sub-nav"]}>
            <a href={"/"}>Figure</a>
          </div>
          <div className={styles["filter-price-and-scale"]}>
            <div className={styles["filter-price-and-scale-wrapper"]}>
              <div className={styles["filter-sort"]}>
                <span className={styles["filter-sort-title"]}>
                  Sort by Price:
                </span>

                <div
                  className={styles["filter-box"]}
                  onClick={() => setSortByPriceIsOpen(!sortByPriceIsOpen)}
                >
                  <div className={styles["filter-box-container"]}>
                    <div className={styles["filter-option-holder"]}>
                      <span>Price</span>
                      <svg
                        viewBox="0 0 10 7"
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                      >
                        <path d="m0 .5 5 5 5-5H0Z"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {sortByPriceIsOpen && (
                  <>
                    <div
                      className={styles["back-drop"]}
                      onClick={() => setSortByPriceIsOpen(false)}
                    ></div>
                    <div className={styles["filter-p-and-s-dropdown"]}>
                      <ul className={styles["filter-p-and-s-dropdown-wrapper"]}>
                        {sortPriceOptions.map((value, index) => (
                          <li key={index}>
                            <label htmlFor={value}>{value}</label>
                            <input
                              checked={currentPriceOption.includes(value)}
                              id={value}
                              name={value}
                              type={"checkbox"}
                              onChange={(event) => handlePriceFilter(event)}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>

              <div className={styles["filter-sort"]}>
                <span className={styles["filter-sort-title"]}>
                  Sort by Scale:
                </span>

                <div
                  className={styles["filter-box"]}
                  onClick={() => setSortByScaleIsOpen(!sortByScaleIsOpen)}
                >
                  <div className={styles["filter-box-container"]}>
                    <div className={styles["filter-option-holder"]}>
                      <span>Scale</span>
                      <svg
                        viewBox="0 0 10 7"
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                      >
                        <path d="m0 .5 5 5 5-5H0Z"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {sortByScaleIsOpen && (
                  <>
                    <div
                      className={styles["back-drop"]}
                      onClick={() => setSortByScaleIsOpen(false)}
                    ></div>
                    <div className={styles["filter-p-and-s-dropdown"]}>
                      <ul className={styles["filter-p-and-s-dropdown-wrapper"]}>
                        {sortScaleOptions.map((value, index) => (
                          <li key={index}>
                            <label htmlFor={value}>{value}</label>
                            <input
                              checked={currentScaleOption.includes(value)}
                              id={value}
                              name={value}
                              type={"checkbox"}
                              onChange={(event) => handleScaleFilter(event)}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
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
                {sixteen.map((value, index) =>
                  filter.length > 0 ? (
                    filter.includes(value.figure.company) && (
                      <a key={index} className={styles["figure"]} href={"/"}>
                        <div className={styles["poster-wrapper"]}>
                          <div className={styles["poster-container"]}>
                            <div className={styles["inner-poster-container"]}>
                              <div>
                                <picture className={styles["figure-image"]}>
                                  <source
                                    media="(min-width:768px)"
                                    srcSet={value.figure.image}
                                  />
                                  <img src={value.figure.image} alt="" />
                                </picture>
                                {value.figure.hover_image && (
                                  <picture
                                    className={styles["figure-image-hover"]}
                                  >
                                    <source
                                      media="(min-width:768px)"
                                      srcSet={value.figure.hover_image}
                                    />
                                    <img
                                      src={value.figure.hover_image}
                                      alt=""
                                    />
                                  </picture>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <span>{value.figure.name}</span>
                        <span>6,250,000₫</span>
                      </a>
                    )
                  ) : (
                    <a key={index} className={styles["figure"]} href={"/"}>
                      <div className={styles["poster-wrapper"]}>
                        <div className={styles["poster-container"]}>
                          <div className={styles["inner-poster-container"]}>
                            <div>
                              <picture className={styles["figure-image"]}>
                                <source
                                  media="(min-width:768px)"
                                  srcSet={value.figure.image}
                                />
                                <img src={value.figure.image} alt="" />
                              </picture>
                              {value.figure.hover_image && (
                                <picture
                                  className={styles["figure-image-hover"]}
                                >
                                  <source
                                    media="(min-width:768px)"
                                    srcSet={value.figure.hover_image}
                                  />
                                  <img src={value.figure.hover_image} alt="" />
                                </picture>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <span>{value.figure.name}</span>
                      <span>6,250,000₫</span>
                    </a>
                  )
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
