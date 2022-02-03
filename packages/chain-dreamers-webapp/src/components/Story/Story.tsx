import React from "react";
import Box from "@mui/material/Box";
import PageTitle from "../PageTitle/PageTitle";
import Content from "../Content/Content";
import Link from "@mui/material/Link";
import heliumSpiceEffects from "./helium-spice-effects.png";
import chainMethEffects from "./chain-meth-effects.png";
import somnusTears from "./somnus-tears-effects.png";
import { useMediaQuery } from "@mui/material";
import banner from "./banner.png";
import ChainRunner827 from "./Chain_Runner_827.png";
import ChainRunner10000 from "./Chain_Runner_10000.png";
import ChainRunner780 from "./Chain_Runner_780.png";
import ChainRunner2435 from "./Chain_Runner_2435.png";
import ChainRunner111 from "./Chain_Runner_111.png";
import ChainRunner6025 from "./Chain_Runner_6025.png";
import ChainRunner6482 from "./Chain_Runner_6482.png";
import ChainRunner9027 from "./Chain_Runner_9027.png";
import ChainDreamer827 from "./Chain_Dreamer_827.png";
import ChainDreamer10000 from "./Chain_Dreamer_10000.png";
import ChainDreamer780 from "./Chain_Dreamer_780.png";
import ChainDreamer2435 from "./Chain_Dreamer_2435.png";
import ChainDreamer111 from "./Chain_Dreamer_111.png";
import ChainDreamer6025 from "./Chain_Dreamer_6025.png";
import ChainDreamer6482 from "./Chain_Dreamer_6482.png";
import ChainDreamer9027 from "./Chain_Dreamer_9027.png";
import { CandyList, candiesColors } from "../../candies";
import TraitsChangeTable from "../TraitsChangeTable/TraitsChangeTable";

const beforeAfterRunnerDreamer = [
  {
    id: 827,
    runner: ChainRunner827,
    dreamer: ChainDreamer827,
  },
  {
    id: 10000,
    runner: ChainRunner10000,
    dreamer: ChainDreamer10000,
  },
  {
    id: 780,
    runner: ChainRunner780,
    dreamer: ChainDreamer780,
  },
  {
    id: 2435,
    runner: ChainRunner2435,
    dreamer: ChainDreamer2435,
  },
  {
    id: 111,
    runner: ChainRunner111,
    dreamer: ChainDreamer111,
  },
  {
    id: 6025,
    runner: ChainRunner6025,
    dreamer: ChainDreamer6025,
  },
  {
    id: 6482,
    runner: ChainRunner6482,
    dreamer: ChainDreamer6482,
  },
  {
    id: 9027,
    runner: ChainRunner9027,
    dreamer: ChainDreamer9027,
  },
];

