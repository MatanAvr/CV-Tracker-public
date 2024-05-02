import { z } from "zod";
import { zodStatusType } from "../Schemes/Schemes";

export type Tstatus = z.infer<typeof zodStatusType>;

export const statusArr: Tstatus[] = [
  "Sent CV",
  "Waiting for response",
  "HR call",
  "Not relevant",
] as const;

export type EntryType = {
  id: string;
  date: string;
  company: string;
  role: string;
  link: string;
  status: Tstatus;
  notes: string;
};

export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  linkedinLink: string;
  githubLink: string;
  personalWebsiteLink: string;
};

export type TableDataProps = EntryType[];
export type snackBarColors = "success" | "info" | "warning" | "error";
export interface userLinks {
  linkedinLink: string;
  githubLink: string;
  personalWebsiteLink: string;
}
