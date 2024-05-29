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
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        mt="auto"
        p={0.5}
      >
        <Divider flexItem />
        <Typography variant="caption">Version: 0.0.6</Typography>
      </Box>
    </Drawer>
  );
};

export default MyDrawer;
