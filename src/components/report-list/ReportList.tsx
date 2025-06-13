import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useReportContext } from "../../context/report/ReportContext";
import { ReportCard } from "../../components/report-card/ReportCard";
import { useMemo } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useSortableList } from "../../hooks/useSortableList";
import { SortableItemWrapper } from "../../components/sortable-item-wrapper/SortableItemWrapper";
import { DragOverlay } from "@dnd-kit/core";
import AddIcon from "@mui/icons-material/Add";
import { useUser } from "../../context/user/UserContext";
import { useModal } from "../../context/modal/ModalContext";

const LOCAL_KEY =
  import.meta.env.VITE_LOCAL_STORAGE_KEY || "ai-dashboard-reports";

interface Props {
  search: string;
}

/**
 * Displays a list of reports with search and drag-and-drop sorting functionality.
 *
 * - Filters reports based on the provided search string (debounced).
 * - Allows reordering of reports via drag-and-drop, persisting the new order to localStorage.
 * - Shows loading indicator while reports are being fetched.
 * - Displays a message if no reports match the search criteria.
 *
 * @param {Object} props - Component props.
 * @param {string} props.search - The search query used to filter reports.
 *
 * @returns {JSX.Element} The rendered report list component.
 */
export const ReportList = ({ search }: Props) => {
  const { isViewer } = useUser();
  const { openModal } = useModal();

  const debouncedSearch = useDebounce(search, 300);
  const { reports, loading, setReports } = useReportContext();

  const filteredReports = useMemo(() => {
    if (!debouncedSearch.trim()) return reports;

    const query = debouncedSearch.trim().toLowerCase();

    return reports?.filter((report) =>
      report.title.toLowerCase().includes(query)
    );
  }, [reports, debouncedSearch]);

  const { DndWrapper, activeId } = useSortableList({
    items: reports || [],
    getId: (r) => r.id,
    onReorder: (newReports) => {
      setReports(newReports);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(newReports));
    },
  });

  const activeReport = useMemo(() => {
    if (!activeId) return null;
    return reports?.find((report) => report.id === activeId) || null;
  }, [activeId, reports]);

  return (
    <Box sx={{ flexGrow: 1, py: 4, px: 2 }}>
      <Box
        mb={4}
        pl={4}
        pr={4}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography
          variant="h4"
          fontWeight={600}
          textAlign={"center"}
          textTransform={"uppercase"}
        >
          ALL Reports
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          disabled={isViewer}
          onClick={() =>
            openModal("generateDraft", {
              prompt: "Give me some ideas for a new report",
            })
          }
        >
          Generate Draft Report
        </Button>
      </Box>
      {loading ? (
        <Box width="100%" display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : filteredReports?.length === 0 ? (
        <Box width="100%" display="flex" justifyContent="center" mt={4}>
          <Typography variant="h6" color="textSecondary">
            No reports found
          </Typography>
        </Box>
      ) : (
        <DndWrapper>
          <Grid container spacing={2}>
            {filteredReports?.map((report) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={report.id}>
                <SortableItemWrapper id={report.id}>
                  <ReportCard report={report} />
                </SortableItemWrapper>
              </Grid>
            ))}
          </Grid>

          <DragOverlay adjustScale={false}>
            {activeReport ? (
              <div style={{ width: "100%" }}>
                <ReportCard report={activeReport} />
              </div>
            ) : null}
          </DragOverlay>
        </DndWrapper>
      )}
    </Box>
  );
};
