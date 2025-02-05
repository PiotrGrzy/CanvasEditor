import { twMerge } from 'tailwind-merge';

export const cn = (baseClassname = '', ...classes: string[]) => {
  return twMerge(baseClassname, ...classes.filter(Boolean));
};