import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useState } from "react";
import Header from "../Component/Header";
import { Applications } from "../Component/Applications";
import Welcome from "../Component/Welcome";
import { HEADER_HEIGHT } from "../Consts/ui";
import { UserType } from "../Types/Types";
import { useEffectOnce } from "../hooks/useEffectOnce";
import MyDrawer from "../Component/MyDrawer";
import {
  LOCAL_STORAGE_DATA_KEY,
  USER_PREFIX,
  emptyUser,
} from "../Consts/Const";
import { loadFromLocalStorage, saveInLocalStorage } from "../Utils/Utils";
import { generateIdWithPrefix } from "../Utils/generateIdWithPrefix";
import { Routes, Route } from "react-router-dom";
import { useMyNavigation } from "../hooks/useMyNavigation";

export const Home = () => {
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType>();
  const nav = useMyNavigation();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffectOnce(() => {
    const localUser = loadFromLocalStorage(LOCAL_STORAGE_DATA_KEY);
    if (localUser) {
      setCurrentUser(localUser);
      nav.push("Applications");
    }
  }, []);

  const saveNewUser = () => {
    const newUser = { ...emptyUser, id: generateIdWithPrefix(USER_PREFIX) };
    saveInLocalStorage(LOCAL_STORAGE_DATA_KEY, newUser);
    setCurrentUser(newUser);
    nav.push("Applications");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header toggleDrawer={toggleDrawer} open={open} />
      <MyDrawer toggleDrawer={toggleDrawer} open={open} />
      <Box
        component="main"
        sx={{
          mt: HEADER_HEIGHT / 8,
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          overflow: "auto",
          display: "flex",
          flex: 1,
          p: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Routes>
          <Route path="/" element={<Welcome saveNewUser={saveNewUser} />} />
          <Route
            path="/Applications"
            element={currentUser && <Applications user={currentUser} />}
          />
        </Routes>
      </Box>
    </Box>
  );
};
