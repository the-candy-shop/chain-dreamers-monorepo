import ShopPanels from "../ShopPanels/ShopPanels";
import Box, { BoxProps } from "@mui/material/Box";
import React from "react";
import jaz from "./jaz.png";
import Typist from "react-typist";
import { useRunnerIds } from "../../hooks/useRunnerIds";

type JazProps = {
  sx?: BoxProps["sx"];
};

function Jaz({ sx }: JazProps) {
  const runnerCount = useRunnerIds();

  return (
    <ShopPanels title="Jaz, the Candy Shop owner" sx={sx}>
      <Box
        sx={{
          padding: "24px 50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Box>
          <img alt="Jaz" src={jaz} style={{ width: "64px" }} />
        </Box>
        <Box
          sx={{
            fontSize: "20px",
            fontFamily: "Share Tech Mono",
            padding: "60px 35px",
            textAlign: "center",
          }}
        >
          {runnerCount.length > 0 && (
            <Typist avgTypingDelay={40}>
              Hello! My name is Jaz, I am the Candy Shop Runner. I successfully
              identified you as a verified Chain Runner. Usually I sell regular
              candies, but you seam pretty informed.
              <br />
              Indeed, I have a few things that you might be interested in. But
              be carefull, never speak about it to Somnus.
            </Typist>
          )}
          {runnerCount.length <= 0 && (
            <Typist>
              Sorry, my Candy Shop is opened only for Runners at the moment.
            </Typist>
          )}
        </Box>
      </Box>
    </ShopPanels>
  );
}

export default Jaz;
