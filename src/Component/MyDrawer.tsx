import {
  Toolbar,
  IconButton,
  Divider,
  Alert,
  Box,
  Typography,
} from "@mui/material";
import { Drawer } from "./Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// const changeLogArr = [
//   {
//     date: "4.5.24",
//     version: "0.0.1",
//     title: "Inital realese",
//     description: "",
//   },
//   {
//     date: "4.5.24",
//     version: "0.0.2",
//     title: "Improved responsiveness",
//     description: "",
//   },
//   ,
//   {
//     date: "4.5.24",
//     version: "0.0.3",
//     title: "Add 'confirm delete' modal",
//     description: "",
//   },
// ];

type MyDrawerProps = { open: boolean; toggleDrawer: () => void };

const MyDrawer = ({ open, toggleDrawer }: MyDrawerProps) => {
  return (
    <Drawer variant="permanent" open={open} sx={{ overflow: "hidden" }}>
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
      <Alert severity="info">Coming soon!</Alert>
      {/* <Box p={0.5}>
        {changeLogArr.reverse().map((change, index) => {
          return (
            <Stack key={`chamge-log-entry-${index}`}>
              <Divider flexItem />
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography variant="caption">{change?.date}</Typography>
                <Typography variant="caption">V:{change?.version}</Typography>
              </Box>
              <Typography variant="caption">{change?.title}</Typography>
            </Stack>
          );
        })}
      </Box> */}
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        mt="auto"
        p={0.5}
      >
        <Divider flexItem />
        <Typography variant="caption">Version: 0.0.3</Typography>
      </Box>
    </Drawer>
  );
};

export default MyDrawer;
