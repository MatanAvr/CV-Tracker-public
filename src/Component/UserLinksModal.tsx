import { Dialog, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { emptyUserLinks } from "../Consts/Const";
import { UserLinksType } from "../Types/Types";
import LoadingButton from "@mui/lab/LoadingButton";
import { deepEqual } from "../Utils/Utils";

type UserLinksModalProps = {
  open: boolean;
  closeModal: () => void;
  onSave: (userLinks: UserLinksType) => void;
  userLinks: UserLinksType;
};

export default function UserLinksModal({
  closeModal,
  open,
  onSave,
  userLinks,
}: UserLinksModalProps) {
  const [localUserLinks, setLocalUserLinks] = useState<UserLinksType>(
    userLinks || emptyUserLinks
  );
  const [isChanged, setIsChanged] = useState<boolean>(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setIsChanged(true);
    const { id, value } = e.target;
    if (id === "notes" && value.length > 400) return;
    setLocalUserLinks((prev) => {
      return { ...prev, [id]: value };
    });
  };

  const saveHandler = () => {
    // validate fields
    // check if fields changed
    if (isChanged && !deepEqual(userLinks, localUserLinks)) {
      onSave(localUserLinks);
    }
    closeModal();
  };

  return (
    <Dialog id="user-links-dialog" onClose={closeModal} open={open}>
      <Stack key={"dialog-box"} gap={2} sx={{ p: 2 }}>
        <TextField
          id={"email"}
          label="Email address"
          value={localUserLinks.email}
          size="small"
          onChange={onChange}
        />

        <TextField
          id={"linkedinLink"}
          label="Linkedin profile link"
          value={localUserLinks.linkedinLink}
          size="small"
          onChange={onChange}
        />

        <TextField
          id={"githubLink"}
          label="Github profile link"
          value={localUserLinks.githubLink}
          size="small"
          onChange={onChange}
        />

        <TextField
          id={"personalWebsiteLink"}
          label="Personal website link"
          value={localUserLinks.personalWebsiteLink}
          size="small"
          onChange={onChange}
        />

        <LoadingButton onClick={saveHandler} variant="contained">
          Save
        </LoadingButton>
      </Stack>
    </Dialog>
  );
}
