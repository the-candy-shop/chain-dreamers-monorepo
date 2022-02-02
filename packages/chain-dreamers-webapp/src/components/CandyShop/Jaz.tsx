import ShopPanels from "../ShopPanels/ShopPanels";
import Box, { BoxProps } from "@mui/material/Box";
import React from "react";
import jaz from "./jaz.png";
import Typist from "react-typist";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

type JazProps = {
  message:
    | "candyShopWithRunner"
    | "candyShopWithoutRunner"
    | "basementWithoutCandy"
    | "jail";
  sx?: BoxProps["sx"];
};

function Jaz({ message, sx }: JazProps) {
  const isSmallWidth = useMediaQuery("(max-width:915px)");

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
            fontSize: "18px",
            fontFamily: "Share Tech Mono",
            padding: isSmallWidth ? "24px 0" : "35px",
            textAlign: "center",
            maxWidth: "680px",

            "& a": {
              color: "#44DFFD",
            },
          }}
        >
          {message === "candyShopWithRunner" && (
            <Typist avgTypingDelay={20}>
              Hello! My name is Jaz, I am the Candy Shop Owner. I successfully
              identified you as a verified Chain Runner. Usually I sell regular
              candies, but you seem pretty informed.
              <br />
              Indeed, I have a few things that you might be interested in. Each
              drug has specific effects and will alter your Runner accordingly,
              please check the <Link to="/story">story page</Link> to understand
              effects before buying. But be careful, never speak about it to
              Somnus.
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
          {message === "jail" && (
            <Typist avgTypingDelay={0}>
              In the night of the 7th opening day, a horde of 50 angry Chain
              Runners have invaded the shop, and stolen all drugs. They sold it
              all around Mega City and have drawn the place into chaos. All
              Runners who couldn’t consume the Spice in proper conditions in my
              Basement have fallen into endless dreams.
              <br />
              <br />
              They're all locked up in Mega City Jail now, arrested by Somnus.
            </Typist>
          )}
        </Box>
      </Box>
    </ShopPanels>
  );
}

export default Jaz;
