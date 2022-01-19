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
    [Traits.Background]: true,
    [Traits.Race]: false,
    [Traits.Face]: false,
    [Traits.Mouth]: false,
    [Traits.Nose]: false,
    [Traits.Eyes]: false,
    [Traits.EarAccessories]: true,
    [Traits.FaceAccessories]: true,
    [Traits.Mask]: true,
    [Traits.HeadBelow]: false,
    [Traits.EyesAccessories]: true,
    [Traits.HeadAbove]: true,
    [Traits.MouthAccessories]: true,
  },
  [DrugList.SomnusTears]: {
    [Traits.Background]: false,
    [Traits.Race]: true,
    [Traits.Face]: true,
    [Traits.Mouth]: true,
    [Traits.Nose]: true,
    [Traits.Eyes]: true,
    [Traits.EarAccessories]: false,
    [Traits.FaceAccessories]: false,
    [Traits.Mask]: false,
    [Traits.HeadBelow]: true,
    [Traits.EyesAccessories]: false,
    [Traits.HeadAbove]: false,
    [Traits.MouthAccessories]: false,
  },
  [DrugList.HeliumSpice]: {
    [Traits.Background]: true,
    [Traits.Race]: false,
    [Traits.Face]: false,
    [Traits.Mouth]: false,
    [Traits.Nose]: false,
    [Traits.Eyes]: false,
    [Traits.EarAccessories]: false,
    [Traits.FaceAccessories]: false,
    [Traits.Mask]: false,
    [Traits.HeadBelow]: false,
    [Traits.EyesAccessories]: false,
    [Traits.HeadAbove]: false,
    [Traits.MouthAccessories]: false,
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
        fontSize={isMobile ? "24px" : "32px"}
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
              <Box fontWeight="600">{traitName}</Box>
              <Box>
                <img
                  alt="effect"
                  src={changesTraits[traitName] ? shuffle : equal}
                  style={{ height: "31px", width: "31px" }}
                />
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
