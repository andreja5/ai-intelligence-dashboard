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
import { useModal } from "../../context/modal/ModalContext";

/**
 * ReportModal component for creating or editing reports.
 *
 * Features:
 * - Displays a dialog with a form to input report title and content.
 * - Uses a rich text editor for content input.
 * - Handles both creation of new reports and editing existing ones.
 * - Validates that the title is not empty before submission.
 *
 * @returns {JSX.Element} The rendered modal component.
 */
const ReportModal = () => {
  const { modalType, modalData, isOpen, closeModal } = useModal();
  const { addReport, updateReport } = useReportContext();

  const isEdit = modalType === "edit";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (isEdit && modalData) {
      setTitle(modalData.title);
      setContent(modalData.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [isEdit, modalData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    if (isEdit && modalData) {
      updateReport({
        ...modalData,
        title: title.trim(),
        content,
      });
    } else {
      addReport({
        title: title.trim(),
        content,
      });
    }

    closeModal();
    setTitle("");
    setContent("");
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth="md">
      <DialogTitle>{isEdit ? "Edit Report" : "Create New Report"}</DialogTitle>

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
          <Button onClick={closeModal}>Cancel</Button>

          <Button type="submit" variant="contained" disabled={!title.trim()}>
            {isEdit ? "Save Changes" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ReportModal;
