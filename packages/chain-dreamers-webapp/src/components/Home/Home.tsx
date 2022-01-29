import React from "react";
import Box from "@mui/material/Box";
import background from "./background.png";
import backgroundOpen from "./background-open.png";
import { useMediaQuery } from "@mui/material";
import HeaderLink from "../HeaderLink/HeaderLink";
import ConnectButton from "../ConnectButton/ConnectButton";
import { useIsOpen } from "../../hooks/useIsOpen";
import Button from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { useEthers } from "@usedapp/core";

function Home() {
  const isSmallWidth = useMediaQuery("(max-width:915px)");
  const navigate = useNavigate();
  const { isCandyShopOpen } = useIsOpen();
  const { account } = useEthers();

  return (
    <>
      {!isSmallWidth && (
        <Box sx={{ "& .background": { width: "100%" }, marginBottom: "84px" }}>
          {isCandyShopOpen && account && (
            <Button
              variant="contained"
              sx={{
                marginTop: "20px",
                fontSize: "20px",
                fontWeight: 600,
                padding: "12px 24px",
                color: "black",
                background: "#44DFFD",
                textTransform: "uppercase",
                position: "absolute",
                bottom: "150px",
                right: 0,
                left: 0,
                margin: "auto",

                "&.Mui-disabled": {
                  background: "rgba(68,223,253,.2)",
                },

                "&:hover": {
                  background: "#44DFFD",
                },
              }}
              onClick={() => navigate("/candy-shop")}
            >
              Enter the Candy Shop
            </Button>
          )}
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
          {isCandyShopOpen && account && (
            <Box>
              <Button
                variant="contained"
                sx={{
                  marginTop: "150px",
                  fontSize: "20px",
                  fontWeight: 600,
                  padding: "12px 24px",
                  color: "black",
                  background: "#44DFFD",
                  textTransform: "uppercase",

                  "&.Mui-disabled": {
                    background: "rgba(68,223,253,.2)",
                  },

                  "&:hover": {
                    background: "#44DFFD",
                  },
                }}
                onClick={() => navigate("/candy-shop")}
              >
                Enter the Candy Shop
              </Button>
            </Box>
          )}
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
