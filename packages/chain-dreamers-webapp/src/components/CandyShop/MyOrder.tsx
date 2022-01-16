import ShopPanels from "../ShopPanels/ShopPanels";
import Box from "@mui/material/Box";
import React from "react";
import jaz from "./jaz.png";
import Typist from "react-typist";
import heliumSpice from "./helium-spice.png";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";
import { heliumSpicePrice } from "../../config";

function MyOrder() {
  const [heliumSpiceQuantity, setHeliumSpiceQuantity] =
    React.useState<number>(0);
  const addHeliumSpice = React.useCallback(
    () => setHeliumSpiceQuantity((previous) => previous + 1),
    []
  );
  const removeHeliumSpice = React.useCallback(
    () =>
      setHeliumSpiceQuantity((previous) => {
        if (previous > 0) return previous - 1;
        return previous;
      }),
    []
  );

  return (
    <ShopPanels title="My order" sx={{ flex: 1 }}>
      <Box sx={{ padding: "24px 110px 46px 110px", textAlign: "center" }}>
        <Box sx={{ margin: "18px 46px 24px 46px" }}>
          <img alt="Jaz" src={jaz} style={{ width: "48px" }} />
          <Box
            sx={{
              fontSize: "20px",
              fontFamily: "Share Tech Mono",
              marginTop: "24px",
            }}
          >
            <Typist>
              OK, here is something that will make you dream for a while...
            </Typist>
          </Box>
          <Box sx={{ marginTop: "24px" }}>
            <img
              src={heliumSpice}
              alt="Helium Spice"
              style={{ height: "200px" }}
            />
            <Box
              sx={{
                fontWeight: 600,
                fontSize: "20px",
                marginTop: "24px",
              }}
            >
              PLEASE SELECT A FLASK QUANTITY
            </Box>
            <Box
              sx={{
                marginTop: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                aria-label="Remove Helium Spice"
                onClick={removeHeliumSpice}
                sx={{
                  border: "1px solid #AC0BF7",
                  borderRadius: 0,
                  color: "#44DFFD",
                }}
              >
                <RemoveIcon />
              </IconButton>
              <Box
                sx={{
                  fontSize: "24px",
                  marginRight: "35px",
                  marginLeft: "35px",
                }}
              >
                {heliumSpiceQuantity}
              </Box>
              <IconButton
                aria-label="Add Helium Spice"
                onClick={addHeliumSpice}
                sx={{
                  border: "1px solid #AC0BF7",
                  borderRadius: 0,
                  color: "#44DFFD",
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              variant="contained"
              sx={{
                marginTop: "24px",
                fontSize: "20px",
                fontWeight: 600,
                padding: "12px 24px",
                color: "black",
                background: "#44DFFD",

                "&:hover": {
                  background: "#44DFFD",
                },
              }}
            >
              Buy for {heliumSpicePrice} ETH
            </Button>
            <Box sx={{ marginTop: "24px", fontSize: "15px" }}>
              1 Helium Spice Flask is needed to mint 1 Chain Dreamer
            </Box>
          </Box>
        </Box>
      </Box>
    </ShopPanels>
  );
}

export default MyOrder;
