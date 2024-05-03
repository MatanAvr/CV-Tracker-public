import { z } from "zod";
import {
  EntrySchema,
  StatusEnum,
  UserSchema,
  UserLinksSchema,
} from "../Schemas/Schemas";

export type StatusType = z.infer<typeof StatusEnum>;
export type EntryType = z.infer<typeof EntrySchema>;
export type UserType = z.infer<typeof UserSchema>;
export type UserLinksType = z.infer<typeof UserLinksSchema>;

export const statusArr: StatusType[] = [
  "Sent CV",
  "Waiting for response",
  "HR call",
  "Not relevant",
] as const;

export type TableDataProps = EntryType[];
export type SnackBarColorsType = "success" | "info" | "warning" | "error";

export type SystemConfigType = {
  theme: "light" | "dark";
  todayAsDefault: boolean;
  deafaultStatus: StatusType;
};

export type NewEntryConfigType = Pick<
  SystemConfigType,
  "todayAsDefault" | "deafaultStatus"
>;
