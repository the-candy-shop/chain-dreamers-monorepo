import React from "react";
import Box from "@mui/material/Box";
import { useDreamersContract } from "../../hooks/useDreamersContract";
import { CircularProgress } from "@mui/material";

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
  const { isDreamerAvailable } = useDreamersContract();
  const [isRunnerAvailable, setRunnerAvailable] =
    React.useState<boolean>(available);
  const [isLoadingAvailability, setIsLoadingAvailability] =
    React.useState<boolean>(false);

  const loadAvailability = React.useCallback(async () => {
    setIsLoadingAvailability(true);
    const isAvailable = await isDreamerAvailable(option.id);
    setRunnerAvailable(isAvailable);
    setIsLoadingAvailability(false);
  }, [isDreamerAvailable, option.id]);

  React.useEffect(() => {
    if (available) {
      loadAvailability();
    }
  }, [loadAvailability, available]);

  const disabled = React.useMemo(
    () => isLoadingAvailability || !isRunnerAvailable,
    [isLoadingAvailability, isRunnerAvailable]
  );

  // eslint-disable-next-line jsx-a11y/role-supports-aria-props
  return (
    <li
      {...LiProps}
      style={{ padding: 0, margin: 0, display: "block" }}
      role="option"
      aria-disabled={disabled || LiProps["aria-disabled"]}
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
          color={isRunnerAvailable ? "#1ab60e" : "#b60e0e"}
          fontSize="12px"
          display="flex"
          alignItems="center"
        >
          {!isLoadingAvailability
            ? isRunnerAvailable
              ? "Available"
              : "Already minted"
            : ""}
          {isLoadingAvailability && (
            <CircularProgress
              sx={{
                color: "#DA4A8A",
                width: "20px !important",
                height: "20px !important",
              }}
            />
          )}
        </Box>
      </Box>
    </li>
  );
}

export default RunnerSearchOption;
