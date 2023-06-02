import styles from "@/styles/index.module.scss";
import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer"

export default function Home() {
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

      <section className={styles["section-1"]}>
        <div className={styles["section-wrapper"]}>
          <div className={styles["inner-section-wrapper"]}>
            <div className={styles["content"]}>
              <div className={styles["content-wrapper"]}>
                <div className={styles["content-header"]}>
                  <div className={styles["content-title"]}>
                    <h2>THIS WEEK&apos;S NEW FIGURE RELEASES</h2>
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

      <Footer />
    </main>
  );
}
