import React from "react";
import Box from "@mui/material/Box";
import Jaz from "../CandyShop/Jaz";
import ShopPanels from "../ShopPanels/ShopPanels";
import jaz from "../CandyShop/jaz.png";
import jail from "./jail.png";
import Typist from "react-typist";
import Button from "@mui/lab/LoadingButton";
import { dreamerPrice } from "../../config";
import { useDreamersContract } from "../../hooks/useDreamersContract";
import RunnerSearchBar from "./RunnersSearchBar";
import ClearIcon from "@mui/icons-material/Clear";
import LoadingDreamersPublicMintDialog from "../LoadingPublicDreamersMintDialog/LoadingDreamersPublicMintDialog";

function Jail() {
  const { mint, isMinting, isWaitingForPayment } = useDreamersContract();
  const [dreamersToMint, setDreamersToMint] = React.useState<number[]>([]);

  const [mintingDialogOpen, setMintingDialogOpen] =
    React.useState<boolean>(false);

  const add = React.useCallback(
    (id: number) => {
      if (!dreamersToMint.includes(id)) {
        setDreamersToMint([...dreamersToMint, id]);
      }
    },
    [dreamersToMint]
  );

  const remove = React.useCallback(
    (id: number) => {
      setDreamersToMint(dreamersToMint.filter((runnerId) => runnerId !== id));
    },
    [dreamersToMint]
  );

  const handleMintButtonClick = React.useCallback(async () => {
    await mint(dreamersToMint);
    setDreamersToMint([]);
  }, [mint, dreamersToMint]);

  React.useEffect(() => {
    if (isMinting) {
      setMintingDialogOpen(true);
    }
  }, [isMinting]);

  return (
    <Box display="flex" flexDirection="column" minHeight="calc(100vh - 191px)">
      <Box marginTop="23px" marginBottom="40px" display="flex" flex={1}>
        <Box display="flex" flexDirection="column" flex={1} marginRight="12px">
          <Box flex={1} marginBottom="12px">
            <Jaz message="jail" sx={{ height: "100%" }} />
          </Box>
          <Box flex={1} marginTop="12px">
            <ShopPanels title="The Jail" sx={{ height: "100%" }}>
              <img alt="Jail" src={jail} style={{ width: "100%" }} />
            </ShopPanels>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            marginLeft: "12px",
          }}
        >
          <ShopPanels title="The Mint" sx={{ height: "100%" }}>
            <Box
              sx={{
                padding: "24px 50px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Box>
                <img alt="Jaz" src={jaz} style={{ width: "64px" }} />
              </Box>
              <Box
                sx={{
                  fontSize: "20px",
                  fontFamily: "Share Tech Mono",
                  padding: "60px 35px",
                  textAlign: "center",
                  maxWidth: "680px",
                }}
              >
                <Typist avgTypingDelay={20}>
                  For which Chain Dreamers would you like to pay the bail to set
                  them free?
                </Typist>
              </Box>
              <RunnerSearchBar
                onRunnerSelect={add}
                selectedRunners={dreamersToMint}
              />
              <Box
                marginTop="32px"
                display="flex"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="center"
                maxWidth="300px"
              >
                {dreamersToMint.map((id) => (
                  <Box
                    margin="8px"
                    position="relative"
                    textAlign="center"
                    key={id}
                  >
                    <Box
                      borderRadius="50%"
                      border="1px solid #DA4A8A"
                      color="#DA4A8A"
                      width="16px"
                      height="16px"
                      onClick={() => remove(id)}
                      position="absolute"
                      sx={{
                        top: "-8px",
                        right: "-8px",
                        background: "#15090e",
                        cursor: "pointer",
                        "& .MuiSvgIcon-root": { width: "16px", height: "16px" },
                      }}
                    >
                      <ClearIcon />
                    </Box>
                    <img
                      key={id}
                      alt={`Runner #${id}`}
                      src={`https://api.chainrunners.xyz/tokens/${id}/img`}
                      style={{ width: "48px", borderRadius: "8px" }}
                    />
                    <Box fontWeight={600}>#{id}</Box>
                  </Box>
                ))}
              </Box>
              <Box>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "48px",
                    fontSize: "20px",
                    fontWeight: 600,
                    padding: "12px 24px",
                    color: "black",
                    background: "#44DFFD",
                    textTransform: "uppercase",

                    "&.Mui-disabled": {
                      background: "rgba(68,223,253,.2)",
                    },

                    "&:hover": {
                      background: "#44DFFD",
                    },
                  }}
                  disabled={dreamersToMint.length === 0}
                  loading={isMinting || isWaitingForPayment}
                  onClick={handleMintButtonClick}
                >
                  Mint {dreamersToMint.length} Dreamers for{" "}
                  {dreamerPrice.multipliedBy(dreamersToMint.length).toString()}{" "}
                  ETH
                </Button>
              </Box>
            </Box>
          </ShopPanels>
        </Box>
      </Box>
      <LoadingDreamersPublicMintDialog
        open={true}
        mintingRunnersIds={dreamersToMint}
      />
    </Box>
  );
}

export default Jail;
