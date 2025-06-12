import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useReportContext } from "../../context/report/ReportContext";
import MyEditor from "../my-editor/MyEditor";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const CreateReportModal = ({ open, onClose }: Props) => {
  const { addReport } = useReportContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newReport = {
      id: crypto.randomUUID(),
      title: title.trim(),
      content,
      createdAt: new Date().toISOString(),
    };

    addReport(newReport);
    onClose();
    setTitle("");
    setContent("");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Create New Report</DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <TextField
            required
            fullWidth
            label="Title"
            value={title}
            margin="normal"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
          />

          <MyEditor content={content} setContent={setContent} />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>

          <Button type="submit" variant="contained" disabled={!title.trim()}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
