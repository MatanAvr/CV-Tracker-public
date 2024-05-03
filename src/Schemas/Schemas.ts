import { z } from "zod";

export const StatusEnum = z.enum([
  "",
  "Sent CV",
  "Waiting for response",
  "HR call",
  "Interview",
  "Not relevant",
]);

const optionalUrl = z.union([z.string().url(), z.literal("")]);
const optionalEmail = z.union([z.string().email(), z.literal("")]);

export const EntrySchema = z.object({
  id: z.string().min(1).max(30),
  date: z.string().min(1).max(30),
  company: z.string().min(1).max(30),
  role: z.string().min(1).max(30),
  link: optionalUrl,
  status: z.string().min(1).max(30).optional(),
  notes: z.string().min(0).max(400).optional(),
});

export const UserSchema = z.object({
  id: z.string().min(1).max(30),
  firstName: z.string().min(0).max(30).optional(),
  lastName: z.string().min(0).max(30).optional(),
  email: optionalEmail,
  linkedinLink: optionalUrl,
  githubLink: optionalUrl,
  personalWebsiteLink: optionalUrl,
  entries: EntrySchema.array(),
});

export const UserLinksSchema = UserSchema.pick({
  email: true,
  linkedinLink: true,
  githubLink: true,
  personalWebsiteLink: true,
});
