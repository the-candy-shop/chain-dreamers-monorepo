import React from "react";
import Box from "@mui/material/Box";
import twitter from "./twitter_logo.svg";
import discord from "./discord_logo.svg";
import etherScan from "./etherscan_logo.svg";
import openSea from "./opensea_logo.png";
import FooterLink from "../FooterLink/FooterLink";

type FooterProps = {
  fixed?: boolean;
};

function Footer({ fixed = false }: FooterProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        position: fixed ? "fixed" : "unset",
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
      }}
    >
      <Box
        sx={{
          background: "black",
          borderRadius: "8px 8px 0px 0px",
          padding: "24px 40px",
        }}
      >
        <FooterLink
          src={twitter}
          url="https://google.fr"
          tooltip="View Twitter"
        />
        <FooterLink
          src={discord}
          url="https://google.fr"
          tooltip="Join Discord"
        />
        <FooterLink
          src={etherScan}
          url="https://google.fr"
          tooltip="View Contract"
        />
        <FooterLink
          src={openSea}
          url="https://google.fr"
          tooltip="View Collection"
        />
      </Box>
    </Box>
  );
}

export default Footer;