function Story() {
  const isSmallWidth = useMediaQuery("(max-width:915px)");

  return (
    <Box>
      <PageTitle label="Story" background={banner} />
      <Box
        sx={{
          marginTop: "96px",
          display: "flex",
          justifyContent: "center",
          padding: isSmallWidth ? "0 16px" : 0,
        }}
      >
        <Box sx={{ maxWidth: "895px" }}>
          <Content title="What is the Candy Shop?">
            <p>
              In the filthiest suburbs of Mega City, "Home to the content
              without want", there is a Candy Shop where Runners go to buy
              "candy" or so they say.
            </p>
            <p>
              The Candy Shop has just opened and is held by Jaz,{" "}
              <Link
                href="https://www.chainrunners.xyz/hub/runners/8335"
                target="_blank"
              >
                Runner #8335
              </Link>
              .
            </p>
            <p>
              In reality, candy is sold to NPC Mega City citizens while Runners
              have access to 3 special candies:{" "}
              <Link
                href="https://www.chainrunners.xyz/hub/runners/5074"
                target="_blank"
              >
                Chain-Meth
              </Link>
              , Somnus Tears and Helium Spice, which have 3 different effects.
            </p>
            <p>
              Whatever the candy, once consumed, Runners turn into dreamers,
              Chain Dreamers. Pixels give birth to vectors. Squares become
              curves. All this on the chain, by the chain, for the chain.
            </p>
            <p>
              And the sooner you take the candy once mint is open, the stronger
              the effects.
            </p>
            <p>
              But in reality, all runners tell different stories about their
              experiences. Tell us yours on our{" "}
              <Link href="https://discord.gg/p583xTn4" target="_blank">
                dedicated Discord chan
              </Link>
              .
            </p>
          </Content>
          <Content
            title="Chain-Meth"
            titleColor={candiesColors[CandyList.ChainMeth]}
          >
            <p>
              Chain-Meth tends to act very quickly, producing an almost instant
              escape feeling. It is the strongest way to find inspiration to
              hack the world. This candy comes with a reality distortion field
              for whoever takes it.
            </p>
            <p>
              That’s why every non organic trait of your identity randomly
              change. You are the same but in a different reality.
            </p>
            <Box
              display="flex"
              alignItems="center"
              marginTop="64px"
              sx={{
                "& .spice-effects": {
                  width: isSmallWidth ? "150px" : "200px",
                },
              }}
            >
              <TraitsChangeTable
                candy={CandyList.ChainMeth}
                sx={{ marginRight: isSmallWidth ? "32px" : "120px", flex: 1 }}
              />
              <img
                alt="Chain Meth effects"
                src={chainMethEffects}
                className="spice-effects"
              />
            </Box>
          </Content>
          <Content
            title="Somnus Tears"
            titleColor={candiesColors[CandyList.SomnusTears]}
          >
            <p>
              Somnus tears sends consciousness to a dream world where your
              identity is lost, like tears in rain. In there, you are not
              yourself anymore, your original body is merely a sleeve, a
              residual self image.
            </p>
            <p>
              That’s why your organic traits will change, why you will be
              projected in someone else’s shape.
            </p>
            <Box
              display="flex"
              alignItems="center"
              marginTop="64px"
              sx={{
                "& .spice-effects": {
                  width: isSmallWidth ? "150px" : "200px",
                },
              }}
            >
              <TraitsChangeTable
                candy={CandyList.SomnusTears}
                sx={{ marginRight: isSmallWidth ? "32px" : "120px", flex: 1 }}
              />
              <img
                alt="Somnus Tears effects"
                src={somnusTears}
                className="spice-effects"
              />
            </Box>
          </Content>
          <Content
            title="Helium Spice"
            titleColor={candiesColors[CandyList.HeliumSpice]}
          >
            <p>
              Helium Spice is the finest candy you can find in the Candy Shop.
              The only one that can release your spirit high without wrecking
              your identity.
            </p>
            <p>
              That’s why no trait is changed. With Helium Spice, you stay
              yourself and get a 10% chance of reaching superconsciousness with
              a whole new light background, the ultimate dreaming state where
              nothing matters anymore.
            </p>
            <Box
              display="flex"
              alignItems="center"
              marginTop="64px"
              sx={{
                "& .spice-effects": {
                  width: isSmallWidth ? "150px" : "200px",
                },
              }}
            >
              <TraitsChangeTable
                candy={CandyList.HeliumSpice}
                sx={{ marginRight: isSmallWidth ? "32px" : "120px", flex: 1 }}
              />
              <img
                alt="Helium Spice effects"
                src={heliumSpiceEffects}
                className="spice-effects"
              />
            </Box>
          </Content>
          <Content title="Sneak peak">
            <p>Here are a few Chain Dreamers under Helium Spice.</p>
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              {beforeAfterRunnerDreamer.map((data) => (
                <Box
                  key={data.id}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "32px",
                    "& .runner": {
                      width: isSmallWidth ? "125px" : "250px",
                      borderRadius: "8px",
                    },
                    "& .dreamer": {
                      width: isSmallWidth ? "125px" : "250px",
                      borderRadius: "8px",
                    },
                  }}
                >
                  <Box sx={{ marginRight: "24px" }}>
                    <img className="runner" alt="Runner" src={data.runner} />
                  </Box>
                  <Box>
                    <img className="dreamer" alt="Dreamer" src={data.dreamer} />
                  </Box>
                </Box>
              ))}
            </Box>
          </Content>
        </Box>
      </Box>
    </Box>
  );
}

export default Story;
