import React, { useState } from "react";
import styles from "@/styles/components/carousel.module.scss";
import Button from "@/components/ui/button";
import Image from "next/image";
import { computeTranslation } from "@/lib/helper";
import Skeleton from "@/components/ui/skeleton";

export default function Carousel() {
  return <></>;
}

interface CarouselProductCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  product: { productName: string; image: string; price: string };
  length: number;
  position: number;
  index: number;
}

Carousel.ProductCard = function CarouselProductCard({
  product,
  length,
  position,
  index,
}: CarouselProductCardProps) {
  const item = computeTranslation(length, position, index);

  return (
    <div className={styles["product"]} style={item.styles}>
      <div className={styles["product-wrapper"]}>
        <a href={"/"}>
          <div className={styles["product-image"]}>
            <div className={styles["product-image-wrapper"]}>
              <div className={styles["inner-wrapper"]}>
                <div className={styles["container-wrapper"]}>
                  <picture>
                    <source
                      media={"(min-width:768px)"}
                      srcSet={product.image}
                    />
                    <Image
                      width={600}
                      height={800}
                      src={product.image}
                      alt="series cover for Vinland Saga from kodansha"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>
          <div className={styles["product-information"]}>
            <div style={{ height: "50px", maxHeight: "44px" }}>
              {product.productName}
            </div>
            <div style={{ fontWeight: "500" }}>${product.price}</div>
            <div className={styles["view"]}>
              <span>View now</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

interface CarouselLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  products: { productName: string; image: string; price: string }[];
  line_1: string;
  line_2: string;
}

Carousel.Layout = function CarouselLayout({
  products,
  line_1,
  line_2,
}: CarouselLayoutProps) {
  const [position, setPosition] = useState(0);
  const length = products.length;

  const setPrev = () => {
    setPosition(position - 1 < 0 ? length - 1 : position - 1);
  };

  const setNext = () => {
    setPosition(position + 1 < length ? position + 1 : 0);
  };

  return (
    <section className={styles["section"]}>
      <div className={styles["section-wrapper"]}>
        <div className={styles["inner-section-wrapper"]}>
          <div className={styles["content"]}>
            <div className={styles["content-header"]}>
              <div className={styles["content-title"]}>
                <h2>{line_1}</h2>
                <h1>{line_2}</h1>
              </div>

              <div className={styles["content-marker"]}>
                <div className={styles["inner-content-marker"]}>
                  {[...Array(products.length)].map((_, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        if (index > position + 2 || index < position - 2) {
                          return;
                        }

                        setPosition(index);
                      }}
                      style={
                        position === index ? { backgroundColor: "black" } : {}
                      }
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles["content-carousel"]}>
              <div className={styles["carousel"]}>
                {products.map((value, index) => (
                  <Carousel.ProductCard
                    key={index}
                    product={value}
                    length={length}
                    position={position}
                    index={index}
                  />
                ))}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button onClick={() => setPrev()}>Prev</Button>
              <Button onClick={() => setNext()} style={{ marginLeft: "10px" }}>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface CarouselSliderEndableProps
  extends React.HTMLAttributes<HTMLDivElement> {
  products: { productName: string; image: string; price: string }[];
}

Carousel.CarouselSliderEndable = function CarouselSliderEndable({
  products,
  children,
}: CarouselSliderEndableProps) {
  const [position, setPosition] = useState(0);
  const length = products.length / 4;

  const setPrev = () => {
    if (position - 1 === -1) {
      return;
    }

    setPosition(position - 1);
  };

  const setNext = () => {
    if (position + 1 === length) {
      return;
    }

    setPosition(position + 1);
  };

  return (
    <>
      <div className={styles["content-header"]}>
        {children}

        <div className={styles["content-marker"]}>
          <div className={styles["inner-content-marker"]}>
            {[...Array(products.length / 4)].map((_, index) => (
              <div
                key={index}
                onClick={() => {
                  setPosition(index);
                }}
                style={position === index ? { backgroundColor: "black" } : {}}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles["content-carousel"]}>
        <div
          className={styles["carousel"]}
          style={{
            transform: `translateX(${-position * 1415}px)`,
            transitionDuration: "300ms",
          }}
        >
          {products.map((product, index) => (
            <div
              key={index}
              className={styles["product"]}
              style={{ position: "relative" }}
            >
              <div className={styles["product-wrapper"]}>
                <a href={"/"}>
                  <div className={styles["product-image"]}>
                    <div className={styles["product-image-wrapper"]}>
                      <div className={styles["inner-wrapper"]}>
                        <div className={styles["container-wrapper"]}>
                          <picture>
                            <source
                              media={"(min-width:768px)"}
                              srcSet={product.image}
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
                    <div style={{ height: "50px", maxHeight: "44px" }}>
                      {product.productName}
                    </div>
                    <div style={{ fontWeight: "500" }}>${product.price}</div>
                    <div className={styles["view"]}>
                      <span>View now</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button onClick={() => setPrev()}>Prev</Button>

          <Button onClick={() => setNext()} style={{ marginLeft: "10px" }}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

interface CarouselSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  length: number;
  line_1: string;
  line_2: string;
}

Carousel.Skeleton = function CarouselSkeleton({
  length,
  line_1,
  line_2,
}: CarouselSkeletonProps) {
  return (
    <section className={styles["section"]}>
      <div className={styles["section-wrapper"]}>
        <div className={styles["inner-section-wrapper"]}>
          <div className={styles["content"]}>
            <div className={styles["content-header"]}>
              <div className={styles["content-title"]}>
                <h2>{line_1}</h2>
                <h1>{line_2}</h1>
              </div>

              <div className={styles["content-marker"]}>
                <div className={styles["inner-content-marker"]}>
                  {[...Array(length)].map((_, index) => (
                    <div key={index} className={styles["on-loading"]}></div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles["content-carousel"]}>
              <div className={styles["carousel"]}>
                {[...Array(length)].map((value, index) => (
                  <div
                    className={styles["product"]}
                    key={index}
                    style={{ transform: `translate(${353.75 * index}px, 0px)` }}
                  >
                    <div className={styles["product-wrapper"]}>
                      <a href={"/"}>
                        <Skeleton width={338.75} height={474.45} />

                        <div className={styles["product-information"]}>
                          <Skeleton width={338.75} height={44} />

                          <Skeleton width={338.75} height={0} />

                          <Skeleton
                            width={338.75}
                            height={50}
                            style={{ marginTop: "5px" }}
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button.Skeleton
                style={{ backgroundColor: "#F1F1F1", width: "55px" }}
              />
              <Button.Skeleton
                style={{
                  backgroundColor: "#F1F1F1",
                  width: "55px",
                  marginLeft: "10px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
