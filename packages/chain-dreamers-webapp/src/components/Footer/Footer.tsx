import React from "react";
import Box from "@mui/material/Box";
import twitter from "./twitter_logo.svg";
import discord from "./discord_logo.svg";
import etherScan from "./etherscan_logo.svg";
import openSea from "./opensea_logo.png";
import FooterLink from "../FooterLink/FooterLink";

function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
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
  );
}

export default Footer;
