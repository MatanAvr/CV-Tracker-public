import { useForm } from "react-hook-form";
import { TextField, Stack, capitalize, Dialog } from "@mui/material";
import { ApplicationType } from "../../Types/Types";
import { APPLICATION_PREFIX, emptyApplication } from "../../Consts/Const";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplicationSchema } from "../../Schemas/Schemas";
import { LoadingButton } from "@mui/lab";
import { generateIdWithPrefix } from "../../Utils/generateIdWithPrefix";
import { useEffectOnce } from "../../hooks/useEffectOnce";
import { useState } from "react";
import { deepEqual } from "../../Utils/Utils";

type ApplicationFormModalProps = {
  closeModal: () => void;
  onCreate: (application: ApplicationType) => void;
  onUpdate: (applicationToUpdate: ApplicationType) => void;
  application: ApplicationType;
};

export const ApplicationFormModal = ({
  application,
  onCreate,
  onUpdate,
  closeModal,
}: ApplicationFormModalProps) => {
  const [mode, setMode] = useState<"create" | "update">("create");

  useEffectOnce(() => {
    // if application have id - means 'update' mode
    if (application.id) {
      setMode("update");
    }
  }, []);

  const localApplication: ApplicationType = application.id
    ? application
    : {
        ...emptyApplication,
        id: generateIdWithPrefix(APPLICATION_PREFIX),
        date: new Date().toLocaleDateString(),
        status: "Sent CV",
      };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ApplicationType>({
    defaultValues: {
      ...localApplication,
    },
    resolver: zodResolver(ApplicationSchema),
  });

  const onSubmit = (localApplication: ApplicationType) => {
    if (!deepEqual(application, localApplication)) {
      if (mode === "create") {
        onCreate(localApplication);
      } else if (mode === "update") {
        onUpdate(localApplication);
      }
    }
    closeModal();
  };

  return (
    <Dialog id="application-dialog" onClose={closeModal} open={true}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack gap={2} sx={{ p: 2 }}>
          <TextField
            size="small"
            label={capitalize("date")}
            type="text"
            {...register("date")}
            error={!!errors.date}
            helperText={errors.date?.message}
            required
            placeholder="DD/MM/YYYY"
          />

          <TextField
            size="small"
            label={capitalize("company")}
            type="text"
            {...register("company")}
            error={!!errors.company}
            helperText={errors.company?.message}
            required
          />

          <TextField
            size="small"
            label={capitalize("role")}
            type="text"
            {...register("role")}
            error={!!errors.role}
            helperText={errors.role?.message}
            required
          />

          <TextField
            size="small"
            label={capitalize("link")}
            type="text"
            {...register("link")}
            error={!!errors.link}
            helperText={errors.link?.message}
          />

          <TextField
            size="small"
            label={capitalize("status")}
            type="status"
            {...register("status")}
            error={!!errors.status}
            helperText={errors.status?.message}
          />

          <TextField
            size="small"
            label={capitalize("notes")}
            type="notes"
            {...register("notes")}
            error={!!errors.notes}
            helperText={errors.notes?.message}
            multiline
            rows={4}
          />

          <LoadingButton type="submit" variant="contained">
            {mode === "create" ? "Save" : "Update"}
          </LoadingButton>
        </Stack>
      </form>
    </Dialog>
  );
};
