import React from "react";
import { Dialog } from "@mui/material";
import Box from "@mui/material/Box";
import LoadingDreamerMintImage from "./LoadingDreamerMintImage";
import { useDreamersContract } from "../../hooks/useDreamersContract";
import jaz from "../CandyShop/jaz.png";
import DreamerMintingMessages from "./DreamerMintingMessages";

type LoadingDreamersPublicMintDialogProps = {
  open: boolean;
  mintingRunnersIds: number[];
};

function LoadingDreamersPublicMintDialog({
  open,
  mintingRunnersIds,
}: LoadingDreamersPublicMintDialogProps) {
  const [displayedRunnersIds, setDisplayedRunnersIds] =
    React.useState<number[]>(mintingRunnersIds);
  const { dreamersIds } = useDreamersContract();

  React.useEffect(() => {
    if (open) {
      setDisplayedRunnersIds(mintingRunnersIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const isDoneMinting = React.useMemo(() => {
    for (const dreamerId of displayedRunnersIds) {
      if (!dreamersIds.includes(dreamerId)) {
        return false;
      }
    }

    return true;
  }, [displayedRunnersIds, dreamersIds]);

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
        <Box marginTop="64px">
          <Box textAlign="center">
            <img alt="Jaz" src={jaz} style={{ width: "64px" }} />
          </Box>
          {open && <DreamerMintingMessages isDoneMinting={isDoneMinting} />}
        </Box>
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

export default LoadingDreamersPublicMintDialog;
