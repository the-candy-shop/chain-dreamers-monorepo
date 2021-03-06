import React from "react";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import RunnerSearchOption from "./RunnerSearchOption";

const runnerIds: { label: string; id: number }[] = [];

for (let i = 1; i <= 10000; i++) {
  runnerIds.push({
    label: `Runner #${i}`,
    id: i,
  });
}

type RunnerSearchBarProps = {
  onRunnerSelect: (id: number) => void;
  selectedRunners: number[];
  alreadyMintedDreamers: boolean[];
};

function RunnerSearchBar({
  onRunnerSelect,
  selectedRunners,
  alreadyMintedDreamers,
}: RunnerSearchBarProps) {
  const [searchedValue, setSearchedValue] = React.useState<string>("");
  const [currentSearchKey, setCurrentSearchKey] =
    React.useState<string>("initial");

  const options = React.useMemo(
    () =>
      runnerIds
        .filter(
          (option) =>
            !alreadyMintedDreamers[option.id] &&
            option.label.includes(searchedValue)
        )
        .slice(0, 5),
    [searchedValue, alreadyMintedDreamers]
  );

  return (
    <Box
      sx={{
        "& .MuiPaper-root": {
          background: "#15090e",
          border: "1px solid #DA4A8A",
          marginTop: "4px",
        },

        "& .MuiAutocomplete-noOptions": {
          color: "white",
        },
      }}
    >
      <Autocomplete
        key={currentSearchKey}
        disablePortal
        onInputChange={(event, newInputValue) => {
          setSearchedValue(newInputValue);
        }}
        onChange={(_, option) => {
          if (option) {
            onRunnerSelect(option.id);
          }
          setSearchedValue("");
          setCurrentSearchKey(new Date().toISOString());
        }}
        options={options}
        color="secondary"
        sx={{
          width: 300,
          "& fieldset": {
            borderColor: "#DA4A8A !important",
            color: "#DA4A8A !important",
          },
          "& .MuiInputBase-input": {
            color: "white",
          },
          "& .MuiInputLabel-root": {
            color: "#DA4A8A !important",
          },
          "& .MuiIconButton-root": {
            color: "#DA4A8A !important",
          },
        }}
        renderInput={(params) => (
          <TextField {...params} label="Search runners to set free" />
        )}
        getOptionDisabled={(option) =>
          selectedRunners.some((id) => id === option.id)
        }
        noOptionsText="No Runners found"
        renderOption={(props, option) => (
          <RunnerSearchOption
            key={option.id}
            option={option}
            LiProps={props}
            available={!alreadyMintedDreamers[option.id]}
          />
        )}
      />
    </Box>
  );
}

export default RunnerSearchBar;
