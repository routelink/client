export const v4 = (): string => {
  let uuid = '',
    i,
    random;

  for (i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0;
    if (i == 8 || i == 12 || i == 16 || i == 20) {
      uuid += '-';
    }
    uuid += (i == 12 ? 4 : i == 16 ? (random & 3) | 8 : random).toString(16);
  }

  return uuid;
};
export const v4Int = (min = 99999999, max = 10000000) => {
  return Math.floor(Math.random() * (max - min) + min);
};
