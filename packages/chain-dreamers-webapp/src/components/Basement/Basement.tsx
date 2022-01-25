import React from "react";
import ShopPanels from "../ShopPanels/ShopPanels";
import Box from "@mui/material/Box";
import { useCandyShopContract } from "../../hooks/useCandyShopContract";
import Jaz from "../CandyShop/Jaz";
import { DrugList, imageByDrug } from "../../drugs";
import { useRunnerIds } from "../../hooks/useRunnerIds";
import { useDreamersIds } from "../../hooks/useDreamersIds";

function Basement() {
  const { totalQuantity: totalMintedCandy, drugQuantities } =
    useCandyShopContract();
  const runnersIds = useRunnerIds();
  const dreamersIds = useDreamersIds();

  return (
    <Box display="flex" flexDirection="column" height="calc(100vh - 191px)">
      <Box marginTop="23px" marginBottom="40px" display="flex" flex={1}>
        {totalMintedCandy > 0 && (
          <>
            <Box flex={1} marginRight="12px">
              <ShopPanels title="My runners" sx={{ height: "100%" }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Box display="flex">
                    {Object.values(DrugList).map((drug) => (
                      <Box
                        key={drug}
                        display="flex"
                        alignItems="center"
                        margin="0 24px"
                      >
                        <img
                          alt="flask"
                          src={imageByDrug[drug]}
                          style={{ width: "21px" }}
                        />
                        <Box fontWeight={600} fontSize="16px" marginLeft="4px">
                          x{drugQuantities[drug]}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  <Box
                    marginTop="40px"
                    fontWeight={600}
                    textTransform="uppercase"
                    fontSize="18px"
                  >
                    You can select up to{" "}
                    <span style={{ color: "#44DFFD" }}>{totalMintedCandy}</span>{" "}
                    runners
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
