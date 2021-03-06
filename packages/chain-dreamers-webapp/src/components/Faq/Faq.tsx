import React from "react";
import Box from "@mui/material/Box";
import PageTitle from "../PageTitle/PageTitle";
import banner from "./banner.png";
import Content from "../Content/Content";
import Link from "@mui/material/Link";
import { Link as InnerLink } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import { useIsOpen } from "../../hooks/useIsOpen";
import { useIsLaunched } from "../../hooks/useIsLaunched";

function Faq() {
  const isSmallWidth = useMediaQuery("(max-width:915px)");
  const { isCandyShopOpen, isJailOpen } = useIsOpen();
  const { isLaunched } = useIsLaunched();

  return (
    <Box>
      <PageTitle label="FAQ" background={banner} />
      <Box
        sx={{
          marginTop: "96px",
          display: "flex",
          justifyContent: "center",
          padding: isSmallWidth ? "0 16px" : 0,
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
              Dreamer during Chapter 1.
            </p>
          </Content>
          <Content title="What is the Candy Shop?">
            <p>
              Beyond the narrative,{" "}
              <Link href="https://thecandyshop.wtf/" target="_blank">
                The Candy Shop
              </Link>{" "}
              is an NFT research lab.
            </p>
            <p>Chain Dreamer is only our first project.</p>
            <p>We'll keep building new collections with 3 golden rules: </p>
            <ul>
              <li>Innovation mechanism (tech & minting experience)</li>
              <li>Expanding what we consider the best NFT franchises</li>
              <li>Narrative-driven</li>
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
              Data is stored via sstore2. The renderer is built into the
              contract. The output is svg. More details{" "}
              <InnerLink to="/on-chain-storage">on this page</InnerLink>.
            </p>
          </Content>
          <Content title="What is the total supply?">
            <p>
              10k.
              <br />
              Every 10k Chain Runner has its associated Chain Dreamer.
            </p>
          </Content>
          <Content title="When does the Candy Shop open for minting?">
            <p>Wednesday, February 2nd, 2022 12pm EST / 9am PST</p>
          </Content>
          <Content title="Who can mint a Chain Dreamer during Chapter 1?">
            <p>
              Only wallets owning Chain Runners can mint the associated Chain
              Dreamers.
            </p>
            <p>
              You can mint as many Chain Dreamers as you have Chain Runners.
            </p>
          </Content>
          <Content title="Who can mint a Chain Dreamer during Chapter 2?">
            <p>
              Chapter 2 will open 48 hours after the beginning of Chapter 1 on
              Friday, February 4nd, 2022 12pm EST / 9am PST
            </p>
            <p>
              Dreamers will be mintable in the{" "}
              {isJailOpen && <InnerLink to="/jail">Jail</InnerLink>}
              {!isJailOpen && (
                <CustomTooltip
                  title={isLaunched && isCandyShopOpen ? "Soon" : "Closed"}
                >
                  <Link>Jail</Link>
                </CustomTooltip>
              )}
              .
            </p>
            <p>
              If all Chain Dreamers have been minteted during Chapter 1, there
              will be no Chapter 2.
            </p>
            <p>
              If there are Chain Dreamers left to be minted, our team will keep
              50 of them and the remaining Chain Dreamers will be mintable by
              anyone.
            </p>
          </Content>
          <Content title="What is the mint price?">
            <p>0.03 ETH during Chapter 1</p>
            <p>0.05 ETH during Chapter 2</p>
          </Content>
          <Content title="How to mint a Chain Dreamer during Chapter 1?">
            <p>
              First, you buy as many candy flasks as Chain Dreamers you want to
              mint in the{" "}
              {isCandyShopOpen && (
                <InnerLink to="/candy-shop">Candy Shop</InnerLink>
              )}
              {!isCandyShopOpen && (
                <CustomTooltip title={isLaunched ? "Closed" : "Soon"}>
                  <Link>Candy Shop</Link>
                </CustomTooltip>
              )}
              .
            </p>
            <p>
              Then you go down to the{" "}
              {isCandyShopOpen && (
                <InnerLink to="/basement">Basement</InnerLink>
              )}
              {!isCandyShopOpen && (
                <CustomTooltip title={isLaunched ? "Closed" : "Soon"}>
                  <Link>Basement</Link>
                </CustomTooltip>
              )}{" "}
              and give it to your Runner(s).
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
        </Box>
      </Box>
    </Box>
  );
}

export default Faq;
