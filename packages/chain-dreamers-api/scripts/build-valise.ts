import * as path from "path";
import * as fs from "fs";

const TRAITS_ORDER = [
  "BACKGROUND",
  "RACE",
  "FACE",
  "MOUTH",
  "NOSE",
  "EYES",
  "EAR_ACCESSORIES",
  "FACE_ACCESSORIES",
  "MASK",
  "HEAD_BELOW",
  "EYES_ACCESSORIES",
  "HEAD_ABOVE",
  "MOUTH_ACCESSORIES",
];

(async function () {
  const files = getAllFiles(
    path.join(
      __dirname,
      "../../chain-dreamers-image-processing/assets/VALISE_CHAIN_DREAMERS_COMPUTED"
    )
  );

  const valiseValue: string[] = [];

  TRAITS_ORDER.forEach((category, index) => {
    const categoryFile = files
      .filter((file) => file.fileName.includes(category))
      .sort();

    for (const file of categoryFile) {
      valiseValue.push(
        fs
          .readFileSync(file.filePath, "utf8")
          .replace(/<svg.*?>/, "")
          .replace("</svg>", "")
      );
    }
  });

  fs.writeFileSync(
    path.join(__dirname, "../valise.json"),
    JSON.stringify(valiseValue)
  );
})();

function getAllFiles(
  dirPath: string,
  arrayOfFiles: { fileName: string; filePath: string }[] = []
): { fileName: string; filePath: string }[] {
  const files = fs.readdirSync(dirPath);

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push({
        fileName: file,
        filePath: path.join(dirPath, "/", file),
      });
    }
  });

  return arrayOfFiles;
}
