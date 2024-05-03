import { useForm } from "react-hook-form";
import { TextField, Stack, capitalize, Dialog } from "@mui/material";
import { UserLinksType } from "../../Types/Types";
import { zodResolver } from "@hookform/resolvers/zod";
import { EntrySchema, UserLinksSchema } from "../../Schemas/Schemas";
import { LoadingButton } from "@mui/lab";
import { deepEqual } from "../../Utils/Utils";

type UserLinksFormModalProps = {
  userLinks: UserLinksType;
  onSave: (userLinks: UserLinksType) => void;
  closeModal: () => void;
};

export const UserLinksFormModal = ({
  userLinks,
  onSave,
  closeModal,
}: UserLinksFormModalProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserLinksType>({
    defaultValues: {
      ...userLinks,
    },
    resolver: zodResolver(UserLinksSchema),
  });

  const onSubmit = (localUserLinks: UserLinksType) => {
    if (!deepEqual(userLinks, localUserLinks)) {
      onSave(localUserLinks);
    }
    closeModal();
  };

  return (
    <Dialog id="user-links-dialog" onClose={closeModal} open={true}>
      <Stack key={"dialog-box"} gap={2} sx={{ p: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack gap={2} sx={{ p: 2 }} width={300}>
            <TextField
              size="small"
              label={capitalize("email")}
              type="text"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              placeholder="example@gmail.com"
            />
            <TextField
              size="small"
              label={capitalize("Linkedin link")}
              type="text"
              {...register("linkedinLink")}
              error={!!errors.linkedinLink}
              helperText={errors.linkedinLink?.message}
              placeholder="http://www.linkedin.com/example"
            />
            <TextField
              size="small"
              label={capitalize("GitHub link")}
              type="text"
              {...register("githubLink")}
              error={!!errors.githubLink}
              helperText={errors.githubLink?.message}
              placeholder="http://www.github.com/example"
            />
            <TextField
              size="small"
              label={capitalize("Website Link")}
              type="text"
              {...register("personalWebsiteLink")}
              error={!!errors.personalWebsiteLink}
              helperText={errors.personalWebsiteLink?.message}
              placeholder="http://www.example.com"
            />

            <LoadingButton type="submit" variant="contained" color="primary">
              Save
            </LoadingButton>
          </Stack>
        </form>
      </Stack>
    </Dialog>
  );
};
