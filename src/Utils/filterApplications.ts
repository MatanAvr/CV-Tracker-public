import { ApplicationType } from "../Types/Types";

export function filterApplications(
  applications: ApplicationType[],
  searchString: string
): ApplicationType[] {
  const lowerCaseSearchString = searchString.toLowerCase();

  return applications.filter((application) => {
    return Object.values(application).some((value) =>
      value.toLowerCase().includes(lowerCaseSearchString)
    );
  });
}
