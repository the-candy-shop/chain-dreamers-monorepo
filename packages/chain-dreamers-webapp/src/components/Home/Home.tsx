import React from "react";
import Box from "@mui/material/Box";
import background from "./background.png";
import { useMediaQuery } from "@mui/material";
import ConnectButton from "../ConnectButton/ConnectButton";
import HeaderLink from "../HeaderLink/HeaderLink";

function Home() {
  const isMobile = useMediaQuery("(max-width:915px)");

  return (
    <>
      {!isMobile && (
        <Box sx={{ "& .background": { width: "100%" } }}>
          <img alt="Candy Shop" src={background} className="background" />
        </Box>
      )}
      {isMobile && (
        <Box
          sx={{
            background: `url(${background})`,
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
            <HeaderLink label="The Story" to="/story" />
            <HeaderLink label="The Team" to="/team" />
            <HeaderLink label="On chain storage" to="/on-chain-storage" />
            <HeaderLink label="FAQ" to="/faq" />
          </Box>
        </Box>
      )}
    </>
  );
}

export default Home;
