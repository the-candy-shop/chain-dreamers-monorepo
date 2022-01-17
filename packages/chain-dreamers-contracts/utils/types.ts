export type Path = {
  d: number;
  fill: number;
  stroke: number;
};

export type Trait = Path[];

export type Palettes = {
  d: string[];
  fill: string[];
  trait: Record<string, Path[]>;
  layerIndexes: number[];
};

export type PalettesStorage = {
  fillBytes: string;
  dBytes: string[];
  dBytesIndexes: string;
  dIndexesDebug: number[];
  traitBytes: string;
  traitBytesIndexes: string;
  layerIndexes: string;
};

export type Layer = {
  traitName: string;
  itemName: string;
  hexString: string;
  layerIndex: number;
  itemIndex: number;
};

export type Layers = Layer[];

export type Runner = {
  runnerId: number;
  dna: string;
};

export type Runners = Runner[];
