import * as path from "path";
import * as fs from "fs";

(async function () {
  const files = getValiseSVGFiles();
  console.log("files", files.length);

  const valiseValue: string[] = [];

  for (const file of files) {
    console.log("filename", file.fileName);
    valiseValue.push(
      fs
        .readFileSync(file.filePath, "utf8")
        .replace(/<svg.*?>/, "")
        .replace("</svg>", "")
    );
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

function getValiseSVGFiles() {
  const files = getAllFiles(
    path.join(
      __dirname,
      "../../chain-dreamers-image-processing/assets/VALISE_CHAIN_DREAMERS_COMPUTED"
    )
  ).filter((file) => file.fileName.endsWith(".svg"));

  return sortByTraitIndexed(files);
}

function sortByTraitIndexed(files: { fileName: string; filePath: string }[]) {
  return files.sort((file1, file2) => {
    const file1NameSplit = file1.fileName.split("-");
    const file2NameSplit = file2.fileName.split("-");

    const file1CategoryIndex = parseInt(file1NameSplit[0]);
    const file2CategoryIndex = parseInt(file2NameSplit[0]);

    const file1TraitIndex = parseInt(file1NameSplit[1]);
    const file2TraitIndex = parseInt(file2NameSplit[1]);

    if (file1CategoryIndex === file2CategoryIndex) {
      if (file1TraitIndex < file2TraitIndex) {
        return -1;
      } else {
        return 1;
      }
    } else if (file1CategoryIndex < file2CategoryIndex) {
      return -1;
    } else {
      return 1;
    }
  });
}
