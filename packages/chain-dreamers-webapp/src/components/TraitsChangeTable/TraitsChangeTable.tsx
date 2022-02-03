import Box, { BoxProps } from "@mui/material/Box";
import equal from "./equal.png";
import shuffleChainMeth from "./shuffle-chain-meth.png";
import shuffleHeliumSpice from "./shuffle-helium-spice.png";
import shuffleSomnusTears from "./shuffle-somnus-tears.png";
import { useMediaQuery } from "@mui/material";
import { CandyList, candiesColors } from "../../candies";

const shuffleImages = {
  [CandyList.ChainMeth]: shuffleChainMeth,
  [CandyList.SomnusTears]: shuffleSomnusTears,
  [CandyList.HeliumSpice]: shuffleHeliumSpice,
};

export enum Traits {
  Background = "Background",
  Race = "Race",
  Face = "Face",
  Mouth = "Mouth",
  Nose = "Nose",
  Eyes = "Eyes",
  EarAccessories = "Ear accessories",
  FaceAccessories = "Face accessories",
  Mask = "Mask",
  HeadBelow = "Head below",
  EyesAccessories = "Eyes accessories",
  HeadAbove = "Head above",
  MouthAccessories = "Mouth accessories",
}

export const TraitChangesForCandies = {
  [CandyList.ChainMeth]: {
    [Traits.Background]: 1,
    [Traits.Race]: 0,
    [Traits.Face]: 0,
    [Traits.Mouth]: 0,
    [Traits.Nose]: 0,
    [Traits.Eyes]: 0,
    [Traits.EarAccessories]: 1,
    [Traits.FaceAccessories]: 1,
    [Traits.Mask]: 1,
    [Traits.HeadBelow]: 0,
    [Traits.EyesAccessories]: 1,
    [Traits.HeadAbove]: 1,
    [Traits.MouthAccessories]: 1,
  },
  [CandyList.SomnusTears]: {
    [Traits.Background]: 0,
    [Traits.Race]: 1,
    [Traits.Face]: 1,
    [Traits.Mouth]: 1,
    [Traits.Nose]: 1,
    [Traits.Eyes]: 1,
    [Traits.EarAccessories]: 0,
    [Traits.FaceAccessories]: 0,
    [Traits.Mask]: 0,
    [Traits.HeadBelow]: 1,
    [Traits.EyesAccessories]: 0,
    [Traits.HeadAbove]: 0,
    [Traits.MouthAccessories]: 0,
  },
  [CandyList.HeliumSpice]: {
    [Traits.Background]: 0.1,
    [Traits.Race]: 0,
    [Traits.Face]: 0,
    [Traits.Mouth]: 0,
    [Traits.Nose]: 0,
    [Traits.Eyes]: 0,
    [Traits.EarAccessories]: 0,
    [Traits.FaceAccessories]: 0,
    [Traits.Mask]: 0,
    [Traits.HeadBelow]: 0,
    [Traits.EyesAccessories]: 0,
    [Traits.HeadAbove]: 0,
    [Traits.MouthAccessories]: 0,
  },
};

type TraitsChangeTableProps = {
  candy: CandyList;
  sx?: BoxProps["sx"];
};

function TraitsChangeTable({ candy, sx }: TraitsChangeTableProps) {
  const isSmallWidth = useMediaQuery("(max-width:915px)");
  const changesTraits = TraitChangesForCandies[candy];
  const shuffle = shuffleImages[candy];

  return (
    <Box sx={sx}>
      <Box
        fontWeight="bold"
        fontSize={isSmallWidth ? "18px" : "24px"}
        marginBottom="48px"
        color={candiesColors[candy]}
      >
        List of {candy.toString()} effects, by trait
      </Box>
      <Box>
        {enumKeys(Traits).map((traitKey) => {
          const traitName = Traits[traitKey];
          return (
            <Box
              key={traitKey}
              display="flex"
              borderBottom="1px solid rgba(255, 255, 255, 0.2)"
              padding="8px 0"
              justifyContent="space-between"
              alignItems="center"
              sx={{ "&:last-child": { border: 0 } }}
            >
              <Box fontWeight="600" fontSize={isSmallWidth ? "14px" : "16px"}>
                {traitName}
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                <img
                  alt="effect"
                  src={changesTraits[traitName] === 0 ? equal : shuffle}
                  style={{
                    height: isSmallWidth ? "18px" : "31px",
                    width: isSmallWidth ? "18px" : "31px",
                  }}
                />
                {changesTraits[traitName] !== 0 &&
                  changesTraits[traitName] !== 1 && (
                    <span
                      style={{ fontSize: "12px", color: candiesColors[candy] }}
                    >
                      {changesTraits[traitName] * 100}%
                    </span>
                  )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
  return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
}

export default TraitsChangeTable;
