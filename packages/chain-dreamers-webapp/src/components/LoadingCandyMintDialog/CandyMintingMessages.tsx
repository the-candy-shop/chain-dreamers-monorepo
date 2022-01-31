import React from "react";
import Box from "@mui/material/Box";
import Typist from "react-typist";

function CandyMintingMessages() {
  const [messageToShow, setMessageToShow] = React.useState<number>(1);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMessageToShow(2);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMessageToShow(3);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMessageToShow(4);
    }, 25000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMessageToShow(5);
    }, 120000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        fontSize: "20px",
        fontFamily: "Share Tech Mono",
        padding: "32px 32px 64px 32px",
        textAlign: "center",
        color: "white",
      }}
    >
      {messageToShow === 1 && (
        <Typist avgTypingDelay={20}>Let me prepare your poison...</Typist>
      )}
      {messageToShow === 2 && (
        <Typist avgTypingDelay={20}>
          I need to adjust the dosage, so this can take a while...
        </Typist>
      )}
      {messageToShow === 3 && (
        <Typist avgTypingDelay={20}>
          You wouldn't want to end up brain dead after your dream, would you? So
          let me take my time...
        </Typist>
      )}
      {messageToShow === 4 && (
        <Typist avgTypingDelay={20}>
          Be patient. I assure you, this will be worth the wait...
        </Typist>
      )}
      {messageToShow === 5 && (
        <Typist avgTypingDelay={20}>
          Well... this is awkward... it shouldn't take that long. Maybe try to
          reload the page...
        </Typist>
      )}
    </Box>
  );
}

export default CandyMintingMessages;
