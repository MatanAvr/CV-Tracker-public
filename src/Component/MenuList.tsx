import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";

const menuItemsArr = [
  {
    icon: <DashboardIcon />,
    name: "Dashboard",
  },
];

export const mainListItems = (
  <>
    {menuItemsArr.map((menuItem, index) => {
      return (
        <ListItemButton key={`list-item-${index}`}>
          <ListItemIcon>{menuItem.icon}</ListItemIcon>
          <ListItemText primary={menuItem.name} />
        </ListItemButton>
      );
    })}
  </>
);
