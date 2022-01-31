import React from "react";
import Box from "@mui/material/Box";
import Jaz from "../CandyShop/Jaz";
import ShopPanels from "../ShopPanels/ShopPanels";
import jaz from "../CandyShop/jaz.png";
import jail from "./jail.png";
import Typist from "react-typist";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/lab/LoadingButton";
import { dreamerPrice } from "../../config";
import { useDreamersContract } from "../../hooks/useDreamersContract";

function Jail() {
  const { mint, isMinting, isWaitingForPayment, fetchNonMintedDreamers } =
    useDreamersContract();
  const [quantity, setQuantity] = React.useState<number>(0);
  const [nonMintedDreamers, setNonMintedDreamers] = React.useState<number[]>(
    []
  );

  const add = React.useCallback(
    () => setQuantity(quantity + 1),
    [quantity, setQuantity]
  );
  const remove = React.useCallback(
    () => quantity > 0 && setQuantity(quantity - 1),
    [quantity, setQuantity]
  );

  React.useEffect(() => {
    fetchNonMintedDreamers().then(setNonMintedDreamers);
  }, [fetchNonMintedDreamers]);

  const handleMintButtonClick = React.useCallback(async () => {
    const runnersToMintIds = [1];
    await mint(runnersToMintIds);
    setQuantity(0);
  }, [mint]);

  console.log("nonMintedDreamers", nonMintedDreamers);

  return (
    <Box display="flex" flexDirection="column" minHeight="calc(100vh - 191px)">
      <Box marginTop="23px" marginBottom="40px" display="flex" flex={1}>
        <Box display="flex" flexDirection="column" flex={1} marginRight="12px">
          <Box flex={1} marginBottom="12px">
            <Jaz message="jail" sx={{ height: "100%" }} />
          </Box>
          <Box flex={1} marginTop="12px">
            <ShopPanels title="The Jail" sx={{ height: "100%" }}>
              <img alt="Jail" src={jail} style={{ width: "100%" }} />
            </ShopPanels>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            marginLeft: "12px",
          }}
        >
          <ShopPanels title="The Mint" sx={{ height: "100%" }}>
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
                <Typist avgTypingDelay={20}>
                  For how many Chain Dreamers would you like to pay the bail to
                  set them free?
                </Typist>
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
                  aria-label="Remove"
                  onClick={remove}
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
                  {quantity}
                </Box>
                <IconButton
                  aria-label="Add"
                  onClick={add}
                  sx={{
                    border: "1px solid #AC0BF7",
                    borderRadius: 0,
                    color: "#44DFFD",
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "48px",
                    fontSize: "20px",
                    fontWeight: 600,
                    padding: "12px 24px",
                    color: "black",
                    background: "#44DFFD",
                    textTransform: "uppercase",

                    "&.Mui-disabled": {
                      background: "rgba(68,223,253,.2)",
                    },

                    "&:hover": {
                      background: "#44DFFD",
                    },
                  }}
                  disabled={quantity === 0}
                  loading={isMinting || isWaitingForPayment}
                  onClick={handleMintButtonClick}
                >
                  Mint {quantity} Dreamers for{" "}
                  {dreamerPrice.multipliedBy(quantity).toString()} ETH
                </Button>
              </Box>
            </Box>
          </ShopPanels>
        </Box>
      </Box>
    </Box>
  );
}

export default Jail;
