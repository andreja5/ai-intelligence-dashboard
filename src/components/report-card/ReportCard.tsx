import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SummarizeIcon from "@mui/icons-material/Summarize";
import type { Report } from "../../types/Report";

interface Props {
  report: Report;
  onEdit: (report: Report) => void;
  onDelete: (id: string) => void;
  onSummarize: (report: Report) => void;
}

export const ReportCard = ({
  report,
  onEdit,
  onDelete,
  onSummarize,
}: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {report.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {report.content.replace(/<[^>]+>/g, "")} {/* Strips HTML */}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Box sx={{ minWidth: "fit-content" }}>
          <IconButton onClick={() => onEdit(report)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onSummarize(report)}>
            <SummarizeIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(report.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>

        <Typography
          noWrap
          sx={{ mr: 2 }}
          variant="caption"
          color="text.secondary"
        >
          Created at: {new Date(report.createdAt).toLocaleString()}
        </Typography>
      </CardActions>
    </Card>
  );
};
