import React from "react";
import Header from "./components/Header/Header";
import Box from "@mui/material/Box";
import Footer from "./components/Footer/Footer";
import RoutesWrapper from "./routes";

function App() {
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "calc(100vw - 128px)", minHeight: "100vh" }}>
        <Header />
        <RoutesWrapper />
        <Footer />
      </Box>
    </Box>
  );
}

export default App;
