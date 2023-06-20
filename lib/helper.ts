const isBrowser = typeof window !== "undefined";

const computeTranslation = (
  length: number,
  position: number,
  index: number
): {
  styles: {
    transform: string;
    opacity?: string;
  };
} => {
  const default_width: number = 338.75 + 15;
  // const length = products.length;

  let x = 0;
  let opacity = "0";

  if (length - 2 + position < length) {
    if (length - 2 + position === index) {
      x = -2 * default_width;
    }
  } else if (length - 2 + position >= length) {
    if (length - 2 + position - length === index) {
      x = -2 * default_width;
    }
  }

  if (length - 1 + position < length) {
    if (length - 1 + position === index) {
      x = -1 * default_width;
    }
  } else if (length - 1 + position >= length) {
    if (length - 1 + position - length === index) {
      x = -1 * default_width;
    }
  }

  if (x === 0) {
    if (position >= index) {
      if (position === index) {
        x = Math.abs(index - position) * default_width;
      } else {
        let num = length - 3 - index;

        if (num > 0) {
          x = (length - position + index) * default_width;
        } else {
          x = (length - 3 - index) * default_width;
        }
      }
    } else {
      x = Math.abs(index - position) * default_width;
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
  };
};

export { isBrowser, computeTranslation };
