import React from "react";
import Box from "@mui/material/Box";
import Typist from "react-typist";

function DreamerMintingMessages() {
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
    }, 60000);
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
        <Typist avgTypingDelay={20}>Let's start! Here, take your candy!</Typist>
      )}
      {messageToShow === 2 && (
        <Typist avgTypingDelay={20}>
          Can you feel it? It takes a moment to kick in, but soon you'll be
          dreaming like never before...
        </Typist>
      )}
      {messageToShow === 3 && (
        <Typist avgTypingDelay={20}>
          That's it! You should feel the transformation happening. Your body and
          mind will elevate in a moment!
        </Typist>
      )}
      {messageToShow === 4 && (
        <Typist avgTypingDelay={20}>
          Almost there! You're almost a dreamer...
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

export default DreamerMintingMessages;
