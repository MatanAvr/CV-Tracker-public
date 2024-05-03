import { useForm } from "react-hook-form";
import { TextField, Stack, capitalize, Dialog } from "@mui/material";
import { EntryType } from "../../Types/Types";
import { ENTRY_PREFIX, emptyEntry } from "../../Consts/Const";
import { zodResolver } from "@hookform/resolvers/zod";
import { EntrySchema } from "../../Schemas/Schemas";
import { LoadingButton } from "@mui/lab";
import { generateIdWithPrefix } from "../../Utils/generateIdWithPrefix";
import { useEffectOnce } from "../../hooks/useEffectOnce";
import { useState } from "react";
import { deepEqual } from "../../Utils/Utils";

type EntryFormModalProps = {
  closeModal: () => void;
  onCreate: (entry: EntryType) => void;
  onUpdate: (entryToUpdate: EntryType) => void;
  entry: EntryType;
};

export const EntryFormModal = ({
  entry,
  onCreate,
  onUpdate,
  closeModal,
}: EntryFormModalProps) => {
  const [mode, setMode] = useState<"create" | "update">("create");

  useEffectOnce(() => {
    // if entry have id - means 'update' mode
    if (entry.id) {
      setMode("update");
    }
  }, []);

  const localEntry: EntryType = entry.id
    ? entry
    : {
        ...emptyEntry,
        id: generateIdWithPrefix(ENTRY_PREFIX),
        date: new Date().toLocaleDateString(),
        status: "Sent CV",
      };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EntryType>({
    defaultValues: {
      ...localEntry,
    },
    resolver: zodResolver(EntrySchema),
  });

  const onSubmit = (localEntry: EntryType) => {
    if (!deepEqual(entry, localEntry)) {
      if (mode === "create") {
        onCreate(localEntry);
      } else if (mode === "update") {
        onUpdate(localEntry);
      }
    }
    closeModal();
  };

  return (
    <Dialog id="entry-dialog" onClose={closeModal} open={true}>
      <Stack key={"dialog-box"} gap={2} sx={{ p: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack gap={2} sx={{ p: 2 }} width={300}>
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

            <LoadingButton type="submit" variant="contained" color="primary">
              {mode === "create" ? "Save" : "Update"}
            </LoadingButton>
          </Stack>
        </form>
      </Stack>
    </Dialog>
  );
};

// {Object.keys(emptyEntry).map((ObjKey, index) => {
//     const keyWithType = ObjKey as keyof EntryType;
//     return (
//       <TextField
//         size="small"
//         key={`form-input-${index}`}
//         label={capitalize(keyWithType)}
//         type="text"
//         {...register(keyWithType, {
//           required: `${keyWithType} is required`,
//         })}
//         error={!!errors[keyWithType]}
//         helperText={errors[keyWithType]?.message}
//       />
//     );
//   })}
