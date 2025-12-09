import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// from https://github.com/vercel/next.js/discussions/56973
export const getFileRoutePath = (pathname: string, params: object) => {
  let paramCount = 0;
  const reverseParamsObject = Object.entries(params).reduceRight(
    (prev, [key, val]) => {
      if (Array.isArray(val)) {
        return {
          ...prev,
          ...val.reduceRight((_prev, cur, _idx) => {
            _prev[`${cur}-${paramCount}`] = `[...${key}]`;
            paramCount += 1;
            return _prev;
          }, {}),
        };
      }

      prev[`${val}-${paramCount}`] = `[${key}]`;
      paramCount += 1;
      return prev;
    },
    {} as Record<string, string>
  );

  let interpolateCount = 0;
  const fileRoutePath = pathname
    .split("/")
    .reduceRight((prev, cur) => {
      const lookup = reverseParamsObject[`${cur}-${interpolateCount}`];

      if (prev.endsWith(`${lookup}${"/"}`)) {
        interpolateCount += 1;
        return prev;
      }

      if (lookup) {
        prev += lookup;
        interpolateCount += 1;
      } else {
        prev += cur;
      }

      return prev + "/";
    }, "")
    .slice(0, -1)
    .split("/")
    .reverse()
    .join("/");

  return fileRoutePath;
};
