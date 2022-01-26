import React from "react";
import Header from "./components/Header/Header";
import Box from "@mui/material/Box";
import Footer from "./components/Footer/Footer";
import RoutesWrapper from "./routes";
import { useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import { CandyQuantitiesContext } from "./contexts/CandyQuantitiesContext";
import { CandyList } from "./candies";

function App() {
  const location = useLocation();
  const isSmallWidth = useMediaQuery("(max-width:915px)");
  const isHome = location.pathname === "/";

  const [candyQuantities, setCandyQuantities] = React.useState<
    Record<CandyList, number>
  >({
    [CandyList.ChainMeth]: 0,
    [CandyList.HeliumSpice]: 0,
    [CandyList.SomnusTears]: 0,
  });

  return (
    <CandyQuantitiesContext.Provider
      value={{ candyQuantities, setCandyQuantities }}
    >
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
    </CandyQuantitiesContext.Provider>
  );
}

export default App;
