import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface ModalField {
  name: string;
  label: string;
  multiline?: boolean;
  required?: boolean;
}

interface Props<T> {
  open: boolean;
  title: string;
  fields: ModalField[];
  initialValues: T;
  onClose: () => void;
  onSubmit: (values: T) => Promise<void>;
}

export default function ModalEditForm<T extends { [key: string]: string }>({
  open,
  title,
  fields,
  initialValues,
  onClose,
  onSubmit,
}: Props<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;

    queueMicrotask(() => {
      setValues(initialValues);
      setErrors({});
    });
  }, [open, initialValues]);

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      if (field.required && !values[field.name]?.trim()) {
        newErrors[field.name] = "Champ obligatoire";
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    await onSubmit(values);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          bgcolor: "white",
          width: 550,
          mx: "auto",
          mt: 10,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          {title}
        </Typography>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          {fields.map((field) => {
            const error = errors[field.name];

            return (
              <TextField
                key={field.name}
                fullWidth
                label={field.label}
                required={field.required}
                multiline={field.multiline}
                value={values[field.name] ?? ""}
                error={!!error}
                helperText={error}
                onChange={(e) => {
                  const value = e.target.value;

                  setValues((prev) => ({ ...prev, [field.name]: value }));

                  if (error && value.trim() !== "") {
                    setErrors((prev) => {
                      const copy = { ...prev };
                      delete copy[field.name];
                      return copy;
                    });
                  }
                }}
              />
            );
          })}
        </Box>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleSubmit}
        >
          Enregistrer
        </Button>
      </Box>
    </Modal>
  );
}
