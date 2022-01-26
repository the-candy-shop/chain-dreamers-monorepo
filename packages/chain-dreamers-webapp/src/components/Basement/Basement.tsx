import React from "react";
import ShopPanels from "../ShopPanels/ShopPanels";
import Box from "@mui/material/Box";
import { useCandyShopContract } from "../../hooks/useCandyShopContract";
import Jaz from "../CandyShop/Jaz";
import { CandyList } from "../../candies";
import { useRunnerIds } from "../../hooks/useRunnerIds";
import { useDreamersIds } from "../../hooks/useDreamersIds";
import MyRunners from "./MyRunners";

function Basement() {
  const {
    totalQuantity: totalMintedCandy,
    candyQuantities: mintedCandyQuantities,
  } = useCandyShopContract();
  const runnersIds = useRunnerIds();
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

  return (
    <Box display="flex" flexDirection="column" height="calc(100vh - 191px)">
      <Box marginTop="23px" marginBottom="40px" display="flex" flex={1}>
        {totalMintedCandy > 0 && (
          <>
            <Box flex={1} marginRight="12px">
              <MyRunners
                selectedRunners={selectedRunners}
                setSelectedRunners={setSelectedRunners}
                mintedCandyQuantities={mintedCandyQuantities}
                nonDreamingRunnersIds={nonDreamingRunners}
                totalMintedCandy={totalMintedCandy}
              />
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
