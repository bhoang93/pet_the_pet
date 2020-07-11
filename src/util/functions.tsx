export const randomRange = (min: number, max: number): number => {
  return Math.round(Math.random() * (max - min) + min);
};

export const getSpriteScale = (): number => {
  if (typeof window === "undefined") {
    return 100;
  }

  if (window.innerHeight > 800) {
    return 100;
  }

  return 80;
};

export const getLimit = (): number => {
  if (typeof window === "undefined") {
    return 500;
  }

  return Math.min(window.innerWidth - 100, 500);
};
