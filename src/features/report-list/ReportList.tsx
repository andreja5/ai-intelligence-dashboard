import { Box, Grid, Typography } from "@mui/material";
import { useReports } from "../../context/report/ReportContext";
import { ReportCard } from "../../components/report-card/ReportCard";
import { useCallback, useMemo } from "react";

interface Props {
  search: string;
}

export const ReportList = ({ search }: Props) => {
  const { reports, deleteReport } = useReports();

  const handleEdit = useCallback((report: any) => {
    console.log("Edit:", report);
  }, []);

  const handleSummarize = useCallback((report: any) => {
    console.log("Summarize:", report);
  }, []);

  const filteredReports = useMemo(() => {
    return reports.filter((r) =>
      r.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [reports, search]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h5" gutterBottom>
        Reports
      </Typography>
      <Grid container spacing={2}>
        {filteredReports.map((report) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={report.id}>
            <ReportCard
              report={report}
              onEdit={handleEdit}
              onDelete={deleteReport}
              onSummarize={handleSummarize}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
