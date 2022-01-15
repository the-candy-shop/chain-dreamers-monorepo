import React from "react";
import Box from "@mui/material/Box";
import { useRemainingTimeOpen } from "../../hooks/useRemainingTimeOpen";
import candyShop from "./candy-shop.png";
import allCandies from "./all-candies.png";
import ShopPanels from "../ShopPanels/ShopPanels";

function RemainingTimeBlock() {
  const { remainingTimeOpenInSeconds } = useRemainingTimeOpen();
  const remainingDays = Math.floor(remainingTimeOpenInSeconds / 60 / 60 / 24);
  const remainingHours =
    Math.floor(remainingTimeOpenInSeconds / 60 / 60) - remainingDays * 24;
  const remainingMinutes =
    Math.floor(remainingTimeOpenInSeconds / 60) -
    remainingHours * 60 -
    remainingDays * 24 * 60;
  const remainingSeconds =
    remainingTimeOpenInSeconds -
    remainingMinutes * 60 -
    remainingHours * 3600 -
    remainingDays * 24 * 3600;

  return (
    <Box
      sx={{
        fontSize: "12px",
        color: "#DA4A8A",
        paddingTop: "12px",
        paddingBottom: "12px",
        border: "1px solid #DA4A8A",
        textAlign: "center",
        marginTop: "40px",
      }}
    >
      The Shop closes in {remainingDays} days, {remainingHours} hours,{" "}
      {remainingMinutes} minutes, {remainingSeconds} seconds
    </Box>
  );
}

function CandyShop() {
  return (
    <Box>
      <RemainingTimeBlock />
      <Box sx={{ marginTop: "23px", "& .candy-shop-img": { width: "100%" } }}>
        <img alt="Candy Shop" src={candyShop} className="candy-shop-img" />
      </Box>
      <Box sx={{ marginTop: "23px", marginBottom: "40px", display: "flex" }}>
        <Box sx={{ flex: 1 }}>
          <ShopPanels title="All Candies">
            <Box sx={{ padding: "0 47px 24px 47px" }}>
              <img
                alt="All Candies"
                src={allCandies}
                style={{ width: "100%" }}
              />
            </Box>
          </ShopPanels>
        </Box>
        <Box sx={{ flex: 1 }}></Box>
      </Box>
    </Box>
  );
}

export default CandyShop;
