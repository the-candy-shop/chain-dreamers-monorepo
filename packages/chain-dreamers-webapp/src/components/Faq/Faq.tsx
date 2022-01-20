import React from "react";
import Box from "@mui/material/Box";
import PageTitle from "../PageTitle/PageTitle";
import banner from "./banner.png";
import Content from "../Content/Content";
import Link from "@mui/material/Link";
import { Link as InnerLink } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

function Faq() {
  const isMobile = useMediaQuery("(max-width:915px)");

  return (
    <Box>
      <PageTitle label="FAQ" background={banner} />
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
              Chain Dreamer is a on-chain and narrative-driven NFT spin-off
              based on{" "}
              <Link href="https://www.chainrunners.xyz/" target="_blank">
                Chain Runners
              </Link>
              . You have to own a Chain Runner to mint your associated Chain
              Dreamer on phase 1.
            </p>
          </Content>
          <Content title="What is the Candy Shop?">
            <p>Beyond the narrative, the Candy Shop is an NFT research lab.</p>
            <p>Chain Dreamer is only our first project.</p>
            <p>We'll keep building new collections with 3 golden rules: </p>
            <ul>
              <li>derivative on top of the best NFT projects</li>
              <li>technical innovation</li>
              <li>great minting experience</li>
            </ul>
          </Content>
          <Content title="Why creating a derivative on Chain Runners?">
            <p>Because we love Chain Runners:</p>
            <ul>
              <li>they are beautiful af</li>
              <li>they are 100% stored on-chain</li>
              <li>they are CC0</li>
              <li>
                they have great{" "}
                <Link
                  href=" https://abbeyjazzy.notion.site/Chain-Runner-References-e9c24e54c61d4429b002e1e67686d7b9"
                  target="_blank"
                >
                  references to pop culture and science-fiction
                </Link>
              </li>
              <li>we loved the minting experience / the Hub</li>
              <li>it's narrative-driven</li>
              <li>
                the community is super creative with{" "}
                <Link href="https://wiki.chainrunners.xyz/" target="_blank">
                  dozens of derivatives
                </Link>
              </li>
              <li>!vibes</li>
            </ul>
            <p>
              Thus, we believe the only way to create a derivative on Chain
              Runners is to respect its DNA: great narrative and on chain.
            </p>
            <p>
              We've worked hard to make Chain Dreamer check both with our little
              touch.
            </p>
          </Content>
          <Content title="Is it stored on chain?">
            <p>
              Yes, 100% stored on the Ethereum blockchain. <br />
              Data is stored via sstore2. The renderer is built into contract.
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
            <p>TBD</p>
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
            <p>Phase 2 will open a few days after the beginning of phase 1.</p>
            <p>
              If all Chain Dreamers have been mintet during Phase 1, there will
              be no phase 2.
            </p>
            <p>
              If there are Chain Dreamers left to be minted, our team will keep
              50 of them and the remaining Chain Dreamers will be mintable by
              people on the White List.
            </p>
          </Content>
          <Content title="What is the mint price?">
            <p>TBD</p>
          </Content>
          <Content title="How to mint a Chain Dreamer during phase 1?">
            <p>
              First, you buy as many drug flasks as Chain Dreamers you want to
              mint in the Candy Shop.
            </p>
            <p>
              Then you go down to the Basement and give it to your Runner(s).
            </p>
            <p>Eventually, your dreamer is minted.</p>
          </Content>
          <Content title="I have several Chain Runners, can I bulk mint all my Chain Dreamers?">
            <p>Yes.</p>
          </Content>
          <Content title="What rights do I have to the artwork?">
            <p>
              Same as Chain Runners, you are free to do whatever you want with
              your Chain Dreamer.
            </p>
          </Content>
          <Content title="What is the utility?">
            <p>
              By owning a Chain Dreamer, you'll be able to vote for the next
              project on top of which we'll build our next NFT Derivative.
            </p>
          </Content>
        </Box>
      </Box>
    </Box>
  );
}

export default Faq;
