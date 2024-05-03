import { Box, Link, Typography } from "@mui/material";
import { APP_NAME } from "../Consts/ui";

export const Copyright = () => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      py={1}
    >
      <Typography variant="body2">
        {`${APP_NAME} - Created by `}&nbsp;
      </Typography>
      <Link target="_blank" href="https://www.matanavraham.com/">
        Matan Avraham
      </Link>
    </Box>
  );
};
