"use client";
import React from "react";
import styles from "@/styles/shop.module.scss";
import NavigationBar from "@/components/navigation-bar";
import { sixteen } from "@/test/products";
import Footer from "@/components/footer"

const Shop = () => {
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
                {sixteen.map((value, index) => (
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
                              <img
                                src={value.figure.image}
                                alt=""
                              />
                            </picture>
                            {value.figure.hover_image && (
                              <picture className={styles["figure-image-hover"]}>
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
                ))}
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

export default Shop;
