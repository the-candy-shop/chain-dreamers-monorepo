import React from "react";
import Box from "@mui/material/Box";
import RemainingTimeBlock from "./RemainingTimeBlock";
import Jaz from "./Jaz";
import MyOrder from "./MyOrder";
import { useRunnerIds } from "../../hooks/useRunnerIds";
import { useMediaQuery } from "@mui/material";

function CandyShop() {
  const isSmallWidth = useMediaQuery("(max-width:915px)");
  const runnerCount = useRunnerIds();

  return (
    <Box display="flex" flexDirection="column" minHeight="calc(100vh - 191px)">
      <RemainingTimeBlock />
      <Box
        marginTop="23px"
        marginBottom="40px"
        display="flex"
        flex={1}
        flexDirection={isSmallWidth ? "column" : "row"}
      >
        {runnerCount.length > 0 && (
          <>
            <Box
              flex={1}
              marginRight={isSmallWidth ? 0 : "12px"}
              marginBottom={isSmallWidth ? "24px" : 0}
            >
              <Jaz message="candyShopWithRunner" sx={{ height: "100%" }} />
            </Box>
            <Box
              sx={{
                flex: 1,
                marginLeft: isSmallWidth ? 0 : "12px",
              }}
            >
              <MyOrder sx={{ height: "100%" }} />
            </Box>
          </>
        )}
        {runnerCount.length <= 0 && (
          <Box flex={1} display="flex" flexDirection="column">
            <Jaz
              message="candyShopWithoutRunner"
              sx={{ height: "100%", flex: 1 }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default CandyShop;
