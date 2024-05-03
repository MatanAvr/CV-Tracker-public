import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import cloneDeep from "lodash.clonedeep";

import { LOCAL_STORAGE_DATA_KEY, emptyEntry, testUser } from "../Consts/Const";
import MainTable from "./MainTable";
import {
  SnackBarColorsType,
  UserLinksType,
  UserType,
  EntryType,
} from "../Types/Types";
import { useMemo, useState } from "react";
import { Button, Fab, Tooltip, Typography } from "@mui/material";
import { Copyright } from "./Copyright";
import { UserLinks } from "./UserLinks";
import {
  deleteFromLocalStorage,
  loadFromLocalStorage,
  saveInLocalStorage,
} from "../Utils/Utils";
import SnackBarHandler from "./SnackBarHandler";
import { EntryFormModal } from "./Forms/EntryFormModal";
import { isValidEntry, isValidUser } from "../Schemas/schemeValidators";
import { UserLinksFormModal } from "./Forms/UserLinksFormModal";

type DashboardProps = {
  user: UserType;
};

export const Dashboard = ({ user }: DashboardProps) => {
  const [currentUser, setCurrentUser] = useState<UserType>(user);
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

  const [isSnackBarOpen, setIsSnackBarOpen] = useState<boolean>(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");
  const [snackBarColor, setSnackBarColor] =
    useState<SnackBarColorsType>("info");

  const saveUserLinksHandler = async (newUserLinks: UserLinksType) => {
    if (!currentUser) return;
    const newUserLinksClone = cloneDeep(newUserLinks);
    const updatedUser = { ...currentUser, ...newUserLinksClone };
    setCurrentUser(() => updatedUser);
    openSnackBar("Links saved successfully", "success");
    saveUserToLocalStorage(updatedUser);
  };

  const updateUserEntries = (newEntries: EntryType[]) => {
    if (!currentUser) return;
    const newUserEntries = cloneDeep(newEntries);
    const updatedUser = { ...currentUser, entries: [...newUserEntries] };
    setCurrentUser(() => updatedUser);
    openSnackBar("Links saved successfully", "success");
    saveUserToLocalStorage(updatedUser);
  };

  const createEntryHandler = (newEntry: EntryType) => {
    if (!currentUser) return;
    const newEntryClone = cloneDeep(newEntry);
    if (!newEntryClone.date) {
      newEntryClone.date = new Date().toLocaleDateString();
    }

    // setEntries((entries) => [...entries, newEntryClone]);
    updateUserEntries([...currentUser.entries, newEntryClone]);
    openSnackBar("Entry saved successfully", "success");
  };

  const updateEntryHandler = (entryToUpdate: EntryType) => {
    const entriesClone = cloneDeep(currentUser.entries);
    const relevantEntryIndex = entriesClone.findIndex(
      (el) => el.id === entryToUpdate.id
    );
    if (relevantEntryIndex !== -1) {
      entriesClone[relevantEntryIndex] = entryToUpdate;
      // setEntries(() => [...entriesClone]);
      updateUserEntries([...entriesClone]);

      openSnackBar("Entry updated successfully", "success");
    } else {
      console.error(
        `[updateEntryHandler] Entry with id ${entryToUpdate.id} does not exists`
      );
    }
  };

  const deleteEntryByIdHandler = (idToDelete: string) => {
    if (!currentUser.entries) {
      console.error("[deleteEntryByIdHandler] There is no data");
      return;
    }
    const clonedEntries = cloneDeep(currentUser.entries);
    const filteredEntries = clonedEntries.filter(
      (entry) => entry.id !== idToDelete
    );
    // setEntries(() => filteredEntries);
    updateUserEntries(filteredEntries);
    openSnackBar("Entry deleted successfully", "success");
  };

  const editEntryByIdHandler = (idToEdit: string) => {
    const dataClone = cloneDeep(currentUser.entries);
    const relevantEntry = dataClone.find((entry) => entry.id === idToEdit);
    if (relevantEntry) {
      setEntryToEdit(relevantEntry);
    } else {
      console.error(
        `[editEntryByIdHandler] relevantEntry id ${idToEdit} does not exists`
      );
    }
  };

  const openSnackBar = (
    message: string,
    color: SnackBarColorsType = "info"
  ) => {
    setSnackBarColor(color);
    setSnackBarMessage(message);
    setIsSnackBarOpen(true);
  };

  const closeSnackBar = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackBarOpen(false);
    setSnackBarMessage("");
  };

  const saveUserToLocalStorage = (updatedUser: UserType) => {
    const userClone = cloneDeep(updatedUser);
    const validUser = isValidUser(userClone);
    if (validUser) {
      console.log(userClone);
      saveInLocalStorage(LOCAL_STORAGE_DATA_KEY, userClone);
    } else {
      openSnackBar("Save error", "error");
    }
  };

  return (
    <>
      {/* {false && (
        <Box>
          <Button
            onClick={() => deleteFromLocalStorage(LOCAL_STORAGE_DATA_KEY)}
          >
            delete
          </Button>
          <Button
            onClick={() => saveInLocalStorage(LOCAL_STORAGE_DATA_KEY, testUser)}
          >
            test user save
          </Button>
          <Button
            onClick={() => {
              const tempUser = loadFromLocalStorage(LOCAL_STORAGE_DATA_KEY);
              setCurrentUser(tempUser);
            }}
          >
            Load from local storage
          </Button>
          <Button onClick={() => saveUserToLocalStorage(currentUser)}>
            Save
          </Button>
          <Button onClick={() => console.log(currentUser)}>Print user</Button>
          <Button onClick={() => isValidUser(currentUser)}>
            Validate user
          </Button>
          <Button onClick={() => console.log(currentUser.entries)}>
            Print user entries
          </Button>
          <Button
            onClick={() => {
              currentUser.entries.forEach((entry) => isValidEntry(entry));
            }}
          >
            Validate entries
          </Button>
        </Box>
      )} */}
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          gap: 1,
          overflow: "hidden",
        }}
      >
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
        </Box>
        <Grid
          container
          // spacing={1}
          overflow={"auto"}
        >
          {currentUser.entries && currentUser.entries.length > 0 ? (
            <MainTable
              data={currentUser.entries}
              deleteHandler={deleteEntryByIdHandler}
              editHandler={editEntryByIdHandler}
            />
          ) : (
            <Box display={"flex"} flex={1} justifyContent={"center"}>
              <Typography variant="h5">Add new entries!</Typography>
            </Box>
          )}
        </Grid>
      </Container>
      <Copyright />
      <SnackBarHandler
        isSnackBarOpen={isSnackBarOpen}
        closeSnackBar={closeSnackBar}
        snackBarColor={snackBarColor}
        snackBarMessage={snackBarMessage}
      />

      {/* Modals */}
      {entryToEdit && (
        <EntryFormModal
          closeModal={() => setEntryToEdit(undefined)}
          onCreate={createEntryHandler}
          onUpdate={updateEntryHandler}
          entry={entryToEdit}
        />
      )}
      {userLinksToEdit && (
        <UserLinksFormModal
          closeModal={() => setUserLinksToEdit(undefined)}
          onSave={saveUserLinksHandler}
          userLinks={userLinksToEdit}
        />
      )}
    </>
  );
};
