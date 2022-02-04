import React from "react";
import Header from "./components/Header/Header";
import Box from "@mui/material/Box";
import Footer from "./components/Footer/Footer";
import RoutesWrapper from "./routes";
import { Alert, Snackbar, useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import { CandyQuantitiesContextProvider } from "./contexts/CandyQuantitiesContext";
import { DreamersContextProvider } from "./contexts/DreamersContext";
import { SnackbarErrorContext } from "./contexts/SnackbarErrorContext";
import { RunnersContextProvider } from "./contexts/RunnersContext";
import ReactGA from "react-ga";

function App() {
  const location = useLocation();
  const isSmallWidth = useMediaQuery("(max-width:915px)");
  const isHome = location.pathname === "/";
  const [snackbarError, setSnackbarError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (process.env.REACT_APP_GA_ID) {
      ReactGA.initialize(process.env.REACT_APP_GA_ID);
    }
  }, []);

  React.useEffect(() => {
    if (process.env.REACT_APP_GA_ID) {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [location]);

  return (
    <RunnersContextProvider>
      <CandyQuantitiesContextProvider>
        <DreamersContextProvider>
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
        </DreamersContextProvider>
      </CandyQuantitiesContextProvider>
    </RunnersContextProvider>
  );
}

export default App;
