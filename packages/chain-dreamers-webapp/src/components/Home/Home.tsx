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
import { useRemainingTimeJailOpen } from "../../hooks/useRemainingTimeJailOpen";

function Home() {
  const isSmallWidth = useMediaQuery("(max-width:915px)");
  const navigate = useNavigate();
  const { isCandyShopOpen, isJailOpen } = useIsOpen();
  const { account } = useEthers();

  const { remainingTimeOpenInSeconds } = useRemainingTimeJailOpen();
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
    <>
      {!isSmallWidth && (
        <Box sx={{ "& .background": { width: "100%" }, marginBottom: "84px" }}>
          {(isCandyShopOpen || isJailOpen) && account && (
            <Box
              sx={{
                position: "absolute",
                bottom: "150px",
                right: 0,
                left: 0,
                margin: "auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
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

                  "&.Mui-disabled": {
                    background: "rgba(68,223,253,.2)",
                  },

                  "&:hover": {
                    background: "#44DFFD",
                  },
                }}
                onClick={() =>
                  navigate(isCandyShopOpen ? "/candy-shop" : "/jail")
                }
              >
                {isCandyShopOpen
                  ? "Take me to the Candy Shop"
                  : "Start minting Dreamers by entering the Jail"}
              </Button>
            </Box>
          )}
          {isJailOpen && (
            <Box
              sx={{
                position: "absolute",
                top: "107px",
                right: 0,
                left: 0,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  marginTop: "32px",
                  fontSize: "22px",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  textAlign: "center",
                  padding: "32px",
                  lineHeight: "36px",
                  background: "rgba(0,0,0,0.7)",
                  borderRadius: "16px",
                  border: "1px solid #AC0BF7",
                }}
              >
                Drug effects on Dreamers are disappearing. Jail guard will have
                no reason to keep them anymore.
                <br />
                They'll all be set free in in{" "}
                <span style={{ color: "#44DFFD" }}>
                  {remainingDays} days, {remainingHours} hours,{" "}
                  {remainingMinutes} minutes, {remainingSeconds} seconds
                </span>{" "}
                and you won't be able to mint them anymore.
              </Box>
            </Box>
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
