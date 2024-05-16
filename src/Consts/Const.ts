import {
  ApplicationType,
  NewApplicationConfigType,
  SystemConfigType,
  UserLinksType,
  UserType,
} from "../Types/Types";

export const LOCAL_STORAGE_DATA_KEY = "data";
export const APPLICATION_PREFIX = "AP-";
export const USER_PREFIX = "US-";

export const tableColumns = [
  "Date",
  "Company",
  "Role",
  "Link",
  "Status",
  "Notes",
];

export const emptyUserLinks: UserLinksType = {
  email: "",
  linkedinLink: "",
  githubLink: "",
  personalWebsiteLink: "",
};

export const testEntries: ApplicationType[] = [
  {
    id: "AP-pgEHWqoK8-h4h7VmZVbH3",
    date: "01/04/2024",
    company: "Facebook",
    role: "Front-end",
    link: "http://www.facebook.com",
    status: "Sent CV",
    notes: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: "AP-nalBBCuMVhrNJIF08xVm2",
    date: "05/04/2024",
    company: "Google",
    role: "Back-end",
    link: "http://www.google.com",
    status: "Waiting for response",
    notes:
      "In exercitationem voluptatem ullam blanditiis ipsa impedit nam, molestias modi optio est saepe quae quidem quod qui?",
  },
  {
    id: "AP-RcghHaLUfXSGS63Y_LsRF",
    date: "11/04/2024",
    company: "Amazon",
    role: "Fullstack",
    link: "http://www.amazon.com",
    status: "HR call",
    notes:
      "molestias modi optio est saepe quae quidem quod qui? Id, porro nulla.",
  },
  {
    id: "AP-RcghHaLUTXSGS63Y_LsRF",
    date: "15/04/2024",
    company: "Amazon",
    role: "very long role name",
    link: "http://www.amazon.com",
    status: "HR call",
    notes:
      "molestias modi optio est saepe quae quidem quod qui? Id, porro nulla.",
  },
];

export const testUser: UserType = {
  id: "US-xLCydedMCk_bYreTCIQXI",
  firstName: "Matan",
  lastName: "Avraham",
  email: "matan4900@gmail.com",
  linkedinLink: "https://www.linkedin.com/in/matan-avraham-il/",
  githubLink: "https://github.com/MatanAvr",
  personalWebsiteLink: "https://www.matanavraham.com/",
  entries: testEntries,
};

export const emptyUser: UserType = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  linkedinLink: "",
  githubLink: "",
  personalWebsiteLink: "",
  entries: [],
};

export const emptyApplication: ApplicationType = {
  id: "",
  date: "",
  company: "",
  role: "",
  link: "",
  status: "",
  notes: "",
};

export const systemConfig: SystemConfigType = {
  theme: "light",
  todayAsDefault: true,
  deafaultStatus: "Sent CV",
};

export const newApplicationConfig: NewApplicationConfigType = {
  todayAsDefault: systemConfig.todayAsDefault,
  deafaultStatus: systemConfig.deafaultStatus,
};
