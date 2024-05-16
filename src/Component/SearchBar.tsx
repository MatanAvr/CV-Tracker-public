import { Box, TextField } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useEffect, useState } from "react";
import { filterApplications } from "../Utils/filterApplications";
import { ApplicationType } from "../Types/Types";

type SearchBarProps = {
  applications: ApplicationType[];
  setFilteredApplications: (
    filteredApplications: ApplicationType[] | undefined
  ) => void;
};

const SearchBar = ({
  applications,
  setFilteredApplications,
}: SearchBarProps) => {
  const [searchString, setSearchString] = useState<string>("");

  useEffect(() => {
    if (searchString === "") {
      setFilteredApplications(undefined);
      return;
    }

    const filteredApplications = filterApplications(applications, searchString);
    setFilteredApplications(filteredApplications);
  }, [searchString]);

  return (
    <Box display={"flex"} alignContent={"flex-end"}>
      <SearchRoundedIcon color="primary" sx={{ mr: 1, my: 0.5 }} />
      <TextField
        aria-label="Search"
        size="small"
        variant="standard"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
    </Box>
  );
};

export default SearchBar;
