import pepperstakeDeployer from "@pepperstake/pepperstake-contracts/out/PepperStakeDeployer.sol/PepperStakeDeployer.json";
import pepperstake from "@pepperstake/pepperstake-contracts/out/PepperStake.sol/PepperStake.json";
import pepperstakeGoerliDeploy from "@pepperstake/pepperstake-contracts/broadcast/Deploy.s.sol/5/run-latest.json";

export const contracts = {
  goerli: {
    pepperStakeDeployer: {
      address: pepperstakeGoerliDeploy.transactions[0].contractAddress,
      abi: pepperstakeDeployer.abi,
    },
    pepperStake: {
      abi: pepperstake.abi,
    },
  },
};
