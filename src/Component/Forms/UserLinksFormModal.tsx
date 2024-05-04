import { useForm } from "react-hook-form";
import { TextField, Stack, capitalize, Dialog } from "@mui/material";
import { UserLinksType } from "../../Types/Types";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserLinksSchema } from "../../Schemas/Schemas";
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

  const fieldsArr: {
    name: string;
    key: "email" | "linkedinLink" | "githubLink" | "personalWebsiteLink";
    placeholder: string;
  }[] = [
    {
      name: "Email",
      key: "email",
      placeholder: "example@gmail.com",
    },
    {
      name: "Linkedin link",
      key: "linkedinLink",
      placeholder: "http://www.linkedin.com/example",
    },
    {
      name: "GitHub link",
      key: "githubLink",
      placeholder: "http://www.github.com/example",
    },
    {
      name: "Website Link",
      key: "personalWebsiteLink",
      placeholder: "http://www.example.com",
    },
  ];

  return (
    <Dialog id="user-links-dialog" onClose={closeModal} open={true}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack gap={2} sx={{ p: 2 }}>
          {fieldsArr.map((field, index) => {
            const { key, name, placeholder } = field;
            return (
              <TextField
                key={`field-${index}`}
                size="small"
                label={capitalize(name)}
                type="text"
                {...register(key)}
                error={!!errors[key]}
                helperText={errors[key]?.message}
                placeholder={placeholder}
              />
            );
          })}
          <LoadingButton type="submit" variant="contained">
            Save
          </LoadingButton>
        </Stack>
      </form>
    </Dialog>
  );
};
