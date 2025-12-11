import { Alert, Box, Button, Modal, Typography } from "@mui/material";

interface Props {
  open: boolean;
  label: string;
  error?: string | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ModalDeleteConfirm({
  open,
  label,
  error,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          bgcolor: "white",
          width: 450,
          mx: "auto",
          mt: 10,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Êtes-vous sûr de supprimer "{label}" ?
        </Typography>

        <Typography mb={2}>Cette action est irréversible.</Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Button variant="contained" color="error" fullWidth onClick={onConfirm}>
          Supprimer définitivement
        </Button>

        <Button fullWidth sx={{ mt: 1 }} onClick={onClose}>
          Annuler
        </Button>
      </Box>
    </Modal>
  );
}
