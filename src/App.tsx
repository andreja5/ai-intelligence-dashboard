import { useState } from "react";

import { Container } from "@mui/material";
import { ReportList } from "./features/report-list/ReportList";
import { Header } from "./components/header/Header";
import { CreateReportModal } from "./components/create-report-modal/CreateReportModal";

function App() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <Header
        onSearchChange={setSearch}
        onCreateClick={() => setIsModalOpen(true)}
      />

      <CreateReportModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <ReportList search={search} />
    </Container>
  );
}

export default App;
