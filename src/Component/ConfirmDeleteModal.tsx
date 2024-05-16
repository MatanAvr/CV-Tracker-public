import { Button, Dialog, Stack, Typography } from "@mui/material";

type ConfirmDeleteModalProps = {
  closeModal: () => void;
  onConfirm: () => void;
};

export const ConfirmDeleteModal = ({
  closeModal,
  onConfirm,
}: ConfirmDeleteModalProps) => {
  return (
    <Dialog id="confirm-delete-dialog" onClose={closeModal} open={true}>
      <Stack p={2} gap={1.5} textAlign={"center"}>
        <Typography variant="h6">Confirm deletion</Typography>
        <Typography>
          Are you sure you want to delete the application?
        </Typography>
        <Typography variant="body2">
          You won't be able to revert this!
        </Typography>
        <Button variant="contained" color="warning" onClick={onConfirm}>
          Delete
        </Button>
        <Button variant="contained" onClick={closeModal}>
          Cancel
        </Button>
      </Stack>
    </Dialog>
  );
};
