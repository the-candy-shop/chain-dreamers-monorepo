import React from "react";
import ShopPanels from "../ShopPanels/ShopPanels";
import Box from "@mui/material/Box";
import { CandyList, imageByCandy } from "../../candies";
import RunnerSelector from "./RunnerSelector";

type MyRunnersProps = {
  totalMintedCandy: number;
  mintedCandyQuantities: Record<CandyList, number>;
  nonDreamingRunnersIds: number[];
  selectedRunners: Record<number, CandyList | null>;
  setSelectedRunners: (value: Record<number, CandyList | null>) => void;
};

function MyRunners({
  totalMintedCandy,
  mintedCandyQuantities,
  nonDreamingRunnersIds,
  selectedRunners,
  setSelectedRunners,
}: MyRunnersProps) {
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
    <ShopPanels title="My runners" sx={{ height: "100%" }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box display="flex">
          {Object.values(CandyList).map((candy) => (
            <Box key={candy} display="flex" alignItems="center" margin="0 24px">
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
          <span style={{ color: "#44DFFD" }}>{totalMintedCandy}</span> runners
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
          {nonDreamingRunnersIds.map((runnerId) => (
            <RunnerSelector
              key={runnerId}
              runnerId={runnerId}
              selectedCandy={selectedRunners[runnerId]}
              selectCandy={(candy) => selectCandy(runnerId, candy)}
              toggleSelect={() => toggleRunnerSelect(runnerId)}
              candyLeft={candyLeft}
              disabled={!selectedRunners[runnerId] && candyLeftTotal === 0}
            />
          ))}
        </Box>
      </Box>
    </ShopPanels>
  );
}

export default MyRunners;
