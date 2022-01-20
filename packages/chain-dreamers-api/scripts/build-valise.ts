import * as path from "path";
import * as fs from "fs";

(async function () {
  const files = getAllFiles(
    path.join(__dirname, "../assets/VALISE_CHAIN_DREAMERS_TRAITS")
  );

  const valiseValue: Record<string, Record<string, string>> = {};

  for (const file of files) {
    const { fileName, filePath } = file;

    const traitString = fileName
      .replace("CD_", "")
      .replace("CP_", "")
      .replace(".svg", "");

    const traitStringSplit = traitString.split("_");
    const traitValue = traitStringSplit[traitStringSplit.length - 1];
    const traitName = traitString.replace(`_${traitValue}`, "");

    if (traitName && traitValue) {
      if (!valiseValue[traitName]) {
        valiseValue[traitName] = {};
      }

      valiseValue[traitName][traitValue] = fs
        .readFileSync(filePath, "utf8")
        .replace(/<svg.*?>/, "")
        .replace("</svg>", "");
    }
  }

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
