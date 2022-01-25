import ShopPanels from "../ShopPanels/ShopPanels";
import Box, { BoxProps } from "@mui/material/Box";
import React from "react";
import Button from "@mui/lab/LoadingButton";
import { drugPrice } from "../../config";
import FlaskQuantitySelector from "./FlaskQuantitySelector";
import { DrugList } from "../../drugs";
import { Link, useNavigate } from "react-router-dom";
import { useCandyShopContract } from "../../hooks/useCandyShopContract";
import LoadingDrugMintDialog from "../LoadingDrugMintDialog/LoadingDrugMintDialog";
import jaz from "./jaz.png";
import Typist from "react-typist";
import heliumSpice from "./helium-spice.png";
import somnusTears from "./somnus-tears.png";
import chainMeth from "./chain-meth.png";

const defaultDrugQuantity = {
  [DrugList.ChainMeth]: 0,
  [DrugList.HeliumSpice]: 0,
  [DrugList.SomnusTears]: 0,
};

type MyOrderProps = {
  sx?: BoxProps["sx"];
};

function MyOrder({ sx }: MyOrderProps) {
  const navigate = useNavigate();
  const {
    mint,
    isMinting,
    isWaitingForPayment,
    totalQuantity: totalMintedQuantity,
    drugQuantities: mintedQuantities,
  } = useCandyShopContract();

  const [quantity, setQuantity] =
    React.useState<Record<DrugList, number>>(defaultDrugQuantity);

  const total = Object.values(quantity).reduce((res, q) => res + q, 0);

  const [hasMint, setHasMint] = React.useState<boolean>(
    totalMintedQuantity !== 0
  );

  const resetQuantity = React.useCallback(
    () => setQuantity(defaultDrugQuantity),
    []
  );

  const setChainMethQuantity = React.useCallback(
    (chainMethQuantity: number) =>
      setQuantity({
        ...quantity,
        [DrugList.ChainMeth]: chainMethQuantity,
      }),
    [quantity]
  );

  const setHeliumSpiceQuantity = React.useCallback(
    (heliumSpiceQuantity: number) =>
      setQuantity({
        ...quantity,
        [DrugList.HeliumSpice]: heliumSpiceQuantity,
      }),
    [quantity]
  );

  const setSomnusTearsQuantity = React.useCallback(
    (somnusTearsQuantity: number) =>
      setQuantity({
        ...quantity,
        [DrugList.SomnusTears]: somnusTearsQuantity,
      }),
    [quantity]
  );

  const handleBuyButtonClick = React.useCallback(async () => {
    await mint(quantity);
    resetQuantity();
    setHasMint(true);
  }, [mint, quantity, resetQuantity]);

  const handleGoToTheBasementButtonClick = React.useCallback(async () => {
    navigate("/basement");
  }, [navigate]);

  const handleBuyMoreCandyButtonClick = React.useCallback(async () => {
    setHasMint(false);
  }, [navigate]);

  return (
    <ShopPanels title="My order" sx={{ flex: 1, ...sx }}>
      <Box sx={{ padding: "24px 110px 46px 110px", textAlign: "center" }}>
        <Box sx={{ margin: "18px 46px 24px 46px" }}>
          {!hasMint && (
            <Box sx={{ marginTop: "24px" }}>
              <Box
                sx={{
                  fontWeight: 600,
                  fontSize: "20px",
                  marginTop: "24px",
                }}
              >
                PLEASE SELECT THE NEEDED FLASK QUANTITY
              </Box>
              <Box marginTop="44px">
                <FlaskQuantitySelector
                  quantity={quantity[DrugList.ChainMeth]}
                  setQuantity={setChainMethQuantity}
                  drug={DrugList.ChainMeth}
                  sx={{ marginBottom: "24px" }}
                />
                <FlaskQuantitySelector
                  quantity={quantity[DrugList.SomnusTears]}
                  setQuantity={setSomnusTearsQuantity}
                  drug={DrugList.SomnusTears}
                  sx={{ marginBottom: "24px" }}
                />
                <FlaskQuantitySelector
                  quantity={quantity[DrugList.HeliumSpice]}
                  setQuantity={setHeliumSpiceQuantity}
                  drug={DrugList.HeliumSpice}
                  sx={{ marginBottom: "24px" }}
                />
              </Box>
              <Button
                variant="contained"
                sx={{
                  marginTop: "20px",
                  fontSize: "20px",
                  fontWeight: 600,
                  padding: "12px 24px",
                  color: "black",
                  background: "#44DFFD",

                  "&.Mui-disabled": {
                    background: "rgba(68,223,253,.2)",
                  },

                  "&:hover": {
                    background: "#44DFFD",
                  },
                }}
                loading={isWaitingForPayment || isMinting}
                disabled={total === 0}
                onClick={handleBuyButtonClick}
              >
                Buy
                {total !== 0 && ` for ${drugPrice.times(total).toString()} ETH`}
              </Button>
              <Box sx={{ marginTop: "44px", fontSize: "15px" }}>
                At least 1 Flask of drug is needed to mint 1 Dreamer.{" "}
                <Link
                  to="/faq"
                  style={{ color: "#44DFFD", textDecoration: "none" }}
                >
                  Learn More
                </Link>
              </Box>
            </Box>
          )}
          {hasMint && (
            <Box marginTop="24px">
              <Box>
                <img alt="Jaz" src={jaz} style={{ width: "64px" }} />
                <Box
                  marginTop="24px"
                  fontSize="20px"
                  fontFamily="Share Tech Mono"
                >
                  <Typist>
                    Congrats, you have bought your Candy. Use with caution...
                  </Typist>
                </Box>
              </Box>
              <Box marginTop="24px">
                {mintedQuantities[DrugList.ChainMeth] !== 0 && (
                  <img
                    alt="Chain-Meth"
                    src={chainMeth}
                    style={{ width: "48px", margin: "0 16px" }}
                  />
                )}
                {mintedQuantities[DrugList.SomnusTears] !== 0 && (
                  <img
                    alt="Somnus Tears"
                    src={somnusTears}
                    style={{ width: "48px", margin: "0 16px" }}
                  />
                )}
                {mintedQuantities[DrugList.HeliumSpice] !== 0 && (
                  <img
                    alt="Helium Spice"
                    src={heliumSpice}
                    style={{ width: "48px", margin: "0 16px" }}
                  />
                )}
              </Box>
              <Box marginTop="24px">
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "20px",
                    fontSize: "20px",
                    fontWeight: 600,
                    padding: "12px 24px",
                    color: "black",
                    background: "#44DFFD",
                    width: "290px",

                    "&.Mui-disabled": {
                      background: "rgba(68,223,253,.2)",
                    },

                    "&:hover": {
                      background: "#44DFFD",
                    },
                  }}
                  onClick={handleGoToTheBasementButtonClick}
                >
                  Go to the basement
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "20px",
                    fontSize: "20px",
                    fontWeight: 600,
                    padding: "12px 24px",
                    color: "black",
                    background: "#44DFFD",
                    width: "290px",

                    "&.Mui-disabled": {
                      background: "rgba(68,223,253,.2)",
                    },

                    "&:hover": {
                      background: "#44DFFD",
                    },
                  }}
                  onClick={handleBuyMoreCandyButtonClick}
                >
                  Buy more candy
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <LoadingDrugMintDialog open={isMinting} />
    </ShopPanels>
  );
}

export default MyOrder;
