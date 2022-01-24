import React from "react";
import Header from "./components/Header/Header";
import Box from "@mui/material/Box";
import Footer from "./components/Footer/Footer";
import RoutesWrapper from "./routes";
import { useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isSmallWidth = useMediaQuery("(max-width:915px)");
  const isHome = location.pathname === "/";

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: isSmallWidth ? "100%" : "calc(100vw - 192px)",
          minHeight: "100vh",
        }}
      >
        <Header />
        <RoutesWrapper />
        <Footer fixed={!isSmallWidth && isHome} />
      </Box>
    </Box>
  );
}

export default App;
