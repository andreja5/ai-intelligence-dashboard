import { useState } from "react";

import { Container } from "@mui/material";
import { ReportList } from "./features/report-list/ReportList";
import { Header } from "./components/header/Header";

function App() {
  const [search, setSearch] = useState("");

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
      <Header onSearchChange={setSearch} />

      <ReportList search={search} />
    </Container>
  );
}

export default App;
