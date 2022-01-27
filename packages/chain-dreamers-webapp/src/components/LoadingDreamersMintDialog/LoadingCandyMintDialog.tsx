import React from "react";
import { Dialog } from "@mui/material";
import Box from "@mui/material/Box";
import GlitchedImage from "./GlitchedImage";
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
            {!dreamersIds.includes(runnerId) && (
              <GlitchedImage runnerId={runnerId} />
            )}
            {dreamersIds.includes(runnerId) && (
              <img
                alt="dreamer"
                src={`https://api.chaindreamers.xyz/test/tokens/${runnerId}/img`}
                style={{ width: "160px", borderRadius: "16px" }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Dialog>
  );
}

export default LoadingDreamersMintDialog;
