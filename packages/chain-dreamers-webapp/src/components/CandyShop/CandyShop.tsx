import React from "react";
import Box from "@mui/material/Box";
import RemainingTimeBlock from "./RemainingTimeBlock";
import Jaz from "./Jaz";
import MyOrder from "./MyOrder";
import { useRunnerIds } from "../../hooks/useRunnerIds";

function CandyShop() {
  const runnerCount = useRunnerIds();

  return (
    <Box display="flex" flexDirection="column" height="calc(100vh - 191px)">
      <RemainingTimeBlock />
      <Box marginTop="23px" marginBottom="40px" display="flex" flex={1}>
        {runnerCount.length > 0 && (
          <>
            <Box flex={1} marginRight="12px">
              <Jaz sx={{ height: "100%" }} />
            </Box>
            <Box
              sx={{
                flex: 1,
                marginLeft: "12px",
              }}
            >
              <MyOrder sx={{ height: "100%" }} />
            </Box>
          </>
        )}
        {runnerCount.length <= 0 && (
          <Box flex={1}>
            <Jaz sx={{ height: "100%" }} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default CandyShop;
