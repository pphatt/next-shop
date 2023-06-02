import styles from "@/styles/index.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.home}>
      <nav className={styles["navigation-bar"]}>
        <div className={styles["inner-nav"]}>
          <div className={styles["logo"]}>
            <a>⌘</a>
            <span>Japan Figure</span>
          </div>
          <div className={styles["sub-nav"]}>
            <ul>
              <li>
                <Link href={"/browser"}>Browser</Link>
              </li>
              <li>
                <Link href={"/news"}>News</Link>
              </li>
              <li>
                <Link href={"/library"}>Library</Link>
              </li>
              <li>
                <Link href={"/search"}>Search</Link>
              </li>
            </ul>
            <div className={styles["btn-group"]}>
              <div className={styles["cart"]}>
                <a className={styles.btn}>Cart</a>
                <span>0</span>
              </div>
              <div style={{ marginLeft: "5px" }}>
                <a className={styles.btn}>Menu</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

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

      <section className={styles["section-1"]}>
        <div className={styles["section-wrapper"]}>
          <div className={styles["inner-section-wrapper"]}>
            <div className={styles["content"]}>
              <div className={styles["content-wrapper"]}>
                <div className={styles["content-header"]}>
                  <div className={styles["content-title"]}>
                    <h2>THIS WEEK&rsquoS NEW FIGURE RELEASES</h2>
                    <h1>Check out our latest and greatest</h1>
                  </div>
                  <div className={styles["content-marker"]}>
                    <div className={styles["inner-content-marker"]}>
                      <div style={{ backgroundColor: "black" }}></div>
                      <div></div>
                    </div>
                  </div>
                </div>
                <div className={styles["content-carousel"]}>
                  <div className={styles["carousel"]}>
                    {[...Array(5)].map((_, index) => (
                      <div className={styles["product"]} key={index}>
                        <div className={styles["product-wrapper"]}>
                          <a href={"/"}>
                            <div className={styles["product-image"]}>
                              <div className={styles["product-image-wrapper"]}>
                                <div className={styles["inner-wrapper"]}>
                                  <div className={styles["container-wrapper"]}>
                                    <picture>
                                      <source
                                        media={"(min-width:768px)"}
                                        srcSet={
                                          "https://theme.hstatic.net/1000160337/1000885200/14/home_collection_1_banner.jpg?v=307"
                                        }
                                      />
                                      <img
                                        src="https://theme.hstatic.net/1000160337/1000885200/14/home_collection_1_banner.jpg?v=307"
                                        alt="series cover for Vinland Saga from kodansha"
                                      />
                                    </picture>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className={styles["product-information"]}>
                              <div
                                style={{ height: "50px", maxHeight: "44px" }}
                              >
                                Vinland Saga
                              </div>
                              <div style={{ fontWeight: "500" }}>$30.00</div>
                              <div className={styles["view"]}>
                                <span>View now</span>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles["footer"]}>
        <div className={styles["footer-wrapper"]}>
          <div className={styles["logo-wrapper"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
            </svg>
          </div>
          <div className={styles["description"]}>
            <div className={styles["about"]}>
              <h1>A history of re-imagining the world</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                venenatis dolor eu laoreet ultrices. Cras dictum dolor quis
                augue tempus bibendum. Ut a nisi ac leo auctor ornare. Aenean
                massa mauris, tempor eu dolor id, placerat facilisis erat. Donec
                congue malesuada quam sit amet sollicitudin. Donec risus velit,
                commodo sed libero eget, efficitur varius leo. Aliquam justo
                diam, auctor nec ultricies vel, maximus et risus. In hac
                habitasse platea dictumst. Donec in purus eget justo mattis
                rutrum. Cras metus dolor, viverra vel magna at, interdum
                condimentum mauris.
              </p>
            </div>
            <div className={styles["info"]}>
              <div className={styles["info-1"]}>
                <span>PHONE NUMBER</span>
                <div className={styles["line"]}></div>
                <div className={styles["info-link"]}>
                  <span>09012345678</span>
                </div>
              </div>
              <div className={styles["info-2"]}>
                <span>RESOURCES</span>
                <div className={styles["line"]}></div>
                <div className={styles["info-link"]}>
                  <a href={"/"}>
                    <span>BUYER BENEFIT</span>
                  </a>
                  <a href={"/"}>
                    <span>SUPPORT CENTER</span>
                  </a>
                  <a href={"/"}>
                    <span>TERM OF USE</span>
                  </a>
                  <a href={"/"}>
                    <span>PRIVACY POLICY</span>
                  </a>
                  <a href={"/"}>
                    <span>COPYRIGHT</span>
                  </a>
                </div>
              </div>
              <div className={styles["info-3"]}>
                <span>SOCIAL MEDIA</span>
                <div className={styles["line"]}></div>
                <div className={styles["icon"]}>
                  <a href={"/"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 248 204"
                      className="right-column-instagram-icon-twitter"
                      fill={"white"}
                    >
                      <path d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07a50.338 50.338 0 0 0 22.8-.87C27.8 117.2 10.85 96.5 10.85 72.46v-.64a50.18 50.18 0 0 0 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71a143.333 143.333 0 0 0 104.08 52.76 50.532 50.532 0 0 1 14.61-48.25c20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26a50.69 50.69 0 0 1-22.2 27.93c10.01-1.18 19.79-3.86 29-7.95a102.594 102.594 0 0 1-25.2 26.16z"></path>
                    </svg>
                  </a>
                  <a href={"/"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1000 1000"
                      fill={"white"}
                      width={"17px"}
                      height={"17px"}
                    >
                      <path
                        d="M295.42 6c-53.2 2.51-89.53 11-121.29 23.48-32.87 12.81-60.73 30-88.45 57.82S40.89 143 28.17 175.92c-12.31 31.83-20.65 68.19-23 121.42S2.3 367.68 2.56 503.46 3.42 656.26 6 709.6c2.54 53.19 11 89.51 23.48 121.28 12.83 32.87 30 60.72 57.83 88.45S143 964.09 176 976.83c31.8 12.29 68.17 20.67 121.39 23s70.35 2.87 206.09 2.61 152.83-.86 206.16-3.39S799.1 988 830.88 975.58c32.87-12.86 60.74-30 88.45-57.84s44.77-55.74 57.48-88.68c12.32-31.8 20.69-68.17 23-121.35 2.33-53.37 2.88-70.41 2.62-206.17s-.87-152.78-3.4-206.1-11-89.53-23.47-121.32c-12.85-32.87-30-60.7-57.82-88.45S862 40.87 829.07 28.19c-31.82-12.31-68.17-20.7-121.39-23S637.33 2.3 501.54 2.56 348.75 3.4 295.42 6m5.84 903.88c-48.75-2.12-75.22-10.22-92.86-17-23.36-9-40-19.88-57.58-37.29s-28.38-34.11-37.5-57.42c-6.85-17.64-15.1-44.08-17.38-92.83-2.48-52.69-3-68.51-3.29-202s.22-149.29 2.53-202c2.08-48.71 10.23-75.21 17-92.84 9-23.39 19.84-40 37.29-57.57s34.1-28.39 57.43-37.51c17.62-6.88 44.06-15.06 92.79-17.38 52.73-2.5 68.53-3 202-3.29s149.31.21 202.06 2.53c48.71 2.12 75.22 10.19 92.83 17 23.37 9 40 19.81 57.57 37.29s28.4 34.07 37.52 57.45c6.89 17.57 15.07 44 17.37 92.76 2.51 52.73 3.08 68.54 3.32 202s-.23 149.31-2.54 202c-2.13 48.75-10.21 75.23-17 92.89-9 23.35-19.85 40-37.31 57.56s-34.09 28.38-57.43 37.5c-17.6 6.87-44.07 15.07-92.76 17.39-52.73 2.48-68.53 3-202.05 3.29s-149.27-.25-202-2.53m407.6-674.61a60 60 0 1 0 59.88-60.1 60 60 0 0 0-59.88 60.1M245.77 503c.28 141.8 115.44 256.49 257.21 256.22S759.52 643.8 759.25 502 643.79 245.48 502 245.76 245.5 361.22 245.77 503m90.06-.18a166.67 166.67 0 1 1 167 166.34 166.65 166.65 0 0 1-167-166.34"
                        transform="translate(-2.5 -2.5)"
                      ></path>
                    </svg>
                  </a>
                  <a href={"/"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="white"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={styles["copy-right"]}>
            <span>COPYRIGHT © 2023 VUTIENPHAT PUBLISHING. ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
