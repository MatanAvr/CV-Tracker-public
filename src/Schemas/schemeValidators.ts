import { UserType, EntryType } from "../Types/Types";
import { UserSchema, EntrySchema } from "./Schemas";

export const isValidUser = (user: UserType): boolean => {
  const data = UserSchema.safeParse(user);
  // console.log(data);
  return data.success;
};

export const isValidEntry = (entry: EntryType): boolean => {
  const data = EntrySchema.safeParse(entry);
  // console.log(data);
  return data.success;
};
