import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { useDreamersContract } from "../../hooks/useDreamersContract";
import ShopPanels from "../ShopPanels/ShopPanels";
import config from "../../config";
import Typist from "react-typist";
import Button from "@mui/lab/LoadingButton";
import { useIsOpen } from "../../hooks/useIsOpen";

const apiBaseUrl = config.app.apiBaseUrl;
const openSeaBaseUrl = config.app.openSeaBaseUrl;

function MyDreamers() {
  const navigate = useNavigate();
  const { isCandyShopOpen } = useIsOpen();
  const { dreamersIds, address } = useDreamersContract();

  const goToTheCandyShop = React.useCallback(() => {
    navigate("/candy-shop");
  }, [navigate]);

  const goToTheJail = React.useCallback(() => {
    navigate("/jail");
  }, [navigate]);

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
                  <a
                    href={`${openSeaBaseUrl}/assets/${address}/${id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      alt={`Dreamer ${id}`}
                      src={`${apiBaseUrl}/tokens/${id}/img`}
                      style={{ width: "256px", borderRadius: "16px" }}
                    />
                  </a>
                  <Box fontWeight={600} fontSize="22px" marginTop="8px">
                    Dreamer #{id}
                  </Box>
                </Box>
              ))}
              {dreamersIds.length === 0 && (
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Box
                    sx={{
                      fontSize: "18px",
                      fontFamily: "Share Tech Mono",
                      padding: "32px 32px 64px 32px",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    <Typist avgTypingDelay={20}>
                      You have no dreamers yet...
                    </Typist>
                  </Box>
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
                    onClick={isCandyShopOpen ? goToTheCandyShop : goToTheJail}
                  >
                    Go to the {isCandyShopOpen ? "Candy Shop" : "Jail"}
                  </Button>
                </Box>
              )}
            </Box>
          </ShopPanels>
        </Box>
      </Box>
    </Box>
  );
}

export default MyDreamers;
