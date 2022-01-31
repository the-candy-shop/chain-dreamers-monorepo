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

function RunnerSearchBar() {
  const [searchedValue, setSearchedValue] = React.useState<string>("");

  const options = React.useMemo(
    () =>
      runnerIds
        .filter((option) => option.label.includes(searchedValue))
        .slice(0, 5),
    [searchedValue]
  );

  return (
    <Box>
      <Autocomplete
        disablePortal
        open={true}
        onInputChange={(event, newInputValue) => {
          setSearchedValue(newInputValue);
        }}
        options={options}
        sx={{ width: 300, "& :MuiPaper-root": { background: "black" } }}
        renderInput={(params) => (
          <TextField {...params} label="Search runners to set free" />
        )}
        renderOption={(props, option) => (
          <RunnerSearchOption key={option.id} option={option} />
        )}
      />
    </Box>
  );
}

export default RunnerSearchBar;
