import React from "react";
import logo from "./logo.png";
import Box from "@mui/material/Box";
import HeaderLink from "../HeaderLink/HeaderLink";
import ConnectButton from "../ConnectButton/ConnectButton";
import { Link } from "react-router-dom";
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import { useMediaQuery } from "@mui/material";
import WalletButton, { WALLET_TYPE } from "../WalletButton/WalletButton";

function Header() {
  const isMobile = useMediaQuery("(max-width:915px)");

  return (
    <Box
      sx={{
        height: isMobile ? "80px" : "107px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: isMobile ? "center" : "space-between",
      }}
    >
      <Link to="/">
        <Box
          sx={{
            "& .logo": { height: isMobile ? "55px" : "68px" },
            height: isMobile ? "55px" : "68px",
            marginLeft: isMobile ? "0" : "32px",
          }}
        >
          <img src={logo} alt="logo" className="logo" />
        </Box>
      </Link>
      <Box
        sx={{
          flexDirection: "row",
          display: isMobile ? "none" : "flex",
        }}
      >
        <HeaderMenu label="Learn more" />
        <HeaderLink label="FAQ" to="faq" />
        <ConnectButton
          sx={{
            marginLeft: "20px",
          }}
        />
      </Box>
    </Box>
  );
}

export default Header;
