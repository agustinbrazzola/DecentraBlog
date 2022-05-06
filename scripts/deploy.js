/* scripts/deploy.js */
const hre = require("hardhat");
const fs = require('fs');

async function main() {
  /* these two lines deploy the contract to the network */
  const DecentraBlog = await hre.ethers.getContractFactory("DecentraBlog");
  const decentraBlog = await DecentraBlog.deploy();

  await decentraBlog.deployed();
  console.log("DecentraBlog deployed to:", decentraBlog.address);

  /* this code writes the contract addresses to a local */
  /* file named config.js that we can use in the app */
  fs.writeFileSync('./config.js', `
  export const contractAddress = "${decentraBlog.address}"
  export const ownerAddress = "${decentraBlog.signer.address}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });