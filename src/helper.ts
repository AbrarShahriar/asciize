export const select = (el: string): HTMLElement => {
  const node = document.querySelector(el) as HTMLElement;
  if (!node) throw new Error(`No DOM node found with selector: ${el}`);
  return node;
};

export const createTileFrom = (str: string) =>
  str
    .trim()
    .split("\n")
    .map((el) => el.split(""));
