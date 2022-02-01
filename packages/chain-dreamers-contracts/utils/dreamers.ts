import { Path, Trait } from "./types";
import { loadPalettes } from "./constants";

const palettes = loadPalettes();
export const D_ATTRIBUTE_PALETTE = ["M", "L", "Q", "C", "A", "H", "V", "Z"];
export const D_REGEX = /[MLQCAHVZ][\d ,.]+/g;

export const getSvg = (trait: Trait): string => {
  return trait
    .map(
      ({ d, fill }) =>
        `<path d='${palettes.d[d]}' fill='#${palettes.fill[fill]}' stroke='#000' stroke-linecap='round' stroke-linejoin='round' stroke-width='0.71' />`
    )
    .join("\n");
};

export const normalizeD = (d: string): string => {
  return d
    .replace(/%20/g, " ")
    .replace(D_REGEX, (path) => {
      const command = path[0];
      const args = path.slice(1).split(/[ ,]/g);
      return `${command} ${args
        .filter(Boolean)
        .map((n) => parseInt(n))
        .join(" ")} `;
    })
    .trim();
};

export const inlineTrait = (trait: Trait): string => {
  return trait
    .map(({ d, fill, stroke }) => `d: ${d}; fill: ${fill}; stroke: ${stroke};`)
    .join(" ")
    .trim();
};

export const encodeDAttribute = (attribute: string): string => {
  return ("000" + D_ATTRIBUTE_PALETTE.indexOf(attribute).toString(2)).slice(-3);
};

export const encodeDCoordinate = (coordinate: string): string => {
  if (parseInt(coordinate) > 255) {
    throw new Error("Coordinate is too large");
  }
  return coordinate
    ? ("0".repeat(8) + parseInt(coordinate).toString(2)).slice(-8)
    : "";
};

export const encodeDToBits = (path: string): string => {
  const pathElements = path.match(D_REGEX);
  if (pathElements === null || pathElements.join("") !== path) {
    throw new Error(`Invalid path string: ${path}`);
  }
  return pathElements
    .map(
      (item) =>
        encodeDAttribute(item[0]) +
        item.slice(1).split(/[ ,]/).map(encodeDCoordinate).join("")
    )
    .join("");
};

export const encodeDToBytes = (string: string): string => {
  const bits = encodeDToBits(string);
  const bytes = (bits + "0".repeat(8))
    .slice(0, 8 * Math.ceil(bits.length / 8))
    .match(/.{8}/g);

  if (bytes === null || bytes.join("").slice(0, bits.length) !== bits) {
    throw new Error("Invalid path string");
  }

  return bytes
    .map((byte) => ("0" + parseInt(byte, 2).toString(16)).slice(-2))
    .join("");
};

export const uint16ToBytes = (uint16: number): string => {
  return ("0".repeat(4) + uint16.toString(16)).slice(-4);
};

export const numberToUint =
  (bits: number) =>
  (number: number): string => {
    return ("0".repeat(bits) + number.toString(2)).slice(-bits);
  };

export const encodePath = (path: Path): string => {
  return (
    "0".repeat(6) +
    parseInt(
      numberToUint(12)(path.d) + numberToUint(11)(path.fill) + path.stroke,
      2
    ).toString(16)
  ).slice(-6);
};

export const encodeTrait = (trait: Trait): string => {
  return trait.map(encodePath).join("");
};
