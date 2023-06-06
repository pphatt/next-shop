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

  const [currentSortOption, setCurrentSortOption] = useState("Name: A-Z")
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
          <header>Browse</header>
          <div className={styles["list-figure-wrapper"]}>
            <div className={styles["filter"]}>
              <div className={styles["filter-sort"]}>
                <span className={styles["filter-sort-title"]}>Sort by:</span>
                <div
                  className={styles["filter-box"]}
                  onClick={() => setSortIsOpen(!sortIsOpen)}
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
                      <ul className={styles["filter-options-dropdown"]}>
                        {sortOptions.map((value, index) => (
                          <li key={index} onClick={() => {
                            setCurrentSortOption(value)
                            setSortIsOpen(false)
                          }}>{value}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles["filter-section"]}>
                <div className={styles["title"]}>Company</div>
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

              <div className={styles["filter-section"]}>
                <div className={styles["title"]}>Company</div>
                <ul className={styles["filter-wrapper"]}>
                  {company.map((value, index) => (
                    <li key={index}>
                      <label htmlFor={value}>{value}</label>
                      <input id={value} name={value} type={"checkbox"} />
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
