import {
  Dialog,
  Stack,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { EntryType, Tstatus, statusArr } from "../Types/Types";
import LoadingButton from "@mui/lab/LoadingButton";
import { deepEqual } from "../Utils/Utils";
import { defaultEntry } from "../Consts/Const";

interface EntryModalProps {
  open: boolean;
  closeModal: () => void;
  onSave: (entry: EntryType) => void;
  entry: EntryType;
}

export default function EntryModal({
  closeModal,
  open,
  onSave,
  entry,
}: EntryModalProps) {
  const [localEntry, setLocalEntry] = useState<EntryType>(
    entry || defaultEntry
  );
  const [isChanged, setIsChanged] = useState<boolean>(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setIsChanged(true);
    const { id, value } = e.target;
    if (id === "date" && value.length > 12) return;
    if (id === "company" && value.length > 25) return;
    if (id === "notes" && value.length > 400) return;
    setLocalEntry((prev) => {
      return { ...prev, [id]: value };
    });
  };

  const statusChangeHandler = (event: SelectChangeEvent<string>) => {
    setIsChanged(true);
    const value = event.target.value as Tstatus;
    setLocalEntry((prev) => {
      return { ...prev, status: value };
    });
  };

  const saveHandler = () => {
    // validate fields
    // check if fields changed
    if (isChanged && !deepEqual(entry, localEntry)) {
      onSave(localEntry);
    }
    closeModal();
  };

  return (
    <Dialog id="entry-dialog" onClose={closeModal} open={open}>
      <Stack key={"dialog-box"} gap={2} sx={{ p: 3 }}>
        <TextField
          id={"Date".toLowerCase()}
          label="Date"
          value={localEntry.date}
          size="small"
          onChange={onChange}
          required
          placeholder="DD/MM/YYYY"
        />

        <TextField
          id={"Company".toLowerCase()}
          label="Company"
          value={localEntry.company}
          size="small"
          onChange={onChange}
          required
        />

        <TextField
          id={"Role".toLowerCase()}
          label="Role"
          value={localEntry.role}
          size="small"
          onChange={onChange}
          required
        />

        <TextField
          id={"Link".toLowerCase()}
          label="Link"
          value={localEntry.link}
          size="small"
          onChange={onChange}
        />

        <FormControl>
          <InputLabel id="status-select-label" size="small">
            Status
          </InputLabel>
          <Select
            labelId="status-select-label"
            id={"Status".toLowerCase()}
            value={localEntry.status}
            label="Status"
            size="small"
            onChange={statusChangeHandler}
          >
            {statusArr.map((status, index) => {
              return (
                <MenuItem key={`status-menu-item-${index}`} value={status}>
                  {status}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <TextField
          id={"Notes".toLowerCase()}
          label="Notes"
          value={localEntry.notes}
          size="small"
          onChange={onChange}
          multiline
          rows={4}
          helperText={`${localEntry.notes.length}/400`}
        />

        <LoadingButton onClick={saveHandler} variant="contained">
          Save
        </LoadingButton>
      </Stack>
    </Dialog>
  );
}
