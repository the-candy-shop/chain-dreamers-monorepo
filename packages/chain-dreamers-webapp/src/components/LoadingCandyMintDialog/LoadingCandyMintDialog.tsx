import React from "react";
import { Dialog } from "@mui/material";
import Box from "@mui/material/Box";
import jaz from "../CandyShop/jaz.png";
import { CandyList } from "../../candies";
import AnimatedFlask from "./AnimatedFlask";
import CandyMintingMessages from "./MintingMessages";

type LoadingCandyMintDialogProps = {
  open: boolean;
  candyQuantity: Record<CandyList, number>;
};

function LoadingCandyMintDialog({
  open,
  candyQuantity,
}: LoadingCandyMintDialogProps) {
  return (
    <Dialog
      open={open}
      sx={{ "& .MuiPaper-root": { background: "black", minWidth: "500px" } }}
    >
      <Box
        sx={{
          background: "rgba(218, 74, 138, 0.1)",
          border: "1px solid #DA4A8A",
          padding: "0 32px",
        }}
      >
        <Box display="flex" justifyContent="center">
          {candyQuantity[CandyList.ChainMeth] !== 0 && (
            <AnimatedFlask candy={CandyList.ChainMeth} />
          )}
          {candyQuantity[CandyList.SomnusTears] !== 0 && (
            <AnimatedFlask candy={CandyList.SomnusTears} />
          )}
          {candyQuantity[CandyList.HeliumSpice] !== 0 && (
            <AnimatedFlask candy={CandyList.HeliumSpice} />
          )}
        </Box>
        <Box marginTop="64px">
          <Box textAlign="center">
            <img alt="Jaz" src={jaz} style={{ width: "64px" }} />
          </Box>
          {open && <CandyMintingMessages />}
        </Box>
      </Box>
    </Dialog>
  );
}

export default LoadingCandyMintDialog;
