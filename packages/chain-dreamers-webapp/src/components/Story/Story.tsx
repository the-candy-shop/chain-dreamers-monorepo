import React from "react";
import Box from "@mui/material/Box";
import PageTitle from "../PageTitle/PageTitle";
import Content from "../Content/Content";
import Link from "@mui/material/Link";
import spiceEffect from "./spice-effect.png";
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
import ChainDreamer1 from "./Chain_Dreamer_1.png";

const beforeAfterRunnerDreamer = [
  {
    id: 827,
    runner: ChainRunner827,
    dreamer: ChainDreamer1,
  },
  {
    id: 10000,
    runner: ChainRunner10000,
    dreamer: ChainDreamer1,
  },
  {
    id: 780,
    runner: ChainRunner780,
    dreamer: ChainDreamer1,
  },
  {
    id: 2435,
    runner: ChainRunner2435,
    dreamer: ChainDreamer1,
  },
  {
    id: 111,
    runner: ChainRunner111,
    dreamer: ChainDreamer1,
  },
  {
    id: 6025,
    runner: ChainRunner6025,
    dreamer: ChainDreamer1,
  },
  {
    id: 6482,
    runner: ChainRunner6482,
    dreamer: ChainDreamer1,
  },
  {
    id: 9027,
    runner: ChainRunner9027,
    dreamer: ChainDreamer1,
  },
];

function Story() {
  const isMobile = useMediaQuery("(max-width:915px)");

  return (
    <Box>
      <PageTitle label="Story" background={banner} />
      <Box
        sx={{
          marginTop: "96px",
          display: "flex",
          justifyContent: "center",
          padding: isMobile ? "0 16px" : 0,
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
              have access to a special drug which has many names:{" "}
              <Link
                href="https://www.chainrunners.xyz/hub/runners/5074"
                target="_blank"
              >
                Chain-Meth
              </Link>
              , Degen Gas or Somnus Tear but the most common is Helium Spice.
            </p>
            <p>
              Once Helium Spice is consumed, Runners turn into a dreaming state,
              and nothing matters anymore. Their appearance changes to round
              shapes and they feel lighter than air.
            </p>
            <p>Runners turn into dreamers, Chain Dreamers.</p>
            <p>
              Mega City is a hard place to live under Somnus and escaping this
              world is a necessity for any well respected renegate.
            </p>
          </Content>
          <Content title="Helium Spice effects">
            <p>
              Helium Spice tends to act very quickly, producing an almost
              instant lightness feeling.
            </p>
            <p>
              This drug comes with a reality distortion field for whoever takes
              it.
            </p>
            <p>
              For lots of Runners, Helium Spice gives a big inspiration to HACK
              the world.
            </p>
            <p>
              Those are basic effects, in reality, every runners tells a
              different story about his Helium Spice experience. Tell us yours
              on our{" "}
              <Link href="https://discord.gg/p583xTn4" target="_blank">
                dedicated Discord chan
              </Link>
              .
            </p>
            <Box
              sx={{
                "& .spice-effects": {
                  maxWidth: "848px",
                  width: "100%",
                },
              }}
            >
              <img
                alt="Helium Spice effects"
                src={spiceEffect}
                className="spice-effects"
              />
            </Box>
          </Content>
          <Content title="Sneak peak">
            <p>Here are a few Chain Dreamers.</p>
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
                    "& .runner": { width: "130px", borderRadius: "8px" },
                    "& .dreamer": { width: "130px" },
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
