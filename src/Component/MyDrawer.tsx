import { Toolbar, IconButton, Divider } from "@mui/material";
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
      {/* <List component="nav">{mainListItems}</List> */}
    </Drawer>
  );
};

export default MyDrawer;
