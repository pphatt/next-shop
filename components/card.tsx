import React from "react";
import styles from "@/styles/components/card.module.scss";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: {
    productName: string;
    price: string;
    image: string;
    hoverImage: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <a className={styles["product"]} href={"/"}>
      <div className={styles["poster-wrapper"]}>
        <div className={styles["poster-container"]}>
          <div className={styles["inner-poster-container"]}>
            <div>
              <picture className={styles["product-image"]}>
                <source media="(min-width:768px)" srcSet={product.image} />
                <img src={product.image} alt="" />
              </picture>
              {product.hoverImage && (
                <picture className={styles["product-image-hover"]}>
                  <source
                    media="(min-width:768px)"
                    srcSet={product.hoverImage}
                  />
                  <img src={product.hoverImage} alt="" />
                </picture>
              )}
            </div>
          </div>
        </div>
      </div>
      <span className={styles["product-information"]}>
        {product.productName}
      </span>
      <span className={styles["product-information"]}>{product.price}₫</span>
    </a>
  );
}
