import { Tooltip, Fab } from "@mui/material";
import { emptyApplication } from "../Consts/Const";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { ApplicationType } from "../Types/Types";

type AddNewApplicationButtonProps = {
  setApplicationToEdit: (emptyApplication: ApplicationType) => void;
};

const AddNewApplicationButton = ({
  setApplicationToEdit,
}: AddNewApplicationButtonProps) => {
  return (
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
  );
};

export default AddNewApplicationButton;
