import ShopPanels from "../ShopPanels/ShopPanels";
import Box, { BoxProps } from "@mui/material/Box";
import React from "react";
import jaz from "./jaz.png";
import Typist from "react-typist";

type JazProps = {
  message:
    | "candyShopWithRunner"
    | "candyShopWithoutRunner"
    | "basementWithoutCandy";
  sx?: BoxProps["sx"];
};

function Jaz({ message, sx }: JazProps) {
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
            maxWidth: "680px",
          }}
        >
          {message === "candyShopWithRunner" && (
            <Typist avgTypingDelay={20}>
              Hello! My name is Jaz, I am the Candy Shop Runner. I successfully
              identified you as a verified Chain Runner. Usually I sell regular
              candies, but you seem pretty informed.
              <br />
              Indeed, I have a few things that you might be interested in. But
              be careful, never speak about it to Somnus.
            </Typist>
          )}
          {message === "candyShopWithoutRunner" && (
            <Typist avgTypingDelay={20}>
              Sorry, my Candy Shop is opened only for Runners at the moment.
            </Typist>
          )}
          {message === "basementWithoutCandy" && (
            <Typist avgTypingDelay={20}>
              Sorry, if you want to use my basement to eat some candy, you'll
              have to buy it first. Go back to the Candy Shop and choose your
              poison.
            </Typist>
          )}
        </Box>
      </Box>
    </ShopPanels>
  );
}

export default Jaz;
