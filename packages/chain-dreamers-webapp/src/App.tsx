import React from "react";
import Header from "./components/Header/Header";
import Box from "@mui/material/Box";
import Footer from "./components/Footer/Footer";
import RoutesWrapper from "./routes";
import { useMediaQuery } from "@mui/material";

function App() {
  const isMobile = useMediaQuery("(max-width:915px)");

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: isMobile ? "100%" : "calc(100vw - 128px)",
          minHeight: "100vh",
        }}
      >
        <Header />
        <RoutesWrapper />
        <Footer />
      </Box>
    </Box>
  );
}

export default App;
