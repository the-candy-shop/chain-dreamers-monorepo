import React from "react";
import { Dialog } from "@mui/material";
import Box from "@mui/material/Box";
import LoadingDreamerMintImage from "./LoadingDreamerMintImage";
import { useDreamersContract } from "../../hooks/useDreamersContract";

type LoadingDreamersMintDialogProps = {
  open: boolean;
  mintingRunnersIds: number[];
};

function LoadingDreamersMintDialog({
  open,
  mintingRunnersIds,
}: LoadingDreamersMintDialogProps) {
  const { dreamersIds } = useDreamersContract();

  return (
    <Dialog
      open={open}
      sx={{
        "& .MuiPaper-root": {
          background: "black",
          maxWidth: "900px",
          maxHeight: "600px",
        },
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        padding="32px"
      >
        {mintingRunnersIds.map((runnerId) => (
          <Box key={runnerId} margin="16px">
            <LoadingDreamerMintImage
              runnerId={runnerId}
              isDreamer={dreamersIds.includes(runnerId)}
            />
          </Box>
        ))}
      </Box>
    </Dialog>
  );
}

export default LoadingDreamersMintDialog;
