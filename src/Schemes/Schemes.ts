import { z } from "zod";

export const Status = z.enum([
  "",
  "Sent CV",
  "Waiting for response",
  "HR call",
  "Interview",
  "Not relevant",
]);
const optionalUrl = z.union([z.string().url().nullish(), z.literal("")]);
export const Entry = z.object({
  id: z.string().min(1).max(30),
  date: z.string().min(1).max(18),
  company: z.string().min(1).max(18),
  role: z.string().min(1).max(18),
  link: optionalUrl,
  status: Status,
  notes: z.string().min(0).max(400).optional(),
});

export const User = z.object({
  id: z.string().min(1).max(18),
  firstName: z.string().min(1).max(18),
  lastName: z.string().min(1).max(18),
  email: z.string().email(),
  linkedinLink: z.string().url(),
  githubLink: z.string().url(),
  personalWebsiteLink: z.string().url(),
  entries: Entry.array(),
});

export const UserLinks = User.pick({
  email: true,
  linkedinLink: true,
  githubLink: true,
  personalWebsiteLink: true,
});
