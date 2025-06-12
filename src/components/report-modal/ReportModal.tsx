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
