import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useReportContext } from "../../context/report/ReportContext";
import MyEditor from "../my-editor/MyEditor";
import type { Report } from "../../types/Report";

interface Props {
  open: boolean;
  onClose: () => void;
  report?: Report;
}

export const CreateReportModal = ({ open, onClose, report }: Props) => {
  const { addReport, updateReport } = useReportContext();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    if (report) {
      // Edit mode
      const updatedReport: Report = {
        ...report,
        title: title.trim(),
        content,
      };

      updateReport(updatedReport);
    } else {
      // Create mode
      const newReport: Report = {
        id: crypto.randomUUID(),
        title: title.trim(),
        content,
        createdAt: new Date().toISOString(),
      };
      addReport(newReport);
    }

    onClose();
  };

  useEffect(() => {
    setTitle(report?.title || "");
    setContent(report?.content || "");
  }, [report, open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{report ? "Edit Report" : "Create New Report"}</DialogTitle>

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
