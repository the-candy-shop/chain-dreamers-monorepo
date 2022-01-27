import { readdirSync } from "fs";
import { join } from "path";

const CONTRACT_DEPLOY_FILES_BASE_LOCATION = join(
  __dirname,
  "../../chain-dreamers-contracts/deployments"
);

export function extractContractAddresses(network: string) {
  const folderPath = `${CONTRACT_DEPLOY_FILES_BASE_LOCATION}/${network}`;
  const files = readdirSync(folderPath)
    .filter((file) => file.includes(".json"))
    .map((file) => ({
      fileName: file,
      filePath: join(folderPath, "/", file),
      contractName: file.replace(".json", ""),
    }));

  const contracts: Record<string, string> = {};

  for (const file of files) {
    const json = require(file.filePath);
    contracts[file.contractName] = json["address"];
  }

  return contracts;
}
