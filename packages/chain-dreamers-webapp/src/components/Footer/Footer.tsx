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
          padding: "0px 28px",
          display: "flex",
        }}
      >
        <FooterLink
          src={twitter}
          url="https://twitter.com/chain_dreamers"
          tooltip="View Twitter"
        />
        <FooterLink
          src={discord}
          url="https://discord.gg/zNMFcUvsKQ"
          tooltip="Join Discord"
        />
        <FooterLink
          src={etherScan}
          url="https://etherscan.io/address/0xd73c9F0cF3aB63ab27ae5Eb1C768430C9094391c"
          tooltip="View Contract"
        />
        <FooterLink
          src={openSea}
          url="https://opensea.io/collection/chain-dreamers"
          tooltip="View Collection"
        />
      </Box>
    </Box>
  );
}

export default Footer;
