import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import cloneDeep from "lodash.clonedeep";

import {
  emptyEntry,
  testUser,
  LOCAL_STORAGE_DATA_KEY,
  emptyUser,
} from "../Consts/Const";
import MainTable from "./MainTable";
import {
  SnackBarColorsType,
  UserLinksType,
  UserType,
  EntryType,
} from "../Types/Types";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Fab,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
// import LoadingSpinner from "./LoadingSpinner";
import { Copyright } from "./Copyright";
import EntryModal from "./EntryModal";
import UserLinksModal from "./UserLinksModal";
import { UserLinks } from "./UserLinks";
import { SNACKBAR_TIMEOUT } from "../Consts/ui";
import {
  deleteFromLocalStorage,
  loadFromLocalStorage,
  saveInLocalStorage,
} from "../Utils/Utils";

type DashboardProps = {
  user: UserType;
};

export const Dashboard = ({ user }: DashboardProps) => {
  const [currentUser, setCurrentUser] = useState<UserType>(user);
  const [entries, setEntries] = useState<EntryType[]>(user.entries);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [entryToEdit, setEntryToEdit] = useState<EntryType>();
  const [userLinksToEdit, setUserLinksToEdit] = useState<UserLinksType>();

  const userLinks = useMemo(() => {
    if (!currentUser) return;
    return {
      email: currentUser.email,
      linkedinLink: currentUser.linkedinLink,
      githubLink: currentUser.githubLink,
      personalWebsiteLink: currentUser.personalWebsiteLink,
    };
  }, [
    currentUser.email,
    currentUser.linkedinLink,
    currentUser.githubLink,
    currentUser.personalWebsiteLink,
  ]);
  useEffect(() => {
    setEntries(currentUser.entries);
  }, [currentUser.id]);

  const [isSnackBarOpen, setIsSnackBarOpen] = useState<boolean>(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");
  const [snackBarColor, setSnackBarColor] =
    useState<SnackBarColorsType>("info");

  const deleteEntryByIdHandler = async (idToDelete: string) => {
    if (!entries) {
      console.error("[deleteEntryByIdHandler] There is no data");
      return;
    }
    const clonedEntries = cloneDeep(entries);
    const filteredEntries = clonedEntries.filter(
      (entry) => entry.id !== idToDelete
    );
    setEntries(() => filteredEntries);
    openSnackBar("Entry deleted successfully", "success");
  };

  const saveNewEntryHandler = async (newEntry: EntryType) => {
    if (!currentUser) return;
    if (newEntry.id) {
      updateEntryHandler(newEntry);
      return;
    }
    const newEntryClone = cloneDeep(newEntry);
    if (!newEntryClone.date) {
      newEntryClone.date = new Date().toLocaleDateString();
    }

    setEntries((entries) => [...entries, newEntryClone]);
    openSnackBar("Entry saved successfully", "success");
  };

  const saveUserLinksHandler = async (newUserLinks: UserLinksType) => {
    if (!currentUser) return;
    const newUserLinksClone = cloneDeep(newUserLinks);
    const updatedUser = { ...currentUser, ...newUserLinksClone };
    setCurrentUser(() => updatedUser);
    openSnackBar("Links saved successfully", "success");
  };

  const editEntryByIdHandler = (idToEdit: string) => {
    const dataClone = cloneDeep(entries);
    const relevantEntry = dataClone.find((entry) => entry.id === idToEdit);
    if (relevantEntry) {
      setEntryToEdit(relevantEntry);
    } else {
      console.error(
        `[editEntryByIdHandler] relevantEntry id ${idToEdit} does not exists`
      );
    }
  };

  const updateEntryHandler = async (entryToUpdate: EntryType) => {
    const entriesClone = cloneDeep(entries);
    const relevantEntryIndex = entriesClone.findIndex(
      (el) => el.id === entryToUpdate.id
    );
    if (relevantEntryIndex !== -1) {
      entriesClone[relevantEntryIndex] = entryToUpdate;
      setEntries(() => [...entriesClone]);
      openSnackBar("Entry updated successfully", "success");
    } else {
      console.error(
        `[updateEntryHandler] Entry with id ${entryToUpdate.id} does not exists`
      );
    }
  };

  const openSnackBar = (
    message: string,
    color: SnackBarColorsType = "info"
  ) => {
    setSnackBarColor(() => color);
    setSnackBarMessage(message);
    setIsSnackBarOpen(() => true);
  };

  const closeSnackBar = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackBarOpen(() => false);
    setSnackBarMessage("");
  };

  const closeEntryModalHandler = () => {
    setEntryToEdit(undefined);
  };

  const closeUserLinksModalHandler = () => {
    setUserLinksToEdit(undefined);
  };

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          gap: 1,
          overflow: "hidden",
          border: "1px solid red",
        }}
      >
        {/* {currentUser && <Typography>Hi {currentUser.firstName}!</Typography>} */}
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <Tooltip title="Add new entry">
            <Fab
              color="primary"
              aria-label="add"
              size="small"
              onClick={() => setEntryToEdit(emptyEntry)}
            >
              <AddRoundedIcon />
            </Fab>
          </Tooltip>

          {currentUser && (
            <UserLinks user={currentUser} openSnackBar={openSnackBar} />
          )}
          <Tooltip title="Edit links">
            <IconButton
              onClick={() => setUserLinksToEdit(userLinks)}
              size="small"
            >
              <EditRoundedIcon color="primary" />
            </IconButton>
          </Tooltip>
          {/* ********************************************************************************************************************** */}
          {/* ********************************************************************************************************************** */}
          {/* ********************************************************************************************************************** */}
          {true && (
            <Box>
              <Button onClick={() => console.log(entries)}>
                Print entries
              </Button>
              <Button onClick={() => console.log(currentUser)}>
                Print User
              </Button>
              <Button
                onClick={() => {
                  deleteFromLocalStorage(LOCAL_STORAGE_DATA_KEY);
                  setCurrentUser(emptyUser);
                }}
              >
                Delete user
              </Button>
              <Button
                onClick={() =>
                  saveInLocalStorage(LOCAL_STORAGE_DATA_KEY, testUser)
                }
              >
                Create user
              </Button>
              <Button
                onClick={() => {
                  const a = loadFromLocalStorage(LOCAL_STORAGE_DATA_KEY);
                  if (a) setCurrentUser(a);
                }}
              >
                Load user
              </Button>
              {/* <Button
          onClick={() => console.log(generateIdWithPrefix(USER_PREFIX))}
        >
          generateUsId
        </Button> */}
              {/* <Button
          onClick={() => console.log(generateIdWithPrefix(ENTRY_PREFIX))}
        >
          generateEnId
        </Button> */}
            </Box>
          )}
          {/* ********************************************************************************************************************** */}
          {/* ********************************************************************************************************************** */}
          {/* ********************************************************************************************************************** */}
        </Box>
        <Grid
          container
          // spacing={1}
          overflow={"auto"}
        >
          {entries && entries.length > 0 ? (
            <MainTable
              data={entries}
              deleteHandler={deleteEntryByIdHandler}
              editHandler={editEntryByIdHandler}
            />
          ) : (
            <Box display={"flex"} flex={1} justifyContent={"center"}>
              <Typography variant="h5">Add new entries!</Typography>
            </Box>
          )}
        </Grid>
        <>{currentUser && currentUser.id}</>
      </Container>
      <Copyright />
      {isSnackBarOpen && (
        <Snackbar
          open={isSnackBarOpen}
          autoHideDuration={SNACKBAR_TIMEOUT}
          onClose={closeSnackBar}
        >
          <Alert
            onClose={closeSnackBar}
            severity={snackBarColor}
            sx={{ width: "100%" }}
          >
            {snackBarMessage}
          </Alert>
        </Snackbar>
      )}

      {/* Modals */}
      {entryToEdit && (
        <EntryModal
          open={entryToEdit ? true : false}
          closeModal={closeEntryModalHandler}
          onSave={saveNewEntryHandler}
          entry={entryToEdit}
        />
      )}
      {userLinksToEdit && (
        <UserLinksModal
          open={userLinksToEdit ? true : false}
          closeModal={closeUserLinksModalHandler}
          onSave={saveUserLinksHandler}
          userLinks={userLinksToEdit}
        />
      )}
    </>
  );
};
