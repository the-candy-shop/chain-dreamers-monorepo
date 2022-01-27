import React from "react";
import Box from "@mui/material/Box";
import { CircularProgress, keyframes } from "@mui/material";

type GlitchedImageProps = {
  runnerId: number;
};

function GlitchedImage({ runnerId }: GlitchedImageProps) {
  const randomRunner1 = React.useRef<number>(
    Math.floor(Math.random() * (10000 - 1) + 1)
  );
  const randomRunner2 = React.useRef<number>(
    Math.floor(Math.random() * (10000 - 1) + 1)
  );

  const randomDuration1 = React.useRef<number>(Math.random() * (1.5 - 1) + 1);
  const randomDuration2 = React.useRef<number>(Math.random() * (1.5 - 1) + 1);
  const randomDuration3 = React.useRef<number>(Math.random() * (2 - 1.5) + 1.5);
  const randomDuration4 = React.useRef<number>(Math.random() * (3 - 2.5) + 2.5);

  const animation = keyframes`
    0% {
      clip-path: inset(40% 0 61% 0);
    }
    20% {
      clip-path: inset(92% 0 1% 0);
    }
    40% {
      clip-path: inset(43% 0 1% 0);
    }
    60% {
      clip-path: inset(25% 0 58% 0);
    }
    80% {
      clip-path: inset(54% 0 7% 0);
    }
    100% {
      clip-path: inset(58% 0 43% 0);
    }
  `;

  return (
    <Box
      sx={{
        width: "160px",
        height: "160px",
        borderRadius: "16px",
        backgroundImage: `url(https://api.chainrunners.xyz/tokens/${runnerId}/img)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",

        "&::before, &::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          width: "160px",
          height: "160px",
          overflow: "hidden",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          willChange: "clip-path",
        },

        "&::before": {
          left: "-6px",
          animation: `${animation} ${randomDuration3.current}s infinite linear alternate-reverse`,
          backgroundImage: `url(https://api.chainrunners.xyz/tokens/${runnerId}/img)`,
        },

        "&::after": {
          left: "6px",
          animation: `${animation} ${randomDuration4.current}s infinite linear alternate-reverse`,
          backgroundImage: `url(https://api.chainrunners.xyz/tokens/${runnerId}/img)`,
        },
      }}
    >
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
      <Box
        sx={{
          width: "160px",
          height: "160px",
          backgroundImage: `url(https://api.chainrunners.xyz/tokens/${randomRunner1.current}/img)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "absolute",
          top: 0,
          left: "-6px",
          animation: `${animation} ${randomDuration1.current}s infinite linear alternate-reverse`,
          willChange: "clip-path",
        }}
      />
      <Box
        sx={{
          width: "160px",
          height: "160px",
          backgroundImage: `url(https://api.chainrunners.xyz/tokens/${randomRunner2.current}/img)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "absolute",
          top: 0,
          left: "6px",
          animation: `${animation} ${randomDuration2.current}s infinite linear alternate-reverse`,
          willChange: "clip-path",
        }}
      />
    </Box>
  );
}

export default GlitchedImage;
