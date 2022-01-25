import * as path from "path";
import * as fs from "fs";

const TRAITS_CATEGORIES = [
  "Background",
  "Race",
  "Face",
  "Mouth",
  "Nose",
  "Eyes",
  "Ear accessory",
  "Face accessory",
  "Mask",
  "Head below",
  "Eyes accessory",
  "Head above",
  "Mouth accessory",
];

(async function () {
  const files = getValiseSVGFiles();

  const metaValue: { trait_type: string; value: string }[] = [];

  for (const file of files) {
    metaValue.push({ trait_type: file.category, value: file.trait });
  }

  fs.writeFileSync(
    path.join(__dirname, "../meta.json"),
    JSON.stringify(metaValue)
  );
})();

function getAllFiles(
  dirPath: string,
  arrayOfFiles: {
    fileName: string;
    filePath: string;
    categoryIndex: number;
    traitIndex: number;
    category: string;
    trait: string;
  }[] = []
): {
  fileName: string;
  filePath: string;
  categoryIndex: number;
  traitIndex: number;
  category: string;
  trait: string;
}[] {
  const files = fs.readdirSync(dirPath);

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      const fileNameSplit = file.split("-");
      const fileCategoryIndex = parseInt(fileNameSplit[0]);
      const fileTraitIndex = parseInt(fileNameSplit[1]);
      const fileTraitName = fileNameSplit[2].replace(".svg", "");

      arrayOfFiles.push({
        fileName: file,
        filePath: path.join(dirPath, "/", file),
        categoryIndex: fileCategoryIndex,
        traitIndex: fileTraitIndex,
        category: TRAITS_CATEGORIES[fileCategoryIndex],
        trait: fileTraitName,
      });
    }
  });

  return arrayOfFiles;
}

function getValiseSVGFiles() {
  const files = getAllFiles(
    path.join(
      __dirname,
      "../../chain-dreamers-image-processing/assets/VALISE_CHAIN_DREAMERS_COMPUTED"
    )
  ).filter((file) => file.fileName.endsWith(".svg"));

  return sortByTraitIndexed(files);
}

function sortByTraitIndexed(
  files: {
    fileName: string;
    filePath: string;
    categoryIndex: number;
    traitIndex: number;
    category: string;
    trait: string;
  }[]
) {
  return files.sort((file1, file2) => {
    if (file1.categoryIndex === file2.categoryIndex) {
      if (file1.traitIndex < file2.traitIndex) {
        return -1;
      } else {
        return 1;
      }
    } else if (file1.categoryIndex < file2.categoryIndex) {
      return -1;
    } else {
      return 1;
    }
  });
}
