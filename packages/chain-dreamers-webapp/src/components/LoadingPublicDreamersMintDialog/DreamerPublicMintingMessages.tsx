import React from "react";
import Box from "@mui/material/Box";
import Typist from "react-typist";
import Button from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

type DreamerMintingMessagesProps = {
  isDoneMinting: boolean;
};

function DreamerPublicMintingMessages({
  isDoneMinting,
}: DreamerMintingMessagesProps) {
  const isSmallWidth = useMediaQuery("(max-width:915px)");
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
    }, 120000);
    return () => clearTimeout(timer);
  }, []);

  const handleGoMyDreamersButtonClick = React.useCallback(async () => {
    navigate("/my-dreamers");
  }, [navigate]);

  return (
    <Box
      sx={{
        fontSize: "18px",
        fontFamily: "Share Tech Mono",
        padding: "32px 32px 64px 32px",
        textAlign: "center",
        color: "white",
      }}
    >
      {!isDoneMinting && messageToShow === 1 && (
        <Typist avgTypingDelay={20}>
          I've given the bail money to the prison. Your dreamers will soon be
          free...
        </Typist>
      )}
      {!isDoneMinting && messageToShow === 2 && (
        <Typist avgTypingDelay={20}>
          After all the... candy they took, who knows in what shape they are
          now. I guess we'll find out in a moment...
        </Typist>
      )}
      {!isDoneMinting && messageToShow === 3 && (
        <Typist avgTypingDelay={20}>
          Somnus minions are very efficient when they chase runners, but when
          they have to let them go... I guess we'll have to be a little more
          patient...
        </Typist>
      )}
      {!isDoneMinting && messageToShow === 4 && (
        <Typist avgTypingDelay={20}>
          Almost there! I can here them coming...
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
            Congratulations! Enjoy your dreams, Runners!
          </Typist>
          <Button
            variant="contained"
            sx={{
              marginTop: "32px",
              fontSize: isSmallWidth ? "15px" : "20px",
              fontWeight: 600,
              padding: "12px 24px",
              color: "black",
              background: "#44DFFD",
              width: isSmallWidth ? "192px" : "370px",

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

export default DreamerPublicMintingMessages;
