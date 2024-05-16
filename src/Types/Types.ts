import { z } from "zod";
import {
  ApplicationSchema,
  StatusEnum,
  UserSchema,
  UserLinksSchema,
} from "../Schemas/Schemas";

export type StatusType = z.infer<typeof StatusEnum>;
export type ApplicationType = z.infer<typeof ApplicationSchema>;
export type UserType = z.infer<typeof UserSchema>;
export type UserLinksType = z.infer<typeof UserLinksSchema>;

export const statusArr: StatusType[] = [
  "Sent CV",
  "Waiting for response",
  "HR call",
  "Not relevant",
] as const;

export type TableDataProps = ApplicationType[];
export type SnackBarColorsType = "success" | "info" | "warning" | "error";

export type SystemConfigType = {
  theme: "light" | "dark";
  todayAsDefault: boolean;
  deafaultStatus: StatusType;
};

export type NewApplicationConfigType = Pick<
  SystemConfigType,
  "todayAsDefault" | "deafaultStatus"
>;
