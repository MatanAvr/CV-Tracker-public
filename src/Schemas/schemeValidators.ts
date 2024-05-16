import { UserType, ApplicationType } from "../Types/Types";
import { UserSchema, ApplicationSchema } from "./Schemas";

export const isValidUser = (user: UserType): boolean => {
  const data = UserSchema.safeParse(user);
  return data.success;
};

export const isValidApplication = (application: ApplicationType): boolean => {
  const data = ApplicationSchema.safeParse(application);
  return data.success;
};
