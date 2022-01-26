import React from "react";
import ShopPanels from "../ShopPanels/ShopPanels";
import Box from "@mui/material/Box";
import { useCandyShopContract } from "../../hooks/useCandyShopContract";
import Jaz from "../CandyShop/Jaz";
import { CandyList, imageByCandy } from "../../candies";
import { useRunnerIds } from "../../hooks/useRunnerIds";
import { useDreamersIds } from "../../hooks/useDreamersIds";
import RunnerSelector from "./RunnerSelector";

function Basement() {
  const {
    totalQuantity: totalMintedCandy,
    candyQuantities: mintedCandyQuantities,
  } = useCandyShopContract();
  const runnersIds = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ]; // useRunnerIds();
  const dreamersIds = useDreamersIds();

  const nonDreamingRunners = runnersIds.filter(
    (id) => !dreamersIds.includes(id)
  );

  const [selectedRunners, setSelectedRunners] = React.useState<
    Record<number, CandyList | null>
  >(
    runnersIds.reduce((r: Record<number, CandyList | null>, id) => {
      r[id] = null;
      return r;
    }, {})
  );

  const candyLeft = React.useMemo<Record<CandyList, number>>(() => {
    const result: Record<string, number> = {};

    for (const candy of Object.values(CandyList)) {
      result[candy] =
        mintedCandyQuantities[candy] -
        Object.values(selectedRunners).filter(
          (selectedCandy) => selectedCandy === candy
        ).length;
    }

    return result;
  }, [selectedRunners, mintedCandyQuantities]);

  const candyLeftTotal = React.useMemo<number>(
    () => Object.values(candyLeft).reduce((r, c) => r + c, 0),
    [candyLeft]
  );

  const toggleRunnerSelect = React.useCallback(
    (runnerId: number) => {
      if (!selectedRunners[runnerId] && candyLeftTotal <= 0) return;

      const candy =
        Object.values(CandyList).find((c) => candyLeft[c] > 0) || null;

      const newValue = selectedRunners[runnerId] ? null : candy;
      setSelectedRunners({
        ...selectedRunners,
        [runnerId]: newValue,
      });
    },
    [selectedRunners]
  );

  const selectCandy = React.useCallback(
    (runnerId: number, candy: CandyList) => {
      if (candyLeftTotal <= 0) return;

      setSelectedRunners({
        ...selectedRunners,
        [runnerId]: candy,
      });
    },
    [selectedRunners]
  );

  return (
    <Box display="flex" flexDirection="column" height="calc(100vh - 191px)">
      <Box marginTop="23px" marginBottom="40px" display="flex" flex={1}>
        {totalMintedCandy > 0 && (
          <>
            <Box flex={1} marginRight="12px">
              <ShopPanels title="My runners" sx={{ height: "100%" }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Box display="flex">
                    {Object.values(CandyList).map((candy) => (
                      <Box
                        key={candy}
                        display="flex"
                        alignItems="center"
                        margin="0 24px"
                      >
                        <img
                          alt="flask"
                          src={imageByCandy[candy]}
                          style={{ width: "21px" }}
                        />
                        <Box fontWeight={600} fontSize="16px" marginLeft="4px">
                          x{mintedCandyQuantities[candy]}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  <Box
                    marginTop="40px"
                    fontWeight={600}
                    textTransform="uppercase"
                    fontSize="22px"
                  >
                    You can select up to{" "}
                    <span style={{ color: "#44DFFD" }}>{totalMintedCandy}</span>{" "}
                    runners
                  </Box>
                  <Box
                    marginTop="40px"
                    maxHeight="500px"
                    overflow="auto"
                    sx={{
                      "&::-webkit-scrollbar": {
                        backgroundColor: "transparent",
                        width: "4px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#b101e6",
                      },
                    }}
                  >
                    {nonDreamingRunners.map((runnerId) => (
                      <RunnerSelector
                        key={runnerId}
                        runnerId={runnerId}
                        selectedCandy={selectedRunners[runnerId]}
                        selectCandy={(candy) => selectCandy(runnerId, candy)}
                        toggleSelect={() => toggleRunnerSelect(runnerId)}
                        candyLeft={candyLeft}
                        disabled={
                          !selectedRunners[runnerId] && candyLeftTotal === 0
                        }
                      />
                    ))}
                  </Box>
                </Box>
              </ShopPanels>
            </Box>
            <Box
              sx={{
                flex: 1,
                marginLeft: "12px",
              }}
            >
              <ShopPanels title="My order" sx={{ height: "100%" }}>
                toto
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
    </Box>
  );
}

export default Basement;
