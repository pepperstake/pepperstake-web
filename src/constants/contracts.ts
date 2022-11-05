import pepperStakeDeployer from "constants/abi/PepperStakeDeployer.json";
import PepperStake from "constants/abi/PepperStake.json";

export const contracts = {
  goerli: {
    pepperStakeDeployer: {
      address: "0xfd0366D100C87f319Bc58B199D527De232f527c2",
      abi: pepperStakeDeployer.abi,
    },
    pepperStake: {
      abi: PepperStake.abi,
    },
  },
};
