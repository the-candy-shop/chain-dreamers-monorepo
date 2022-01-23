import React from "react";
import Header from "./components/Header/Header";
import Box from "@mui/material/Box";
import Footer from "./components/Footer/Footer";
import RoutesWrapper from "./routes";
import { useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import { DrugQuantitiesContext } from "./contexts/DrugQuantitiesContext";
import { DrugList } from "./drugs";

function App() {
  const location = useLocation();
  const isSmallWidth = useMediaQuery("(max-width:915px)");
  const isHome = location.pathname === "/";

  const [drugQuantities, setDrugQuantities] = React.useState<
    Record<DrugList, number>
  >({
    [DrugList.ChainMeth]: 0,
    [DrugList.HeliumSpice]: 0,
    [DrugList.SomnusTears]: 0,
  });

  return (
    <DrugQuantitiesContext.Provider
      value={{ drugQuantities, setDrugQuantities }}
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
    </DrugQuantitiesContext.Provider>
  );
}

export default App;
