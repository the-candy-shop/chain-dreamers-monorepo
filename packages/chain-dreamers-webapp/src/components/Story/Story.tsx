import React from "react";
import Box from "@mui/material/Box";
import PageTitle from "../PageTitle/PageTitle";
import background from "../Home/background.png";
import Content from "../Content/Content";
import Link from "@mui/material/Link";
import spiceEffect from "./spice-effect.png";

function Story() {
  return (
    <Box>
      <PageTitle label="Story" background={background} />
      <Box
        sx={{
          marginTop: "96px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ maxWidth: "895px" }}>
          <Content title="What is the Candy Shop?">
            <p>
              In the filthiest suburbs of Mega City, "Home to the content
              without want", there is a Candy Shop where Runners go to buy some
              "Candy" or so they say.
            </p>
            <p>
              The Candy Shop has just open is held by Jaz, Runner{" "}
              <Link
                href="https://opensea.io/assets/0x97597002980134bea46250aa0510c9b90d87a587/8335"
                target="_blank"
              >
                #8335
              </Link>
              .
            </p>
            <p>
              In reality, Candy is sold to NPC Mega City citizens while Runners
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
              Once Helium Spice is consumed, the Runner goes into a dreaming
              state, and nothing matters anymore. The drug gives way to round
              shapes. The runner feels lighter than air.
            </p>
            <p>The Runner turns into a dreamer, a Chain Dreamer.</p>
            <p>
              Mega City is a hard place to live and escaping this world is a
              necessity.
            </p>
            <p>
              The reason why Mega City is called “Home to the content without
              want” is because many Runners are addicted to Chain-... to be
              completed.
            </p>
          </Content>
          <Content title="Helium Spice effects">
            <p>
              Helium Spice works very quickly, producing an almost instant
              lightness feeling.
            </p>
            <p>
              This drug comes with a reality distortion field for whoever takes
              it
            </p>
            <p>
              For lots of Runners, Helium Spice is a big inspiration to HACK the
              world.
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
        </Box>
      </Box>
    </Box>
  );
}

export default Story;
