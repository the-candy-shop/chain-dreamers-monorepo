import React from "react";
import Box, { BoxProps } from "@mui/material/Box";
import { CandyList, imageByCandy } from "../../candies";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

type FlaskQuantitySelectorProps = {
  quantity: number;
  setQuantity: (q: number) => void;
  candy: CandyList;
  sx?: BoxProps["sx"];
};

function FlaskQuantitySelector({
  quantity,
  setQuantity,
  candy,
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
        <img alt="flask" src={imageByCandy[candy]} style={{ width: "48px" }} />
      </Box>
      <Box fontSize="24px">{candy.toString()}</Box>
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
