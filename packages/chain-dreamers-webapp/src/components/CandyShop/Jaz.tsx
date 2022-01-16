import ShopPanels from "../ShopPanels/ShopPanels";
import Box from "@mui/material/Box";
import React from "react";
import jaz from "./jaz.png";
import Typist from "react-typist";

function Jaz() {
  return (
    <ShopPanels title="Jaz, the Candy Shop owner" sx={{ marginTop: "24px" }}>
      <Box
        sx={{
          padding: "24px 50px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box>
          <img alt="Jaz" src={jaz} style={{ width: "64px" }} />
        </Box>
        <Box
          sx={{
            fontSize: "20px",
            fontFamily: "Share Tech Mono",
            marginLeft: "24px",
            padding: "60px 0",
          }}
        >
          <Typist>
            Mettre ici une phrase de bienvenue du tenancier et explication sur à
            quoi sert le candy.
            <br />
            Mettre ici une phrase de bienvenue du tenancier et explication sur à
            quoi sert le candy.
          </Typist>
        </Box>
      </Box>
    </ShopPanels>
  );
}

export default Jaz;
