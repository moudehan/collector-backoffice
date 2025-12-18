import { enqueueSnackbar } from "notistack";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { showAlertPopup } from "../AlertPopop";

vi.mock("notistack", () => ({
  enqueueSnackbar: vi.fn(),
}));

describe("showAlertPopup", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows error alert for high severity", () => {
    showAlertPopup({
      type: "system",
      title: "Erreur critique",
      message: "Une erreur est survenue",
      severity: "high",
    });

    expect(enqueueSnackbar).toHaveBeenCalledWith(
      "🚨 Erreur critique — Une erreur est survenue",
      { variant: "error" }
    );
  });

  it("shows warning alert for medium severity", () => {
    showAlertPopup({
      type: "user",
      title: "Attention",
      message: "Action risquée",
      severity: "medium",
    });

    expect(enqueueSnackbar).toHaveBeenCalledWith(
      "⚠️ Attention — Action risquée",
      { variant: "warning" }
    );
  });

  it("shows success alert for success severity", () => {
    showAlertPopup({
      type: "info",
      title: "Succès",
      message: "Opération réussie",
      severity: "success",
    });

    expect(enqueueSnackbar).toHaveBeenCalledWith(
      "✅ Succès — Opération réussie",
      { variant: "success" }
    );
  });

  it("shows info alert when severity is undefined", () => {
    showAlertPopup({
      type: "info",
      title: "Information",
      message: "Message informatif",
    });

    expect(enqueueSnackbar).toHaveBeenCalledWith(
      "ℹ️ Information — Message informatif",
      { variant: "info" }
    );
  });
});
