import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useReportContext } from "../../context/report/ReportContext";
import { ReportCard } from "../../components/report-card/ReportCard";
import { useMemo } from "react";
import { useDebounce } from "../../hooks/useDebounce";

interface Props {
  search: string;
}

export const ReportList = ({ search }: Props) => {
  const debouncedSearch = useDebounce(search, 300);
  const { reports, loading } = useReportContext();

  const filteredReports = useMemo(() => {
    if (!debouncedSearch.trim()) return reports;

    const query = debouncedSearch.trim().toLowerCase();

    return reports?.filter((report) =>
      report.title.toLowerCase().includes(query)
    );
  }, [reports, debouncedSearch]);

  return (
    <Box sx={{ flexGrow: 1, py: 4, px: 2 }}>
      <Typography
        variant="h4"
        fontWeight={600}
        marginBottom={4}
        textAlign={"center"}
        textTransform={"uppercase"}
      >
        ALL Reports
      </Typography>
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
        <Grid container spacing={2}>
          {filteredReports?.map((report) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={report.id}>
              <ReportCard report={report} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
