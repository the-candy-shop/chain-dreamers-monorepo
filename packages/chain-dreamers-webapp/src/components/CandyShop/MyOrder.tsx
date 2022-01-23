import ShopPanels from "../ShopPanels/ShopPanels";
import Box, { BoxProps } from "@mui/material/Box";
import React from "react";
import Button from "@mui/lab/LoadingButton";
import { drugPrice } from "../../config";
import FlaskQuantitySelector from "./FlaskQuantitySelector";
import { DrugList } from "../../drugs";
import { Link } from "react-router-dom";
import { useCandyShopContract } from "../../hooks/useCandyShopContract";
import LoadingDrugMintDialog from "../LoadingDrugMintDialog/LoadingDrugMintDialog";

const defaultDrugQuantity = {
  [DrugList.ChainMeth]: 0,
  [DrugList.HeliumSpice]: 0,
  [DrugList.SomnusTears]: 0,
};

type MyOrderProps = {
  sx?: BoxProps["sx"];
};

function MyOrder({ sx }: MyOrderProps) {
  const { mint, isMinting, isWaitingForPayment } = useCandyShopContract();

  const [quantity, setQuantity] =
    React.useState<Record<DrugList, number>>(defaultDrugQuantity);

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

  const total = Object.values(quantity).reduce((res, q) => res + q, 0);

  const handleBuyButtonClick = React.useCallback(async () => {
    await mint(quantity);
    resetQuantity();
  }, [mint, quantity]);

  return (
    <ShopPanels title="My order" sx={{ flex: 1, ...sx }}>
      <Box sx={{ padding: "24px 110px 46px 110px", textAlign: "center" }}>
        <Box sx={{ margin: "18px 46px 24px 46px" }}>
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
        </Box>
      </Box>
      <LoadingDrugMintDialog open={isMinting} />
    </ShopPanels>
  );
}

export default MyOrder;
