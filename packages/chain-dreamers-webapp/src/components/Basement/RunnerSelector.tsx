import React from "react";
import Box from "@mui/material/Box";
import { CandyList, candiesColors } from "../../candies";
import { MenuItem, Select, useMediaQuery } from "@mui/material";

type RunnerSelectorProps = {
  runnerId: number;
  toggleSelect: () => void;
  selectedCandy: CandyList | null;
  selectCandy: (candy: CandyList) => void;
  candyLeft: Record<CandyList, number>;
  disabled?: boolean;
};

function RunnerSelector({
  runnerId,
  toggleSelect,
  selectedCandy,
  selectCandy,
  candyLeft,
  disabled = false,
}: RunnerSelectorProps) {
  const isSmallWidth = useMediaQuery("(max-width:915px)");

  return (
    <Box
      padding="10px"
      margin="8px 0"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexDirection={isSmallWidth ? "column" : "row"}
      width={isSmallWidth ? "auto" : "500px"}
      sx={{
        opacity: disabled ? 0.3 : 1,
      }}
    >
      <Box display="flex" alignItems="center">
        <Box
          className={!!selectedCandy ? "selected" : ""}
          onClick={toggleSelect}
          sx={{
            width: "20px",
            height: "20px",
            borderRadius: "4px",
            border: "2px solid white",
            marginRight: "20px",
            cursor: disabled ? "unset" : "pointer",

            "&.selected": {
              backgroundColor: "#AC0BF7",
            },

            "&:hover": {
              opacity: disabled ? 1 : 0.8,
            },
          }}
        />
        <img
          alt="runner"
          src={`https://api.chainrunners.xyz/tokens/${runnerId}/img`}
          style={{ width: "64px", borderRadius: "16px" }}
        />
        <Box fontSize="22px" fontWeight={600} marginLeft="16px">
          Runner #{runnerId}
        </Box>
      </Box>
      <Box>
        {selectedCandy && (
          <Select
            value={selectedCandy}
            onChange={(event) => selectCandy(event.target.value as CandyList)}
            MenuProps={{
              sx: {
                "& .MuiPaper-root": {
                  backgroundColor: "black",
                  border: "1px solid #b101e6",
                },
              },
            }}
            sx={{
              border: 0,
              color: candiesColors[selectedCandy],
              fontWeight: 600,
              fontSize: "22px",

              "& .MuiSvgIcon-root": {
                color: candiesColors[selectedCandy],
              },

              "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "0 !important",
              },
            }}
          >
            {Object.values(CandyList).map((candy) => (
              <MenuItem
                key={candy}
                value={candy}
                disabled={candyLeft[candy] === 0}
                sx={{
                  color: candiesColors[candy],
                  fontSize: "22px",
                  fontWeight: 600,
                  padding: "6px 24px",
                }}
              >
                {candy}
              </MenuItem>
            ))}
          </Select>
        )}
      </Box>
    </Box>
  );
}

export default RunnerSelector;
