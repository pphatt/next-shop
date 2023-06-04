import React, { useState } from "react";
import styles from "@/styles/components/carousel.module.scss";
import Button from "@/components/ui/button";

const computeTranslation = (
  products: { figure: { name: string; image: string } }[],
  active_index: number,
  index: number
): {
  styles: {
    transform: string;
    opacity?: string;
  };

  figure:
    | {
        name: string;
        image: string;
      }
    | undefined;
} => {
  const default_width: number = 338.75 + 15;
  const length = products.length;

  let x = 0;
  let opacity = "0";

  if (length - 2 + active_index < length) {
    if (length - 2 + active_index === index) {
      x = -2 * default_width;
    }
  } else if (length - 2 + active_index >= length) {
    if (length - 2 + active_index - length === index) {
      x = -2 * default_width;
    }
  }

  if (length - 1 + active_index < length) {
    if (length - 1 + active_index === index) {
      x = -1 * default_width;
    }
  } else if (length - 1 + active_index >= length) {
    if (length - 1 + active_index - length === index) {
      x = -1 * default_width;
    }
  }

  if (x === 0) {
    if (active_index >= index) {
      if (active_index === index) {
        x = Math.abs(index - active_index) * default_width;
      } else {
        let num = length - 3 - index;

        if (num > 0) {
          x = (length - active_index + index) * default_width;
        } else {
          x = (length - 3 - index) * default_width;
        }
      }
    } else {
      x = Math.abs(index - active_index) * default_width;
    }
  }

  if (0 <= x && x <= 1061.25) {
    opacity = "1";
  }

  return {
    styles: {
      transform: `translate(${x}px, 0px)`,
      opacity,
    },
    figure: products.at(index)?.figure,
  };
};

const computeTranslationEnd = (
  products: { figure: { name: string; image: string } }[],
  active_index: number,
  index: number
): {
  styles: {
    transform: string;
    opacity?: string;
  };

  figure:
    | {
    name: string;
    image: string;
  }
    | undefined;
} => {
  const default_width: number = 338.75 + 15;
  const length = products.length;

  let x = 0;
  let opacity = "0";

  if (length - 2 + active_index < length) {
    if (length - 2 + active_index === index) {
      x = -2 * default_width;
    }
  } else if (length - 2 + active_index >= length) {
    if (length - 2 + active_index - length === index) {
      x = -2 * default_width;
    }
  }

  if (length - 1 + active_index < length) {
    if (length - 1 + active_index === index) {
      x = -1 * default_width;
    }
  } else if (length - 1 + active_index >= length) {
    if (length - 1 + active_index - length === index) {
      x = -1 * default_width;
    }
  }

  if (x === 0) {
    if (active_index >= index) {
      if (active_index === index) {
        x = Math.abs(index - active_index) * default_width;
      } else {
        let num = length - 3 - index;

        if (num > 0) {
          x = (length - active_index + index) * default_width;
        } else {
          x = (length - 3 - index) * default_width;
        }
      }
    } else {
      x = Math.abs(index - active_index) * default_width;
    }
  }

  if (0 <= x && x <= 1061.25) {
    opacity = "1";
  }

  return {
    styles: {
      transform: `translate(${x}px, 0px)`,
      opacity,
    },
    figure: products.at(index)?.figure,
  };
};

const CreateCarouselProduct = ({
  products,
  position,
  index,
}: {
  products: { figure: { name: string; image: string } }[];
  position: number;
  index: number;
}) => {
  const item = computeTranslation(products, position, index)

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
                      srcSet={item.figure?.image}
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
              {item.figure?.name}
            </div>
            <div style={{ fontWeight: "500" }}>$30.00</div>
            <div className={styles["view"]}>
              <span>View now</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default function Carousel() {
  return <></>;
}

interface CarouselLayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

Carousel.Layout = function CarouselLayout({ children }: CarouselLayoutProps) {
  return (
    <section className={styles["section"]}>
      <div className={styles["section-wrapper"]}>
        <div className={styles["inner-section-wrapper"]}>
          <div className={styles["content"]}>{children}</div>
        </div>
      </div>
    </section>
  );
};

interface CarouselHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

Carousel.CarouselHeader = function CarouselHeader({
  children,
}: CarouselHeaderProps) {
  return <div className={styles["content-title"]}>{children}</div>;
};

interface CarouselSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  products: { figure: { name: string; image: string } }[];
}

Carousel.CarouselSlider = function CarouselSlider({
  products,
  children,
}: CarouselSliderProps) {
  const [position, setPosition] = useState(0);
  const length = products.length;

  const setPrev = () => {
    setPosition(position - 1 < 0 ? length - 1 : position - 1);
  };

  const setNext = () => {
    setPosition(position + 1 < length ? position + 1 : 0);
  };

  return (
    <>
      <div className={styles["content-header"]}>
        {children}

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
                style={position === index ? { backgroundColor: "black" } : {}}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles["content-carousel"]}>
        <div className={styles["carousel"]}>
          {[...Array(products.length)].map((_, index) => (
            <CreateCarouselProduct
              key={index}
              products={products}
              position={position}
              index={index}
            />
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

interface CarouselSliderEndableProps
  extends React.HTMLAttributes<HTMLDivElement> {
  products: { figure: { name: string; image: string } }[];
}

Carousel.CarouselSliderEndable = function CarouselSliderEndable({
  products,
  children,
}: CarouselSliderEndableProps) {
  const [position, setPosition] = useState(0);
  const length = products.length / 4;

  const setPrev = () => {
    if (position - 1 === -1) {
      return
    }

    setPosition(position - 1);
  };

  const setNext = () => {
    if (position + 1 === length) {
      return
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
        <div className={styles["carousel"]} style={{transform: `translateX(${-position * 1415}px)`, transitionDuration: "300ms"}}>
          {products.map((product, index) => (
            <div key={index} className={styles["product"]} style={{position: "relative"}}>
              <div className={styles["product-wrapper"]}>
                <a href={"/"}>
                  <div className={styles["product-image"]}>
                    <div className={styles["product-image-wrapper"]}>
                      <div className={styles["inner-wrapper"]}>
                        <div className={styles["container-wrapper"]}>
                          <picture>
                            <source
                              media={"(min-width:768px)"}
                              srcSet={product.figure.image}
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
                      {product.figure.name}
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
