import React from "react";
import Box from "@mui/material/Box";
import RemainingTimeBlock from "./RemainingTimeBlock";
import Jaz from "./Jaz";
import MyOrder from "./MyOrder";

function CandyShop() {
  return (
    <Box>
      <RemainingTimeBlock />
      <Box sx={{ marginTop: "23px", marginBottom: "40px", display: "flex" }}>
        <Box sx={{ flex: 1, marginRight: "12px" }}>
          <Jaz sx={{ height: "100%" }} />
        </Box>
        <Box
          sx={{
            flex: 1,
            marginLeft: "12px",
          }}
        >
          <MyOrder />
        </Box>
      </Box>
    </Box>
  );
}

export default CandyShop;
