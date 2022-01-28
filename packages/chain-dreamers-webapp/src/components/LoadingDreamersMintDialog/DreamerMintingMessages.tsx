import React from "react";
import Box from "@mui/material/Box";
import Typist from "react-typist";
import Button from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";

type DreamerMintingMessagesProps = {
  isDoneMinting: boolean;
};

function DreamerMintingMessages({
  isDoneMinting,
}: DreamerMintingMessagesProps) {
  const navigate = useNavigate();

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

  const handleGoMyDreamersButtonClick = React.useCallback(async () => {
    navigate("/my-dreamers");
  }, [navigate]);

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
      {!isDoneMinting && messageToShow === 1 && (
        <Typist avgTypingDelay={20}>Let's start! Here, take your candy!</Typist>
      )}
      {!isDoneMinting && messageToShow === 2 && (
        <Typist avgTypingDelay={20}>
          Can you feel it? It takes a moment to kick in, but soon you'll be
          dreaming like never before...
        </Typist>
      )}
      {!isDoneMinting && messageToShow === 3 && (
        <Typist avgTypingDelay={20}>
          That's it! You should feel the transformation happening. Your body and
          mind will elevate in a moment!
        </Typist>
      )}
      {!isDoneMinting && messageToShow === 4 && (
        <Typist avgTypingDelay={20}>
          Almost there! You're almost a dreamer...
        </Typist>
      )}
      {!isDoneMinting && messageToShow === 5 && (
        <Typist avgTypingDelay={20}>
          Well... this is awkward... it shouldn't take that long. Maybe try to
          reload the page...
        </Typist>
      )}
      {isDoneMinting && (
        <>
          <Typist avgTypingDelay={20}>
            Congratulations! Enjoy your dreams, Runners !
          </Typist>
          <Button
            variant="contained"
            sx={{
              marginTop: "32px",
              fontSize: "20px",
              fontWeight: 600,
              padding: "12px 24px",
              color: "black",
              background: "#44DFFD",
              width: "370px",

              "&.Mui-disabled": {
                background: "rgba(68,223,253,.2)",
              },

              "&:hover": {
                background: "#44DFFD",
              },
            }}
            onClick={handleGoMyDreamersButtonClick}
          >
            Go to your dreamers page
          </Button>
        </>
      )}
    </Box>
  );
}

export default DreamerMintingMessages;
