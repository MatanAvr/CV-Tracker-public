import { Typography } from "@mui/material";
import { APP_NAME } from "../Consts/Const";

export const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" py={1}>
      {`Copyright © ${APP_NAME} ${new Date().getFullYear()}`}
    </Typography>
  );
};
