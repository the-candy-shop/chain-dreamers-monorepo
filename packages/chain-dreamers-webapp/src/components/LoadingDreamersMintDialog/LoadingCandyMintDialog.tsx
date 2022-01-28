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
  const [displayedRunnersIds, setDisplayedRunnersIds] =
    React.useState<number[]>(mintingRunnersIds);
  const { dreamersIds } = useDreamersContract();

  React.useEffect(() => {
    if (open) {
      setDisplayedRunnersIds(mintingRunnersIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

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
        sx={{
          background: "rgba(218, 74, 138, 0.1)",
          border: "1px solid #DA4A8A",
          padding: "0 32px",
          overflow: "auto",

          "&::-webkit-scrollbar": {
            backgroundColor: "transparent",
            width: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#b101e6",
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
          {displayedRunnersIds.map((runnerId) => (
            <Box key={runnerId} margin="16px">
              <LoadingDreamerMintImage
                runnerId={runnerId}
                isDreamer={dreamersIds.includes(runnerId)}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Dialog>
  );
}

export default LoadingDreamersMintDialog;
