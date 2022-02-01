import React from "react";
import Box from "@mui/material/Box";

type RunnerSearchOptionProps = {
  option: {
    label: string;
    id: number;
  };
  LiProps: React.HTMLAttributes<HTMLLIElement>;
  available: boolean;
};

function RunnerSearchOption({
  option,
  LiProps,
  available,
}: RunnerSearchOptionProps) {
  // eslint-disable-next-line jsx-a11y/role-supports-aria-props
  return (
    <li
      {...LiProps}
      style={{ padding: 0, margin: 0, display: "block" }}
      role="option"
      aria-disabled={!available || LiProps["aria-disabled"]}
      aria-selected={LiProps["aria-selected"]}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding="2px 8px"
        sx={{
          "&:hover": {
            backgroundColor: "rgba(255,255,255,.1)",
          },

          "&:active": {
            backgroundColor: "rgba(255,255,255,.2)",
          },
        }}
      >
        <Box display="flex" alignItems="center">
          <Box marginRight="8px">
            <img
              alt="runner"
              src={`https://api.chainrunners.xyz/tokens/${option.id}/img`}
              style={{ width: "64px", borderRadius: "16px" }}
            />
          </Box>
          <Box color="white" fontWeight={600}>
            {option.label}
          </Box>
        </Box>
        <Box
          color={available ? "#1ab60e" : "#b60e0e"}
          fontSize="12px"
          display="flex"
          alignItems="center"
        >
          {available ? "Available" : "Already minted"}
        </Box>
      </Box>
    </li>
  );
}

export default RunnerSearchOption;
