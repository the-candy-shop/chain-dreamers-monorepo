import React from "react";
import Box from "@mui/material/Box";
import { CircularProgress, keyframes } from "@mui/material";
import cell from "./cell.png";
import config from "../../config";

type LoadingDreamerMintImageProps = {
  runnerId: number;
  isDreamer: boolean;
};

const apiBaseUrl = config.app.apiBaseUrl;

function LoadingDreamerPublicMintImage({
  runnerId,
  isDreamer,
}: LoadingDreamerMintImageProps) {
  const randomDuration3 = React.useRef<number>(Math.random() * (2 - 1.5) + 1.5);
  const randomDuration4 = React.useRef<number>(Math.random() * (3 - 2.5) + 2.5);

  const animation = keyframes`
    0% {
      clip-path: inset(40% 0 61% 0);
      filter: blur(3px);
    }
    20% {
      clip-path: inset(92% 0 1% 0);
      filter: blur(4px);
    }
    40% {
      clip-path: inset(43% 0 1% 0);
      filter: blur(5px);
    }
    60% {
      clip-path: inset(25% 0 58% 0);
      filter: blur(4px);
    }
    80% {
      clip-path: inset(54% 0 7% 0);
      filter: blur(3px);
    }
    100% {
      clip-path: inset(58% 0 43% 0);
      filter: blur(2px);
    }
  `;

  return (
    <Box
      sx={{
        width: "160px",
        height: "160px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {isDreamer && (
        <Box
          sx={{
            width: "160px",
            height: "160px",
            backgroundImage: `url(${apiBaseUrl}/tokens/${runnerId}/img)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            position: "absolute",
            borderRadius: "16px",
            top: 0,
            left: 0,
            zIndex: 30,
          }}
        />
      )}
      <CircularProgress
        sx={{
          position: "absolute",
          zIndex: 20,
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          margin: "auto",
          color: "#DA4A8A",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "160px",
          height: "160px",
          backgroundColor: "black",
          opacity: 0.7,
          zIndex: 10,
        }}
      />
      {!isDreamer && (
        <Box
          sx={{
            width: "160px",
            height: "160px",
            backgroundImage: `url(${cell})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 15,
            willChange: "clip-path",
          }}
        />
      )}
      <Box
        sx={{
          width: "160px",
          height: "160px",
          backgroundImage: `url(https://api.chainrunners.xyz/tokens/${runnerId}/img)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "absolute",
          top: 0,
          left: 0,
          willChange: "clip-path",
          zIndex: 1,
          filter: "blur(5px)",
        }}
      />
      <Box
        sx={{
          width: "160px",
          height: "160px",
          animation: `${animation} ${randomDuration3.current}s infinite linear alternate-reverse`,
          backgroundImage: `url(https://api.chainrunners.xyz/tokens/${runnerId}/img)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "absolute",
          top: 0,
          left: "-6px",
          willChange: "clip-path",
          zIndex: 2,
        }}
      />
      <Box
        sx={{
          width: "160px",
          height: "160px",
          animation: `${animation} ${randomDuration4.current}s infinite linear alternate-reverse`,
          backgroundImage: `url(https://api.chainrunners.xyz/tokens/${runnerId}/img)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "absolute",
          top: 0,
          left: "6px",
          willChange: "clip-path",
          zIndex: 2,
        }}
      />
    </Box>
  );
}

export default LoadingDreamerPublicMintImage;
