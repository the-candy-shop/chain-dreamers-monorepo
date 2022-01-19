import fs from "fs";
import { Layers, Palettes, PalettesStorage, Runners, SKU } from "./types";

export const MAX_CONTRACT_SIZE = 24_000;
export const PALETTES_FILE = "palettes-hv.json";
export const PALETTES_STORAGE_FILE = "palettes-storage.json";
export const RUNNERS_DNA_FILE = "runners-dna.json";
export const RUNNERS_LAYERS_FILE = "runners-layers.json";
export const NONE_COLOR = "000001";
export const SKUS_FILE = "skus.json";

export const loadPalettes = (): Palettes => {
  try {
    return JSON.parse(fs.readFileSync(PALETTES_FILE, "utf8"));
  } catch (e) {
    console.error(e);
    return {
      d: [],
      fill: [],
      trait: {},
      layerIndexes: [],
    };
  }
};

export const loadPalettesStorage = (): PalettesStorage => {
  try {
    return JSON.parse(fs.readFileSync(PALETTES_STORAGE_FILE, "utf8"));
  } catch (e) {
    console.error(e);
    return {
      fillBytes: "",
      dBytes: [],
      dBytesIndexes: "",
      dIndexesDebug: [],
      traitBytes: "",
      traitBytesIndexes: "",
      layerIndexes: "",
    };
  }
};

export const loadRunnersDna = (): Runners => {
  try {
    return JSON.parse(fs.readFileSync(RUNNERS_DNA_FILE, "utf8"));
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const loadRunnersLayers = (): Layers => {
  try {
    return JSON.parse(fs.readFileSync(RUNNERS_LAYERS_FILE, "utf8"));
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const loadSkus = (): SKU[] => {
  try {
    return JSON.parse(fs.readFileSync(SKUS_FILE, "utf8"));
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const chainRunnersBaseRendererAddress = (): string => {
  return process.env.CHAIN_RUNNERS_BASE_RENDERER_ADDRESS || "";
};
export const chainRunnersAddress = (): string => {
  return process.env.CHAIN_RUNNERS_ADDRESS || "";
};

// Deploy constants
export const TAGS = {
  INTEGERS: "Integers",
  DREAMERS_RENDERER: "DreamersRenderer",
  DREAMERS_PALETTES: "ChainDreamersPalettes",
  CHAIN_RUNNERS: "ChainRunners",
  BYTES_SHIFT: "BytesShift",
  CANDY_SHOP: "CandyShop",
  CANDY_SHOP_INVENTORY: "CandyShopInventory",
};
