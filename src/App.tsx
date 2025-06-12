import { useState } from "react";
import type { Report } from "./types/Report";

import { Container } from "@mui/material";
import { ReportList } from "./features/report-list/ReportList";
import { Header } from "./components/header/Header";
import { CreateReportModal } from "./components/create-report-modal/CreateReportModal";
import { useReportContext } from "./context/report/ReportContext";

function App() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReport, setEditingReport] = useState<Report | undefined>(
    undefined
  );

  const { updateReport } = useReportContext();

  const handleCreateClick = () => {
    setEditingReport(undefined);
    setIsModalOpen(true);
  };

  const handleEditClick = (report: Report) => {
    setEditingReport(report);
    setIsModalOpen(true);
  };

  const handleSaveEdit = (updatedReport: Report) => {
    updateReport(updatedReport);
  };

  return (
    <Container
      sx={{
        py: 2,
        flex: 1,
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        maxWidth: "100% !important",
      }}
    >
      <Header onSearchChange={setSearch} onCreateClick={handleCreateClick} />

      <CreateReportModal
        open={isModalOpen}
        report={editingReport}
        onSave={handleSaveEdit}
        onClose={() => setIsModalOpen(false)}
      />

      <ReportList search={search} onEditClick={handleEditClick} />
    </Container>
  );
}

export default App;
