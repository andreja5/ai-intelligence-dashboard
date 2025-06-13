import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useReportContext } from "../../context/report/ReportContext";
import { useToast } from "../../context/notifications/ToastContext";
import { getErrorMessage } from "../../utils/getErrorMessage";

interface Props {
  open: boolean;
  onClose: () => void;
  initialPrompt: string | undefined;
}

const VITE_API_URL = import.meta.env.VITE_API_URL;

/**
 * DraftModal component allows users to generate a draft report
 *
 * @param {boolean} open - Whether the modal is open.
 * @param {function} onClose - Function to call when the modal is closed.
 * @param {function} initialPrompt - The initial prompt to pre-fill the input field.
 * @returns {JSX.Element} The rendered DraftModal component.
 */
const DraftModal = ({ open, onClose, initialPrompt }: Props) => {
  const [prompt, setPrompt] = useState(initialPrompt || "");
  const [loading, setLoading] = useState(false);
  const { addReport } = useReportContext();
  const { showToast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(`${VITE_API_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      const title = data.title || "Untitled Draft";
      const content = data.content || "<p>No content generated.</p>";

      addReport({ title, content });
      showToast("Draft generated successfully", "success");
      onClose();
      setPrompt("");
    } catch (error) {
      showToast(getErrorMessage(error), "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Generate Draft from Prompt</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Enter a prompt"
          multiline
          minRows={3}
          fullWidth
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleGenerate}
          variant="contained"
          disabled={loading || !prompt.trim()}
        >
          {loading ? <CircularProgress size={20} /> : "Generate"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DraftModal;
