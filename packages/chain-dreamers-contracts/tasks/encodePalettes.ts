import { task } from "hardhat/config";
import fs from "fs";
import { Palettes } from "../utils/types";
import { encodeDToBytes, encodePath, uint16ToBytes } from "../utils/dreamers";
import {
  MAX_CONTRACT_SIZE,
  PALETTES_FILE,
  PALETTES_ENCODED_FILE,
} from "../utils/constants";

task(
  "encode-palettes",
  "Take the d, fill and traits palettes and turns them into bytes for storage"
)
  .addOptionalParam("input", "The output file", PALETTES_FILE)
  .addOptionalParam("output", "The output file", PALETTES_ENCODED_FILE)
  .setAction(async ({ input, output }, { ethers }) => {
    const {
      utils: { hexDataLength },
    } = ethers;

    const palettes: Palettes = JSON.parse(
      fs.readFileSync(input, { encoding: "utf-8" })
    );

    const fillBytes = "0x" + palettes.fill.join("");
    console.assert(
      hexDataLength(fillBytes) < MAX_CONTRACT_SIZE,
      "Fill is greater than 24k"
    );

    const dBytesArray = palettes.d.map(encodeDToBytes);
    const dBytes = [];
    const dIndexesDebug = [];
    let dBytesIndexes = "0x";
    let currentStorageBytes = "0x";
    let totalStorageBytes = 0;
    for (const d of dBytesArray) {
      dBytesIndexes += uint16ToBytes(totalStorageBytes);
      dIndexesDebug.push(totalStorageBytes);
      if (
        hexDataLength(currentStorageBytes) + d.length / 2 >
        MAX_CONTRACT_SIZE
      ) {
        dBytes.push(currentStorageBytes);
        currentStorageBytes = "0x";
      }
      currentStorageBytes += d;
      totalStorageBytes += d.length / 2;
    }
    dBytes.push(currentStorageBytes);
    dIndexesDebug.push(totalStorageBytes);
    dBytesIndexes += uint16ToBytes(totalStorageBytes);

    let traitBytes = "0x";
    let traitBytesIndexes = "0x";
    for (const trait of Object.values(palettes.trait)) {
      traitBytesIndexes += uint16ToBytes(hexDataLength(traitBytes));
      traitBytes += trait.map(encodePath).join("");
    }
    traitBytesIndexes += uint16ToBytes(hexDataLength(traitBytes));

    const layerIndexes =
      "0x" +
      palettes.layerIndexes.map((key) => uint16ToBytes(key)).join("") +
      uint16ToBytes(Object.keys(palettes.trait).length);

    const paletteBytes = {
      fillBytes,
      dBytes,
      dBytesIndexes,
      dIndexesDebug,
      traitBytes,
      traitBytesIndexes,
      layerIndexes,
    };

    fs.writeFileSync(output, JSON.stringify(paletteBytes, null, 2));
  });
