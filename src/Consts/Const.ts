import { EntryType, UserType } from "../Types/Types";

export const DRAWER_WIDTH: number = 200;

export const LOCAL_STORAGE_DATA_KEY = "data";

export const tableColumns = [
  "Date",
  "Company",
  "Role",
  "Link",
  "Status",
  "Notes",
];

export const defaultEntry: EntryType = {
  id: "",
  date: "",
  company: "",
  role: "",
  link: "",
  status: "",
  notes: "",
};

export const APP_NAME = "CV-Tracker-public";

export const defaultUserLinks = {
  linkedinLink: "",
  githubLink: "",
  personalWebsiteLink: "",
};

export const SNACKBAR_TIMEOUT = 5000;

export const ENTRY_PREFIX = "EN-";

export const USER_PREFIX = "US-";

export const defaultUser: UserType = {
  id: "us-151654646",
  firstName: "Matan",
  lastName: "Avraham",
  linkedinLink: "https://www.linkedin.com/in/matan-avraham-il/",
  githubLink: "https://github.com/MatanAvr",
  personalWebsiteLink: "",
};

export const TEST_DATA: EntryType[] = [
  {
    id: "en-pgEHWqoK8-h4h7VmZVbH3",
    date: "01/04/2024",
    company: "Facebook",
    role: "Front-end",
    link: "http://www.facebook.com",
    status: "Sent CV",
    notes: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: "en-nalBBCuMVhrNJIF08xVm2",
    date: "05/04/2024",
    company: "Google",
    role: "Back-end",
    link: "http://www.google.com",
    status: "Waiting for response",
    notes:
      "In exercitationem voluptatem ullam blanditiis ipsa impedit nam, molestias modi optio est saepe quae quidem quod qui?",
  },
  {
    id: "en-RcghHaLUfXSGS63Y_LsRF",
    date: "11/04/2024",
    company: "Amazon",
    role: "Fullstack",
    link: "http://www.amazon.com",
    status: "HR call",
    notes:
      "molestias modi optio est saepe quae quidem quod qui? Id, porro nulla.",
  },
  {
    id: "en-RcghHaLUTXSGS63Y_LsRF",
    date: "15/04/2024",
    company: "Amazon",
    role: "very long role name, at least 6 words",
    link: "http://www.amazon.com",
    status: "HR call",
    notes:
      "molestias modi optio est saepe quae quidem quod qui? Id, porro nulla.",
  },
];
