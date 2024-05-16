import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import cloneDeep from "lodash.clonedeep";
import { LOCAL_STORAGE_DATA_KEY, emptyApplication } from "../Consts/Const";
import MainTable from "./MainTable";
import {
  SnackBarColorsType,
  UserLinksType,
  UserType,
  ApplicationType,
} from "../Types/Types";
import { useMemo, useState } from "react";
import { Fab, Tooltip, Typography } from "@mui/material";
import { Copyright } from "./Copyright";
import { UserLinks } from "./UserLinks";
import { saveInLocalStorage } from "../Utils/Utils";
import SnackBarHandler from "./SnackBarHandler";
import { ApplicationFormModal } from "./Forms/ApplicationFormModal";
import { isValidUser } from "../Schemas/schemeValidators";
import { UserLinksFormModal } from "./Forms/UserLinksFormModal";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import SearchBar from "./SearchBar";

type DashboardProps = {
  user: UserType;
};

export const Dashboard = ({ user }: DashboardProps) => {
  const [currentUser, setCurrentUser] = useState<UserType>(user);
  const [filteredApplications, setFilteredApplications] = useState<
    ApplicationType[] | undefined
  >(undefined);
  const [ApplicationToEdit, setApplicationToEdit] = useState<ApplicationType>();
  const [userLinksToEdit, setUserLinksToEdit] = useState<UserLinksType>();
  const [idToDelete, setIdToDelete] = useState<string>("");

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

  const updateUserEntries = (newEntries: ApplicationType[]) => {
    if (!currentUser) return;
    const newUserEntries = cloneDeep(newEntries);
    const updatedUser = { ...currentUser, entries: [...newUserEntries] };
    setCurrentUser(() => updatedUser);
    openSnackBar("Links saved successfully", "success");
    saveUserToLocalStorage(updatedUser);
  };

  const createApplicationHandler = (newApplication: ApplicationType) => {
    if (!currentUser) return;
    const newApplicationClone = cloneDeep(newApplication);
    if (!newApplicationClone.date) {
      newApplicationClone.date = new Date().toLocaleDateString();
    }

    updateUserEntries([...currentUser.entries, newApplicationClone]);
    openSnackBar("Application saved successfully", "success");
  };

  const updateApplicationHandler = (applicationToUpdate: ApplicationType) => {
    const entriesClone = cloneDeep(currentUser.entries);
    const relevantApplicationIndex = entriesClone.findIndex(
      (el) => el.id === applicationToUpdate.id
    );
    if (relevantApplicationIndex !== -1) {
      entriesClone[relevantApplicationIndex] = applicationToUpdate;
      updateUserEntries([...entriesClone]);

      openSnackBar("Application updated successfully", "success");
    } else {
      console.error(
        `[updateApplicationHandler] Application with id ${applicationToUpdate.id} does not exists`
      );
    }
  };

  const deleteApplicationByIdHandler = (idToDelete: string) => {
    if (!currentUser.entries) {
      console.error("[deleteApplicationByIdHandler] There is no data");
      setIdToDelete("");
      return;
    }
    const clonedEntries = cloneDeep(currentUser.entries);
    const filteredEntries = clonedEntries.filter(
      (application) => application.id !== idToDelete
    );
    updateUserEntries(filteredEntries);
    openSnackBar("Application deleted successfully", "success");
    setIdToDelete("");
  };

  const editApplicationByIdHandler = (idToEdit: string) => {
    const dataClone = cloneDeep(currentUser.entries);
    const relevantApplication = dataClone.find(
      (application) => application.id === idToEdit
    );
    if (relevantApplication) {
      setApplicationToEdit(relevantApplication);
    } else {
      console.error(
        `[editApplicationByIdHandler] relevantApplication id ${idToEdit} does not exists`
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
      saveInLocalStorage(LOCAL_STORAGE_DATA_KEY, userClone);
    } else {
      openSnackBar("Save error", "error");
    }
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
        }}
      >
        <Box
          display={"flex"}
          flexDirection={{ xs: "column", md: "row" }}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box
            display={"flex"}
            flex={1}
            gap={2}
            alignItems={"center"}
            justifyContent={"flex-start"}
          >
            <Tooltip title="Add new application">
              <Fab
                color="primary"
                aria-label="Add new application"
                size="small"
                onClick={() => setApplicationToEdit(emptyApplication)}
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

          <Box display={"flex"} flex={1} justifyContent={"center"}>
            <SearchBar
              applications={currentUser.entries}
              setFilteredApplications={setFilteredApplications}
            />
          </Box>

          <Box display={"flex"} flex={1} />
        </Box>
        <Grid container overflow={"auto"}>
          {currentUser.entries && currentUser.entries.length > 0 ? (
            <MainTable
              data={filteredApplications || currentUser.entries}
              deleteHandler={setIdToDelete}
              editHandler={editApplicationByIdHandler}
            />
          ) : (
            <Box display={"flex"} flex={1} justifyContent={"center"}>
              <Typography variant="h5">Add new applications!</Typography>
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
      {ApplicationToEdit && (
        <ApplicationFormModal
          closeModal={() => setApplicationToEdit(undefined)}
          onCreate={createApplicationHandler}
          onUpdate={updateApplicationHandler}
          application={ApplicationToEdit}
        />
      )}
      {userLinksToEdit && (
        <UserLinksFormModal
          closeModal={() => setUserLinksToEdit(undefined)}
          onSave={saveUserLinksHandler}
          userLinks={userLinksToEdit}
        />
      )}
      {idToDelete && (
        <ConfirmDeleteModal
          closeModal={() => setIdToDelete("")}
          onConfirm={() => {
            deleteApplicationByIdHandler(idToDelete);
          }}
        />
      )}
    </>
  );
};
