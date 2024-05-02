import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import cloneDeep from "lodash.clonedeep";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import {
  defaultEntry,
  defaultUser,
  ENTRY_PREFIX,
  SNACKBAR_TIMEOUT,
  TEST_DATA,
} from "../Consts/Const";
import MainTable from "./MainTable";
import {
  snackBarColors,
  TableDataProps,
  userLinks,
  UserType,
  EntryType,
} from "../Types/Types";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Divider,
  Fab,
  List,
  Snackbar,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
// import LoadingSpinner from "./LoadingSpinner";
import { Copyright } from "./Copyright";
import EntryModal from "./EntryModal";
import UserLinksModal from "./UserLinksModal";
import Header from "./Header";
import { generateIdWithPrefix } from "../Utils/generateIdWithPrefix";
import { mainListItems } from "./MenuList";
import { Drawer } from "./Drawer";
import { UserPlatformsLinks } from "./UserPlatformsLinks";

export const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<TableDataProps>(TEST_DATA);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [entryToEdit, setEntryToEdit] = useState<EntryType>();
  const [userLinksToEdit, setUserLinksToEdit] = useState<userLinks>();
  const [currentUser, setCurrentUser] = useState<UserType>(defaultUser);

  const userLinks = useMemo(() => {
    if (!currentUser) return;
    return {
      linkedinLink: currentUser.linkedinLink,
      githubLink: currentUser.githubLink,
      personalWebsiteLink: currentUser.personalWebsiteLink,
    };
  }, [currentUser]);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const getUser = async () => {
    setCurrentUser(defaultUser);
    getEntriesForCurrentUser();
  };

  useEffect(() => {
    if (!currentUser || !currentUser.id) return;
    getEntriesForCurrentUser();
  }, [currentUser?.id]);

  const getEntriesForCurrentUser = async () => {
    if (!currentUser || !currentUser.id) return;
    setEntries(TEST_DATA);
  };

  // SnackBar related
  const [isSnackBarOpen, setIsSnackBarOpen] = useState<boolean>(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");
  const [snackBarColor, setSnackBarColor] = useState<snackBarColors>("info");

  const deleteEntryByIdHandler = async (idToDelete: string) => {
    if (!entries) {
      console.error("There is no data");
      return;
    }
    const clonedData = cloneDeep(entries);
    // await apiClientInstance.deleteEntry(idToDelete);
    const filteredData = clonedData.filter((entry) => entry.id !== idToDelete);
    setEntries(() => filteredData);
    openSnackBar("Entry deleted successfully", "success");
  };

  const saveNewEntryHandler = async (newEntry: EntryType) => {
    if (!currentUser) return;
    if (newEntry.id) {
      updateEntryHandler(newEntry);
      return;
    }
    const newEntryClone = cloneDeep(newEntry);
    newEntryClone.id = generateIdWithPrefix(ENTRY_PREFIX);
    newEntryClone.date = new Date().toLocaleDateString();

    // await apiClientInstance.postEntry(currentUser.id, newEntryClone);
    setEntries((entries) => [...entries, newEntryClone]);
    openSnackBar("Entry saved successfully", "success");
  };

  const saveUserLinksHandler = async (newUserLinks: userLinks) => {
    if (!currentUser) return;
    const newUserLinksClone = cloneDeep(newUserLinks);
    const updatedUser = { ...currentUser, ...newUserLinksClone };
    // await apiClientInstance.updateUser(updatedUser);
    setCurrentUser(() => updatedUser);
    openSnackBar("Links saved successfully", "success");
  };

  const editEntryByIdHandler = (idToEdit: string) => {
    const dataClone = cloneDeep(entries);
    const relevantEntry = dataClone.find((entry) => entry.id === idToEdit);
    if (relevantEntry) {
      // open modal with relevant entry
      setEntryToEdit(relevantEntry);
    } else {
      console.error(
        `editEntryByIdHandler relevanEntryTypewith id ${idToEdit} does not exists`
      );
    }
  };

  const updateEntryHandler = async (entryToUpdate: EntryType) => {
    const dataClone = cloneDeep(entries);
    const relevantEntryIndex = dataClone.findIndex(
      (el) => el.id === entryToUpdate.id
    );
    if (relevantEntryIndex !== -1) {
      dataClone[relevantEntryIndex] = entryToUpdate;
      // await apiClientInstance.updateEntry(entryToUpdate);
      setEntries(() => [...dataClone]);
      openSnackBar("Entry updated successfully", "success");
    } else {
      console.error(`updateEntry with id ${entryToUpdate.id} does not exists`);
    }
  };

  const openSnackBar = (message: string, color: snackBarColors = "info") => {
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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header toggleDrawer={toggleDrawer} open={open} />
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">{mainListItems}</List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            flexDirection: "column",
            pt: 10,
            gap: 1,
            overflow: "hidden",
          }}
        >
          {currentUser && <Typography>Hi {currentUser.firstName}!</Typography>}
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Tooltip title="Add new entry">
              <Fab
                color="primary"
                aria-label="add"
                size="small"
                onClick={() => setEntryToEdit(defaultEntry)}
              >
                <AddRoundedIcon />
              </Fab>
            </Tooltip>

            {currentUser && (
              <UserPlatformsLinks
                user={currentUser}
                openSnackBar={openSnackBar}
              />
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
                <Button onClick={() => getUser()}>user</Button>
                <Button onClick={getEntriesForCurrentUser}>
                  getEntriesForCurrentUser
                </Button>
                <Button onClick={() => console.log(entries)}>
                  Print entries
                </Button>
                <Button onClick={() => console.log(currentUser)}>
                  Print User
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
      </Box>
    </Box>
  );
};
