import { Toolbar, Box, Typography, styled, IconButton } from "@mui/material";
import logoIcon from "../Assets/images/CV-tracker-logo.webp";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import SettingsIcon from "@mui/icons-material/Settings";
import { APP_NAME, DRAWER_WIDTH, HEADER_HEIGHT } from "../Consts/ui";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface HeaderProps {
  open: boolean;
  toggleDrawer: () => void;
}
export default function Header({ open, toggleDrawer }: HeaderProps) {
  return (
    <AppBar
      position="absolute"
      open={open}
      sx={{
        height: HEADER_HEIGHT,
        maxHeight: HEADER_HEIGHT,
      }}
    >
      <Toolbar
        sx={
          {
            // pr: "16px", // keep right padding when drawer closed
          }
        }
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            mr: 1,
            ...(open && { display: "none" }),
          }}
        >
          <SettingsIcon />
        </IconButton>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <img src={logoIcon} height={35} width={35} alt="logo" />
        </Box>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, ml: 1 }}
        >
          {APP_NAME}
        </Typography>
        {/* <IconButton color="inherit">
        <Badge badgeContent={0} color="secondary">
          <AccountCircleRoundedIcon fontSize="large" />
        </Badge>
      </IconButton> */}
      </Toolbar>
    </AppBar>
  );
}
