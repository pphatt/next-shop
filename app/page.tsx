"use client";
import styles from "@/styles/index.module.scss";
import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";
import Carousel from "@/components/carousel"
import { products, sixteen } from "@/test/products";

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

      <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
        <Carousel.Layout>
          <Carousel.CarouselSlider products={products}>
            <Carousel.CarouselHeader>
              <h2>THIS WEEK&apos;S NEW FIGURE RELEASES</h2>
              <h1>Check out our latest and greatest</h1>
            </Carousel.CarouselHeader>
          </Carousel.CarouselSlider>
        </Carousel.Layout>

        <Carousel.Layout>
          <Carousel.CarouselSlider products={products}>
            <Carousel.CarouselHeader>
              <h2>THIS WEEK&apos;S NEW FIGURE RELEASES</h2>
              <h1>Check out our latest and greatest</h1>
            </Carousel.CarouselHeader>
          </Carousel.CarouselSlider>
        </Carousel.Layout>

        <Carousel.Layout>
          <Carousel.CarouselSliderEndable products={sixteen}>
            <Carousel.CarouselHeader>
              <h2>THIS WEEK&apos;S NEW FIGURE RELEASES</h2>
              <h1>Check out our latest and greatest</h1>
            </Carousel.CarouselHeader>
          </Carousel.CarouselSliderEndable>
        </Carousel.Layout>
      </div>

      <Footer />
    </main>
  );
}
