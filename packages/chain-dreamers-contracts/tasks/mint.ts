import { task } from "hardhat/config";

task("mint", "Mint a Chain Runner")
  .addParam("tokenId", "The token Id")
  .addOptionalParam("token", "The token to mint", "ChainRunners")
  .setAction(async ({ tokenId, token }, { deployments, getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts();
    const { execute } = deployments;

    await execute(
      token,
      {
        from: deployer,
        log: true,
      },
      "mint",
      parseInt(tokenId)
    );
  });
