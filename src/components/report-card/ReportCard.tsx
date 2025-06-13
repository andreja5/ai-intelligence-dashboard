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
import { useUser } from "../../context/user/UserContext";

interface Props {
  report: Report;
  maxPreviewChars?: number; // Maximum characters to define if truncation is needed
  collapsedHeight?: number; // Height of the card when collapsed
}

/**
 * ReportCard component displays a summary card for a given report.
 *
 * Features:
 * - Shows the report title and a preview of its content (with HTML sanitized).
 * - Truncates content preview if it exceeds a specified character limit, with "Read More"/"Show Less" toggle.
 * - Provides action buttons for editing, summarizing, and deleting the report.
 * - Displays the report's creation date.
 *
 * @param report - The report object to display.
 * @param maxPreviewChars - Optional. Maximum number of characters to show before truncating content. Defaults to 20.
 * @param collapsedHeight - Optional. Height of the card when collapsed. Defaults to 80.
 *
 * @returns A Material-UI Card component representing the report.
 */
export const ReportCard = ({
  report,
  maxPreviewChars = 20,
  collapsedHeight = 80,
}: Props) => {
  const [expanded, setExpanded] = useState(false);
  const cleanHTML = DOMPurify.sanitize(report.content);

  const { openModal } = useModal();
  const { deleteReport, summarizeReport, setLoading } = useReportContext();
  const { isViewer } = useUser();

  const textOnly =
    new DOMParser().parseFromString(cleanHTML, "text/html").body.textContent ||
    "";
  const shouldTruncate = textOnly.length > maxPreviewChars;

  const handleSummarize = async () => {
    setLoading(true);

    await summarizeReport(report.id);
    setLoading(false);
  };

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
          <IconButton
            disabled={isViewer}
            onClick={() => openModal("edit", report)}
          >
            <EditIcon />
          </IconButton>
          <IconButton disabled={isViewer} onClick={handleSummarize}>
            <SummarizeIcon />
          </IconButton>
          <IconButton
            disabled={isViewer}
            onClick={() => deleteReport(report.id)}
          >
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
