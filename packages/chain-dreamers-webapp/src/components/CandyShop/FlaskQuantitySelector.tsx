import React from "react";
import Box, { BoxProps } from "@mui/material/Box";
import { DrugList } from "../../drugs";
import heliumSpice from "./helium-spice.png";
import somnusTears from "./somnus-tears.png";
import chainMeth from "./chain-meth.png";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const imageByDrug = {
  [DrugList.SomnusTears]: somnusTears,
  [DrugList.ChainMeth]: chainMeth,
  [DrugList.HeliumSpice]: heliumSpice,
};

type FlaskQuantitySelectorProps = {
  quantity: number;
  setQuantity: (q: number) => void;
  drug: DrugList;
  sx?: BoxProps["sx"];
};

function FlaskQuantitySelector({
  quantity,
  setQuantity,
  drug,
  sx,
}: FlaskQuantitySelectorProps) {
  const add = React.useCallback(
    () => setQuantity(quantity + 1),
    [quantity, setQuantity]
  );
  const remove = React.useCallback(
    () => quantity > 0 && setQuantity(quantity - 1),
    [quantity, setQuantity]
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      sx={sx}
    >
      <Box>
        <img alt="flask" src={imageByDrug[drug]} style={{ width: "48px" }} />
      </Box>
      <Box fontSize="24px">{drug.toString()}</Box>
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
    </Box>
  );
}

export default FlaskQuantitySelector;
