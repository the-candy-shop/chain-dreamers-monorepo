import { useDreamersContract } from "../../hooks/useDreamersContract";
import React from "react";
import Box from "@mui/material/Box";

type RunnerSearchOptionProps = {
  option: {
    label: string;
    id: number;
  };
};

function RunnerSearchOption({ option }: RunnerSearchOptionProps) {
  const { isDreamerAvailable } = useDreamersContract();
  const [isRunnerAvailable, setRunnerAvailable] =
    React.useState<boolean>(false);
  const [isLoadingAvailability, setIsLoadingAvailability] =
    React.useState<boolean>(false);

  const loadAvailability = React.useCallback(async () => {
    setIsLoadingAvailability(true);
    const isAvailable = await isDreamerAvailable(option.id);
    setRunnerAvailable(isAvailable);
    setIsLoadingAvailability(false);
  }, [isDreamerAvailable]);

  React.useEffect(() => {
    loadAvailability();
  }, []);

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <Box>
          <img
            alt="runner"
            src={`https://api.chainrunners.xyz/tokens/${option.id}/img`}
            style={{ width: "64px", borderRadius: "16px" }}
          />
        </Box>
        <Box>{option.label}</Box>
      </Box>
      <Box>{isRunnerAvailable.toString()}</Box>
    </Box>
  );
}

export default RunnerSearchOption;
