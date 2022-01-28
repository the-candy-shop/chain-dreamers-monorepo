import React from "react";
import Box from "@mui/material/Box";
import background from "./background.png";
import backgroundOpen from "./background-open.png";
import { useMediaQuery } from "@mui/material";
import ConnectButton from "../ConnectButton/ConnectButton";
import HeaderLink from "../HeaderLink/HeaderLink";
import { useIsOpen } from "../../hooks/useIsOpen";

function Home() {
  const isSmallWidth = useMediaQuery("(max-width:915px)");
  const { isCandyShopOpen } = useIsOpen();

  return (
    <>
      {!isSmallWidth && (
        <Box sx={{ "& .background": { width: "100%" }, marginBottom: "84px" }}>
          <img
            alt="Candy Shop"
            src={isCandyShopOpen ? backgroundOpen : background}
            className="background"
          />
        </Box>
      )}
      {isSmallWidth && (
        <Box
          sx={{
            background: `url(${isCandyShopOpen ? backgroundOpen : background})`,
            backgroundSize: "cover",
            backgroundPositionX: "center",
            backgroundPositionY: "center",
            height: "calc(100% - 80px - 84px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <ConnectButton
              sx={{
                marginTop: "16px",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HeaderLink label="Story" to="/story" />
            <HeaderLink label="Team" to="/team" />
            <HeaderLink label="On-chain storage" to="/on-chain-storage" />
            <HeaderLink label="FAQ" to="/faq" />
          </Box>
        </Box>
      )}
    </>
  );
}

export default Home;
