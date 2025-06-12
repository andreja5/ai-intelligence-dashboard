import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SummarizeIcon from "@mui/icons-material/Summarize";
import type { Report } from "../../types/Report";
import { useState } from "react";
import DOMPurify from "dompurify";
import { useReportContext } from "../../context/report/ReportContext";
import { useModal } from "../../context/modal/ModalContext";

interface Props {
  report: Report;
  maxPreviewChars?: number; // Maximum characters to define if truncation is needed
  collapsedHeight?: number; // Height of the card when collapsed
}

export const ReportCard = ({
  report,
  maxPreviewChars = 20,
  collapsedHeight = 80,
}: Props) => {
  const [expanded, setExpanded] = useState(false);
  const cleanHTML = DOMPurify.sanitize(report.content);

  const { openModal } = useModal();
  const { deleteReport, summarizeReport } = useReportContext();

  const textOnly =
    new DOMParser().parseFromString(cleanHTML, "text/html").body.textContent ||
    "";
  const shouldTruncate = textOnly.length > maxPreviewChars;

  return (
    <Card
      sx={{
        mb: 2,
        width: "auto",
        display: "flex",
        height: expanded ? "none" : "220px",
        position: "relative",
        flexDirection: "column",
        zIndex: expanded ? 10 : 1,
        overflow: expanded ? "visible" : "hidden",
      }}
    >
      <CardContent
        sx={{
          width: "100%",
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        <Box
          display={"flex"}
          flexDirection="row"
          alignItems={"center"}
          justifyContent="space-between"
        >
          <Typography variant="h6">{report.title}</Typography>

          {shouldTruncate && (
            <Button
              size="small"
              sx={{ mr: "10px" }}
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? "Show Less" : "Read More"}
            </Button>
          )}
        </Box>

        <Box
          sx={{
            overflow: "hidden",
            position: "relative",
            transition: "max-height 0.3s ease",
            maxHeight: expanded ? "none" : collapsedHeight,
          }}
        >
          <div
            className="report-content"
            dangerouslySetInnerHTML={{ __html: cleanHTML }}
          />
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <Box sx={{ minWidth: "fit-content" }}>
          <IconButton onClick={() => openModal("edit", report)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => summarizeReport(report.id)}>
            <SummarizeIcon />
          </IconButton>
          <IconButton onClick={() => deleteReport(report.id)}>
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
