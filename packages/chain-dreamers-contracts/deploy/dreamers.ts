// noinspection JSUnusedGlobalSymbols

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { TAGS } from "../utils/constants";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  let openseaAddress = ethers.constants.AddressZero;
  let looksrareAddress = ethers.constants.AddressZero;
  let chainRunnersAddress: string;
  let chainRunnersRendererAddress: string;
  let baseURI: string;
  let baseURIOG: string;

  if (network.tags.mainnet) {
    openseaAddress = "0xa5409ec958c83c3f309868babaca7c86dcb077c1";
    looksrareAddress = "0xf42aa99f011a1fa7cda90e5e98b277e306bca83e";
    chainRunnersAddress = "0x97597002980134beA46250Aa0510C9B90d87A587";
    chainRunnersRendererAddress = "0xfDac77881ff861fF76a83cc43a1be3C317c6A1cC";
    baseURI = "https://api.chaindreamers.xyz/tokens/";
    baseURIOG = "https://api.chaindreamers.xyz/og/tokens/";
  } else {
    openseaAddress = "0xf57b2c51ded3a29e6891aba85459d600256cf317";
    looksrareAddress = "0x3f65a762f15d01809cdc6b43d8849ff24949c86a";
    const ChainRunners = await deployments.get("ChainRunners");
    chainRunnersAddress = ChainRunners.address;
    const ChainRunnersLayerRenderer = await deployments.get(
      "ChainRunnersLayerRenderer"
    );
    chainRunnersRendererAddress = ChainRunnersLayerRenderer.address;
    baseURI = "https://api.chaindreamers.xyz/staging/tokens/";
    baseURIOG = "https://api.chaindreamers.xyz/staging/og/tokens/";
  }

  // Deploy renderer
  const Integers = await deployments.get("Integers");
  const rendererTx = await deploy("DreamersRenderer", {
    from: deployer,
    log: true,
    args: [chainRunnersRendererAddress, chainRunnersAddress, baseURI],
    libraries: { Integers: Integers.address },
  });
  await deploy("DeepDreamRenderer", {
    from: deployer,
    log: true,
    args: [baseURIOG],
  });

  // Deploy token
  await deploy("ChainDreamers", {
    from: deployer,
    log: true,
    args: [
      "Chain Dreamers",
      "DRE",
      rendererTx.address,
      chainRunnersAddress,
      openseaAddress,
      looksrareAddress,
      16,
    ],
  });
};
export default func;
func.tags = [TAGS.CHAIN_DREAMERS];
func.dependencies = [TAGS.INTEGERS, TAGS.CHAIN_RUNNERS];
