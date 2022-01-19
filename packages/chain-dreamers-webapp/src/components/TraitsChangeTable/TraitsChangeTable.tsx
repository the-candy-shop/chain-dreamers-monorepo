import Box, { BoxProps } from "@mui/material/Box";
import equal from "./equal.png";
import shuffle from "./shuffle.png";
import { useMediaQuery } from "@mui/material";

export enum DrugList {
  ChainMeth = "Chain Meth",
  SomnusTears = "Somnus Tears",
  HeliumSpice = "Helium Spice",
}

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

export const TraitChangesForDrugs = {
  [DrugList.ChainMeth]: {
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
  [DrugList.SomnusTears]: {
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
  [DrugList.HeliumSpice]: {
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
  drug: DrugList;
  sx?: BoxProps["sx"];
};

function TraitsChangeTable({ drug, sx }: TraitsChangeTableProps) {
  const isMobile = useMediaQuery("(max-width:915px)");
  const changesTraits = TraitChangesForDrugs[drug];

  return (
    <Box sx={sx}>
      <Box
        fontWeight="bold"
        fontSize={isMobile ? "18px" : "32px"}
        marginBottom="48px"
      >
        List of all {drug.toString()} Effect, by trait.
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
              <Box fontWeight="600" fontSize={isMobile ? "14px" : "16px"}>
                {traitName}
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                <img
                  alt="effect"
                  src={changesTraits[traitName] === 0 ? equal : shuffle}
                  style={{
                    height: isMobile ? "18px" : "31px",
                    width: isMobile ? "18px" : "31px",
                  }}
                />
                {changesTraits[traitName] !== 0 &&
                  changesTraits[traitName] !== 1 && (
                    <span style={{ fontSize: "12px", color: "#ac0cf7" }}>
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
