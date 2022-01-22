import ShopPanels from "../ShopPanels/ShopPanels";
import Box, { BoxProps } from "@mui/material/Box";
import React from "react";
import Button from "@mui/material/Button";
import { drugPrice } from "../../config";
import FlaskQuantitySelector from "./FlaskQuantitySelector";
import { DrugList } from "../../drugs";
import { Link } from "react-router-dom";
import { useCandyShopContract } from "../../hooks/useCandyShopContract";

type MyOrderProps = {
  sx?: BoxProps["sx"];
};

function MyOrder({ sx }: MyOrderProps) {
  const { mint } = useCandyShopContract();

  const [quantity, setQuantity] = React.useState<Record<DrugList, number>>({
    [DrugList.ChainMeth]: 0,
    [DrugList.HeliumSpice]: 0,
    [DrugList.SomnusTears]: 0,
  });

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

  const total = React.useMemo(
    () =>
      quantity[DrugList.ChainMeth] +
      quantity[DrugList.HeliumSpice] +
      quantity[DrugList.SomnusTears],
    [quantity]
  );

  const handleBuyButtonClick = React.useCallback(
    () => mint(quantity),
    [mint, quantity]
  );

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
              disabled={total === 0}
              onClick={handleBuyButtonClick}
            >
              Buy{total !== 0 && ` for ${drugPrice * total} ETH`}
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
    </ShopPanels>
  );
}

export default MyOrder;
