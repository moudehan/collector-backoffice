import { enqueueSnackbar } from "notistack";

export type AlertPopupOptions = {
  type: "fraud" | "system" | "user" | "info";
  title: string;
  message: string;
  severity?:
    | "high"
    | "medium"
    | "low"
    | "error"
    | "warning"
    | "info"
    | "success";
};

export function showAlertPopup(options: AlertPopupOptions) {
  let icon = "";
  let variant: "default" | "error" | "warning" | "success" | "info" = "default";

  switch (options.severity) {
    case "high":
    case "error":
      icon = "🚨";
      variant = "error";
      break;

    case "medium":
    case "warning":
      icon = "⚠️";
      variant = "warning";
      break;

    case "success":
      icon = "✅";
      variant = "success";
      break;

    default:
      icon = "ℹ️";
      variant = "info";
      break;
  }

  enqueueSnackbar(`${icon} ${options.title} — ${options.message}`, {
    variant,
  });
}
