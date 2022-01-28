import React from "react";
import Box from "@mui/material/Box";
import { useDreamersContract } from "../../hooks/useDreamersContract";
import ShopPanels from "../ShopPanels/ShopPanels";
import config from "../../config";

const apiBaseUrl = config.app.apiBaseUrl;

function MyDreamers() {
  const { dreamersIds } = useDreamersContract();

  return (
    <Box display="flex" flexDirection="column" minHeight="calc(100vh - 191px)">
      <Box marginTop="23px" marginBottom="40px" display="flex" flex={1}>
        <Box flex={1}>
          <ShopPanels title="My Dreamers" sx={{ height: "100%" }}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
              padding="32px"
            >
              {dreamersIds.map((id) => (
                <Box key={id} margin="16px">
                  <img
                    alt={`Dreamer ${id}`}
                    src={`${apiBaseUrl}/tokens/${id}/img`}
                    style={{ width: "256px", borderRadius: "16px" }}
                  />
                  <Box fontWeight={600} fontSize="22px" marginTop="8px">
                    Dreamer #{id}
                  </Box>
                </Box>
              ))}
            </Box>
          </ShopPanels>
        </Box>
      </Box>
    </Box>
  );
}

export default MyDreamers;
