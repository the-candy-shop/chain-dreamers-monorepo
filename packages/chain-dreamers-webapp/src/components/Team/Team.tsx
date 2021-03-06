import React from "react";
import Box from "@mui/material/Box";
import PageTitle from "../PageTitle/PageTitle";
import TeamMember from "../TeamMember/TeamMember";
import { useMediaQuery } from "@mui/material";
import banner from "./banner.png";
import clement from "./clement.png";
import jaz from "./jaz.png";
import georges from "./georges.png";
import law from "./law.png";
import come from "./come.png";
import Link from "@mui/material/Link";
import Content from "../Content/Content";

function Team() {
  const isSmallWidth = useMediaQuery("(max-width:915px)");

  return (
    <Box>
      <PageTitle label="Team" background={banner} />
      <Box
        sx={{
          marginTop: "96px",
          display: "flex",
          justifyContent: "center",
          padding: isSmallWidth ? "0 16px" : 0,
        }}
      >
        <Box sx={{ maxWidth: "895px" }}>
          <Content>
            <p>
              We are an autonomous 5 people team and our long-term goal is to
              bring innovation to the Chain with our lab: the Candy Shop.
            </p>
            <p>
              We have all been working in the web industry for at least 6 years.
            </p>
          </Content>
          <TeamMember name="Jaz" image={jaz}>
            Proud holder of a Candy Shop on-chain, passionate web3 product guy
            off-chain.
          </TeamMember>
          <TeamMember name="Clément" image={clement}>
            Scientist and engineer, currently experimenting in solidity.
          </TeamMember>
          <TeamMember name="law" image={law}>
            <Box>Graphic Designer - Illustrator</Box>
            <Box marginTop="6px">
              <Link
                href="https://www.instagram.com/antoinelalou/"
                target="_blank"
                sx={{ color: "#44DFFD" }}
              >
                @antoinelalou
              </Link>
            </Box>
            <Box marginTop="6px">
              <Link
                href="https://www.instagram.com/micmac.industrie/"
                target="_blank"
                sx={{ color: "#44DFFD" }}
              >
                @micmac.industrie
              </Link>
            </Box>
            <Box marginTop="6px">
              <Link
                href="https://opensea.io/collection/focus-inside"
                target="_blank"
                sx={{ color: "#44DFFD" }}
              >
                opensea
              </Link>
            </Box>
          </TeamMember>
          <TeamMember name="Côme" image={come}>
            Product designer based in Paris, building the future of NFT mint
            experiences. Also a passionate fisherman.
          </TeamMember>
          <TeamMember name="Georges" image={georges}>
            Web developer based in Paris. Love to tell chain-stories that won’t
            be lost like tears in rain.
          </TeamMember>
        </Box>
      </Box>
    </Box>
  );
}

export default Team;
