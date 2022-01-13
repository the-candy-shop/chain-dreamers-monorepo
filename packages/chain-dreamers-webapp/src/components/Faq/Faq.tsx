import React from "react";
import Box from "@mui/material/Box";
import PageTitle from "../PageTitle/PageTitle";
import background from "../Home/background.png";
import Content from "../Content/Content";
import Link from "@mui/material/Link";

function Faq() {
  return (
    <Box>
      <PageTitle label="FAQ" background={background} />
      <Box
        sx={{
          marginTop: "96px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ maxWidth: "895px", padding: "0 12px" }}>
          <Content title="What is Chain Dreamers?">
            <p>
              Chain Dreamers is an NFT derivative project based on{" "}
              <Link href="https://www.chainrunners.xyz/" target="_blank">
                Chain Runners
              </Link>
            </p>
          </Content>
          <Content title="Is it stored on chain?">
            <p>
              Yes, 100% stored on the Ethereum blockchain. <br />
              We have pushed on chain storage to its limits as detailed in{" "}
              <Link href="https://www.chainrunners.xyz/" target="_blank">
                this article
              </Link>
            </p>
          </Content>
          <Content title="What is the total supply?">
            <p>
              10k <br />
              For each 10k Chain Runner there is a Chain Dreamer counterpart who
              has the same traits in our dreaming style designed by{" "}
              <Link href="https://www.chainrunners.xyz/" target="_blank">
                Law
              </Link>
            </p>
          </Content>
          <Content title="When does the Candy Shop open for minting?">
            <p>The public sale will launch on January, 30th at 10AM PST</p>
          </Content>
          <Content title="Who can mint a Chain Dreamer?">
            <p>
              Only wallets owning Chain Runners can mint their dreamer
              counterpart{" "}
            </p>
          </Content>
          <Content title="How to mint a Chain Dreamer?">
            <p>
              Once the shop is open, you have to buy a flask of HELIUM SPICE in
              the Candy Shop for 0.03 ETH
            </p>
            <p>
              Then you go down to the{" "}
              <Link href="https://www.chainrunners.xyz/" target="_blank">
                Basement
              </Link>{" "}
              and give to your Runner
            </p>
            <p>Eventually, your dreamer is minted</p>
          </Content>
          <Content title="Why creating a derivative on Chain Runners?">
            <p>
              Because we love Chain Runners, we consider one of the best NFT
              project
            </p>
            <p>
              <ul>
                <li>they are beautiful af</li>
                <li>they are 100% stored on chain</li>
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
        </Box>
      </Box>
    </Box>
  );
}

export default Faq;
