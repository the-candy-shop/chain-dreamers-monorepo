import React from "react";
import ShopPanels from "../ShopPanels/ShopPanels";
import Box from "@mui/material/Box";
import { useCandyShopContract } from "../../hooks/useCandyShopContract";
import Jaz from "../CandyShop/Jaz";
import { candiesIds, CandyList, imageByCandy } from "../../candies";
import { useRunnerIds } from "../../hooks/useRunnerIds";
import { useDreamersContract } from "../../hooks/useDreamersContract";
import MyRunners from "./MyRunners";
import jaz from "../CandyShop/jaz.png";
import Typist from "react-typist";
import Button from "@mui/lab/LoadingButton";
import LoadingDreamersMintDialog from "../LoadingDreamersMintDialog/LoadingCandyMintDialog";

function Basement() {
  const {
    totalQuantity: totalMintedCandy,
    candyQuantities: mintedCandyQuantities,
  } = useCandyShopContract();
  const runnersIds = useRunnerIds();
  const { dreamersIds, mintAsRunners, isMinting, isWaitingForPayment } =
    useDreamersContract();

  const nonDreamingRunners = runnersIds.filter(
    (id) => !dreamersIds.includes(id)
  );

  const [mintingDialogOpen, setMintingDialogOpen] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (isMinting) {
      setMintingDialogOpen(true);
    }
  }, [isMinting]);

  const [selectedRunners, setSelectedRunners] = React.useState<
    Record<number, CandyList | null>
  >(
    runnersIds.reduce((r: Record<number, CandyList | null>, id) => {
      r[id] = null;
      return r;
    }, {})
  );

  const candySpent = React.useMemo<Record<CandyList, number>>(() => {
    const result: Record<string, number> = {};

    for (const candy of Object.values(CandyList)) {
      result[candy] = Object.values(selectedRunners).filter(
        (selectedCandy) => selectedCandy === candy
      ).length;
    }

    return result;
  }, [selectedRunners]);

  const selectedRunnersCount = React.useMemo<number>(
    () => Object.values(selectedRunners).filter((v) => !!v).length,
    [selectedRunners]
  );

  const handleMintButtonClick = React.useCallback(async () => {
    const runnersToMintIds = runnersIds.filter((id) => !!selectedRunners[id]);
    const candyIds = runnersToMintIds.map(
      (id) => candiesIds[selectedRunners[id] as CandyList]
    );
    await mintAsRunners(runnersToMintIds, candyIds);
    setSelectedRunners(
      runnersIds.reduce((r: Record<number, CandyList | null>, id) => {
        r[id] = null;
        return r;
      }, {})
    );
  }, [runnersIds, selectedRunners, mintAsRunners]);

  return (
    <Box display="flex" flexDirection="column" minHeight="calc(100vh - 191px)">
      <Box marginTop="23px" marginBottom="40px" display="flex" flex={1}>
        {totalMintedCandy > 0 && (
          <>
            <Box flex={1} marginRight="12px">
              <MyRunners
                selectedRunners={selectedRunners}
                setSelectedRunners={setSelectedRunners}
                mintedCandyQuantities={mintedCandyQuantities}
                nonDreamingRunnersIds={nonDreamingRunners}
              />
            </Box>
            <Box
              sx={{
                flex: 1,
                marginLeft: "12px",
              }}
            >
              <ShopPanels title="My order" sx={{ height: "100%" }}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  maxWidth="500px"
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
                    }}
                  >
                    <Typist avgTypingDelay={20}>
                      Runners! Choose wisely which candy you will take. Once
                      you're ready, click the button bellow, and I'll give you
                      the dose myself.
                    </Typist>
                  </Box>
                  <Box>
                    {Object.values(CandyList).map((candy) => (
                      <Box
                        key={candy}
                        margin="16px"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        fontWeight={600}
                        fontSize="22px"
                        textTransform="uppercase"
                      >
                        <img
                          alt={candy}
                          src={imageByCandy[candy]}
                          style={{ width: "32px", marginRight: "16px" }}
                        />
                        <Box>{candy} total spent:</Box>
                        <Box marginLeft="12px">{candySpent[candy]}</Box>
                      </Box>
                    ))}
                  </Box>
                  <Box marginTop="40px">
                    <Button
                      variant="contained"
                      sx={{
                        marginTop: "20px",
                        fontSize: "20px",
                        fontWeight: 600,
                        padding: "12px 24px",
                        color: "black",
                        background: "#44DFFD",
                        width: "340px",
                        textTransform: "uppercase",

                        "&.Mui-disabled": {
                          background: "rgba(68,223,253,.2)",
                        },

                        "&:hover": {
                          background: "#44DFFD",
                        },
                      }}
                      disabled={selectedRunnersCount === 0}
                      loading={isMinting || isWaitingForPayment}
                      onClick={handleMintButtonClick}
                    >
                      Mint my chain dreamers
                    </Button>
                  </Box>
                </Box>
              </ShopPanels>
            </Box>
          </>
        )}
        {totalMintedCandy === 0 && (
          <Box flex={1}>
            <Jaz message="basementWithoutCandy" sx={{ height: "100%" }} />
          </Box>
        )}
      </Box>
      <LoadingDreamersMintDialog
        open={mintingDialogOpen}
        mintingRunnersIds={runnersIds.filter((id) => !!selectedRunners[id])}
      />
    </Box>
  );
}

export default Basement;
