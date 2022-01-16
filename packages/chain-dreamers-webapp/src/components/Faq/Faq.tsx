import React from "react";
import Box from "@mui/material/Box";
import PageTitle from "../PageTitle/PageTitle";
import background from "../Home/background.png";
import Content from "../Content/Content";
import Link from "@mui/material/Link";
import { Link as InnerLink } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

function Faq() {
  const isMobile = useMediaQuery("(max-width:915px)");

  return (
    <Box>
      <PageTitle label="FAQ" background={background} />
      <Box
        sx={{
          marginTop: "96px",
          display: "flex",
          justifyContent: "center",
          padding: isMobile ? "0 16px" : 0,
        }}
      >
        <Box sx={{ maxWidth: "850px" }}>
          <Content title="What is Chain Dreamers?">
            <p>
              Chain Dreamers is a on-chain NFT derivative project based on{" "}
              <Link href="https://www.chainrunners.xyz/" target="_blank">
                Chain Runners
              </Link>
              . You have to own a Chain Runner to be able to mint your
              associated Chain Dreamer on phase 1.
            </p>
          </Content>
          <Content title="Why creating a derivative on Chain Runners?">
            <p>Because we love Chain Runners:</p>
            <p>
              <ul>
                <li>they are beautiful af</li>
                <li>they are 100% stored on-chain</li>
                <li>they are CC0</li>
                <li>
                  they have great references to pop culture and science-fiction
                </li>
                <li>we loved the minting experience / the Hub</li>
                <li>it's narrative-driven</li>
                <li>
                  the community is super creative with dozens of derivatives
                </li>
                <li>!vibes</li>
              </ul>
            </p>
          </Content>
          <Content title="Is it stored on chain?">
            <p>
              Yes, 100% stored on the Ethereum blockchain. <br />
              Data is stored via sstore. The renderer is built into contract.
              The output is svg. More details{" "}
              <InnerLink to="/on-chain-storage">on this page</InnerLink>.
            </p>
          </Content>
          <Content title="What is the total supply?">
            <p>
              10k.
              <br />
              Every 10k Chain Runner have its associated Chain Dreamer.
            </p>
          </Content>
          <Content title="When does the Candy Shop open for minting?">
            <p>Phase 1 of minting will launch on January, 30th at 10AM PST</p>
            <p>
              Phase 2 of minting will launch 7 days after on February, 6th at
              10AM PST
            </p>
          </Content>
          <Content title="Who can mint a Chain Dreamer during phase 1?">
            <p>
              Only wallets owning Chain Runners can mint the associated Chain
              Dreamers.
            </p>
            <p>
              You can mint as many Chain Dreamers as you have Chain Runners.
            </p>
          </Content>
          <Content title="Who can mint a Chain Dreamer during phase 2?">
            <p>
              7 days after the mint, all the remaining Chain Dreamers will be
              mintable by people on the White List.
            </p>
          </Content>
          <Content title="How much is the mint price?">
            <p>TBD</p>
          </Content>
          <Content title="How to mint a Chain Dreamer?">
            <p>
              First, you buy as many HELIUM SPICE flasks as Chain Dreamers you
              want to mint in the Candy Shop.
            </p>
            <p>
              Then you go down to the Basement and give it to your Runner(s).
            </p>
            <p>Eventually, your dreamer is minted</p>
          </Content>
          <Content title="What rights do I have to the artwork?">
            <p>
              Same as Chain Runners, you are free to do whatever you want with
              your Chain Dreamer.
            </p>
          </Content>
        </Box>
      </Box>
    </Box>
  );
}

export default Faq;
