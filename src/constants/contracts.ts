import pepperStakeDeployer from "constants/abi/PepperStakeDeployer.json";
import PepperStake from "constants/abi/PepperStake.json";

export const contracts = {
  goerli: {
    pepperStakeDeployer: {
      address: "0x2d328072a0892925d6b9cdb017724d4978c04792",
      abi: pepperStakeDeployer.abi,
    },
    pepperStake: {
      abi: PepperStake.abi,
    },
  },
};
