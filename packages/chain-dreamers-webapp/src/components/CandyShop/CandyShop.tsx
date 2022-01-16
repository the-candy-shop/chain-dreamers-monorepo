import React from "react";
import Box from "@mui/material/Box";
import candyShop from "./candy-shop.png";
import RemainingTimeBlock from "./RemainingTimeBlock";
import AllCandies from "./AllCandies";
import Jaz from "./Jaz";
import MyOrder from "./MyOrder";

function CandyShop() {
  return (
    <Box>
      <RemainingTimeBlock />
      <Box sx={{ marginTop: "23px", "& .candy-shop-img": { width: "100%" } }}>
        <img alt="Candy Shop" src={candyShop} className="candy-shop-img" />
      </Box>
      <Box sx={{ marginTop: "23px", marginBottom: "40px", display: "flex" }}>
        <Box sx={{ flex: 1, marginRight: "12px" }}>
          <AllCandies />
          <Jaz />
        </Box>
        <Box
          sx={{
            flex: 1,
            marginLeft: "12px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <MyOrder />
        </Box>
      </Box>
    </Box>
  );
}

export default CandyShop;
