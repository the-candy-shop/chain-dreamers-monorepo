import React from "react";
import { keyframes, useMediaQuery } from "@mui/material";
import flaskCm from "./flask-cm.png";
import pillCm from "./pill-cm.png";
import flaskSt from "./flask-st.png";
import pillSt from "./pill-st.png";
import flaskHs from "./flask-hs.png";
import pillHs from "./pill-hs.png";
import Box from "@mui/material/Box";
import { CandyList } from "../../candies";

type AnimatedFlaskProps = {
  candy: CandyList;
};

const candyImages = {
  [CandyList.ChainMeth]: {
    flask: flaskCm,
    pill: pillCm,
  },
  [CandyList.SomnusTears]: {
    flask: flaskSt,
    pill: pillSt,
  },
  [CandyList.HeliumSpice]: {
    flask: flaskHs,
    pill: pillHs,
  },
};

function AnimatedFlask({ candy }: AnimatedFlaskProps) {
  const isSmallWidth = useMediaQuery("(max-width:915px)");

  const animationDuration = React.useRef<number>(
    Math.random() * (0.8 - 0.6) + 0.6
  );

  const pillFallAnimation = keyframes`
    0 %  { top: -50px },
    100% { top: 120px  }
  `;

  return (
    <Box
      position="relative"
      minWidth={isSmallWidth ? "75px" : "150px"}
      minHeight={isSmallWidth ? "200px" : "337px"}
      margin={isSmallWidth ? "0 8px" : "0 16px"}
    >
      <Box position="absolute" bottom="0" zIndex={2}>
        <img
          alt="flask"
          src={candyImages[candy].flask}
          style={{ width: isSmallWidth ? "75px" : "150px" }}
        />
      </Box>
      <Box
        position="absolute"
        zIndex={1}
        top={isSmallWidth ? "-25px" : "-50px"}
        left={isSmallWidth ? "calc(50% - 12.5px)" : "calc(50% - 25px)"}
        minWidth={isSmallWidth ? "25px" : "50px"}
        sx={{
          willChange: "top",
          animation: `${pillFallAnimation} linear ${animationDuration.current}s infinite`,
        }}
      >
        <img
          alt="pill"
          src={candyImages[candy].pill}
          style={{ width: isSmallWidth ? "25px" : "50px" }}
        />
      </Box>
    </Box>
  );
}

export default AnimatedFlask;
