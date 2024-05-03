import { UserType, EntryType } from "../Types/Types";
import { User, Entry } from "./Schemes";

export const isValidUser = (user: UserType): boolean => {
  const data = User.safeParse(user);
  return data.success;
};

export const isValidEntry = (entry: EntryType): boolean => {
  const data = Entry.safeParse(entry);
  console.log(data);
  return data.success;
};
