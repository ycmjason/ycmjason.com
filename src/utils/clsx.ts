export const clsx = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(cls => typeof cls === 'string').join(' ');
};
