import { z } from "zod";
import { Entry, Status, User, UserLinks } from "../Schemes/Schemes";

export type StatusType = z.infer<typeof Status>;
export type EntryType = z.infer<typeof Entry>;
export type UserType = z.infer<typeof User>;
export type UserLinksType = z.infer<typeof UserLinks>;

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
