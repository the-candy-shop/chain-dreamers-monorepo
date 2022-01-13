import React from "react";
import logo from "./logo.png";
import Box from "@mui/material/Box";
import HeaderLink from "../HeaderLink/HeaderLink";
import CountDownButton from "../CountDownButton/CountDownButton";
import { Link } from "react-router-dom";
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import { useMediaQuery } from "@mui/material";

function Header() {
  const isMobile = useMediaQuery("(max-width:915px)");

  return (
    <Box
      sx={{
        height: "107px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: isMobile ? "center" : "space-between",
      }}
    >
      <Link to="/">
        <Box
          sx={{
            "& .logo": { height: "68px" },
            height: "68px",
            marginLeft: "32px",
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
        <CountDownButton />
      </Box>
    </Box>
  );
}

export default Header;
