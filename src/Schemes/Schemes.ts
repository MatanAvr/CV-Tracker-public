import { z } from "zod";
import { EntryType, UserType } from "../Types/Types";

export const zodStatusType = z.enum([
  "",
  "Sent CV",
  "Waiting for response",
  "HR call",
  "Not relevant",
]);

const entryScheme = z.object({
  date: z.string().min(1).max(18),
  company: z.string().min(1).max(18),
  role: z.string().min(1).max(18),
  link: z.string().url(),
  status: zodStatusType,
  notes: z.string().min(0).max(400),
});

export const zodEntryValidator = (entry: EntryType) => {
  const isValidEntry = entryScheme.parse(entry);
  return isValidEntry;
};

const userScheme = z.object({
  id: z.string().min(1).max(18),
  email: z.string().email(),
  password: z.string().min(4),
  firstName: z.string().min(1).max(18),
  LastName: z.string().min(1).max(18),
  linkedinLink: z.string().url(),
  githubLink: z.string().url(),
  personalWebsiteLink: z.string().url(),
});

export const zodeUserValidator = (user: UserType) => {
  const isValid = userScheme.parse(user);
  return isValid;
};
