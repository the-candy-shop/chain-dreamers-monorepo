import React from "react";
import { Dialog, keyframes } from "@mui/material";
import flask from "./flask.png";
import pill from "./pill.png";
import Box from "@mui/material/Box";

type LoadingDrugMintDialogProps = {
  open: boolean;
};

function LoadingDrugMintDialog({ open }: LoadingDrugMintDialogProps) {
  const pillFallAnimation = keyframes`
    0 %  { top: -50px },
    100% { top: 120px  }
  `;

  return (
    <Dialog open={open} sx={{ "& .MuiPaper-root": { background: "black" } }}>
      <Box padding="100px 200px" position="relative">
        <Box position="relative" zIndex={2}>
          <img alt="flask" src={flask} style={{ width: "150px" }} />
        </Box>
        <Box
          position="absolute"
          zIndex={1}
          top="-50px"
          left="calc(50% - 25px)"
          sx={{ animation: `${pillFallAnimation} linear 700ms infinite` }}
        >
          <img alt="pill" src={pill} style={{ width: "50px" }} />
        </Box>
      </Box>
    </Dialog>
  );
}

export default LoadingDrugMintDialog;
