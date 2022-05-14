export const generateKey = (pre: string) => {
  return `${pre}_${new Date().getTime()}`;
};

export const generateRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

export const generateRandomLightColor = () => {
  const color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
  return color;
};
