import React from "react";
import Header from "./components/Header/Header";
import Box from "@mui/material/Box";
import Footer from "./components/Footer/Footer";
import RoutesWrapper from "./routes";
import { Alert, Snackbar, useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import { CandyQuantitiesContext } from "./contexts/CandyQuantitiesContext";
import { CandyList } from "./candies";
import { DreamersContext } from "./contexts/DreamersContext";
import { SnackbarErrorContext } from "./contexts/SnackbarErrorContext";
import { RunnersContextProvider } from "./contexts/RunnersContext";

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
  const [dreamersCount, setDreamersCount] = React.useState<number>(0);
  const [dreamersIds, setDreamersIds] = React.useState<number[]>([]);
  const [snackbarError, setSnackbarError] = React.useState<string | null>(null);

  return (
    <RunnersContextProvider>
      <CandyQuantitiesContext.Provider
        value={{ candyQuantities, setCandyQuantities }}
      >
        <DreamersContext.Provider
          value={{
            dreamersCount,
            setDreamersCount,
            dreamersIds,
            setDreamersIds,
          }}
        >
          <SnackbarErrorContext.Provider
            value={{ error: snackbarError, setError: setSnackbarError }}
          >
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
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
            <Snackbar
              open={!!snackbarError}
              autoHideDuration={6000}
              onClose={() => setSnackbarError(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <Alert
                onClose={() => setSnackbarError(null)}
                severity="error"
                sx={{ width: "100%" }}
              >
                {snackbarError}
              </Alert>
            </Snackbar>
          </SnackbarErrorContext.Provider>
        </DreamersContext.Provider>
      </CandyQuantitiesContext.Provider>
    </RunnersContextProvider>
  );
}

export default App;
