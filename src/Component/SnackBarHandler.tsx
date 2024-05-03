import { Snackbar, Alert } from "@mui/material";
import { SNACKBAR_TIMEOUT } from "../Consts/ui";

type SnackBarHandlerProps = {
  isSnackBarOpen: boolean;
  closeSnackBar: (_?: React.SyntheticEvent | Event, reason?: string) => void;
  snackBarColor: any;
  snackBarMessage: any;
};

const SnackBarHandler = ({
  isSnackBarOpen,
  closeSnackBar,
  snackBarColor,
  snackBarMessage,
}: SnackBarHandlerProps) => {
  return isSnackBarOpen ? (
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
  ) : (
    <></>
  );
};

export default SnackBarHandler;
