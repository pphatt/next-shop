import { useMemo } from "react"

const company: string[] = [
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

export { company, sortOptions, sortScaleOptions, sortPriceOptions };
