import ShopPanels from "../ShopPanels/ShopPanels";
import Box from "@mui/material/Box";
import allCandies from "./all-candies.png";
import React from "react";

function AllCandies() {
  return (
    <ShopPanels title="All Candies">
      <Box sx={{ padding: "0 47px 24px 47px" }}>
        <img alt="All Candies" src={allCandies} style={{ width: "100%" }} />
      </Box>
    </ShopPanels>
  );
}

export default AllCandies;
