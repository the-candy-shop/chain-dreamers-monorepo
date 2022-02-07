import { useRemainingTimeJailOpen } from "../../hooks/useRemainingTimeJailOpen";
import Box from "@mui/material/Box";
import React from "react";

function RemainingTimeBlock() {
  const { remainingTimeOpenInSeconds } = useRemainingTimeJailOpen();
  const remainingDays = Math.floor(remainingTimeOpenInSeconds / 60 / 60 / 24);
  const remainingHours =
    Math.floor(remainingTimeOpenInSeconds / 60 / 60) - remainingDays * 24;
  const remainingMinutes =
    Math.floor(remainingTimeOpenInSeconds / 60) -
    remainingHours * 60 -
    remainingDays * 24 * 60;
  const remainingSeconds =
    remainingTimeOpenInSeconds -
    remainingMinutes * 60 -
    remainingHours * 3600 -
    remainingDays * 24 * 3600;

  return (
    <Box
      sx={{
        fontSize: "22px",
        color: "#DA4A8A",
        paddingTop: "12px",
        paddingBottom: "12px",
        border: "1px solid #DA4A8A",
        textAlign: "center",
      }}
    >
      Drug effects on Dreamers are disappearing. Jail guards will have no reason
      to keep them anymore.
      <br />
      They'll all be set free in in {remainingDays} days, {remainingHours}{" "}
      hours, {remainingMinutes} minutes, {remainingSeconds} seconds and you
      won't be able to mint them anymore.
    </Box>
  );
}

export default RemainingTimeBlock;
