import { nanoid } from "nanoid";

export const generateIdWithPrefix = (prefix: string): string => {
  return prefix + nanoid();
};
