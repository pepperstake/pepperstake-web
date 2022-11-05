import { contracts } from "constants/contracts";
import { DeployPepperStakeData } from "models/contractData";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

export function useDeployPepperStake(deployData: DeployPepperStakeData) {
  const { pepperStakeDeployer } = contracts.goerli;
  const { config } = usePrepareContractWrite({
    addressOrName: pepperStakeDeployer.address,
    contractInterface: pepperStakeDeployer.abi,
    functionName: "deployPepperStake",
    args: [...Object.values(deployData)],
  });
  return useContractWrite(config);
}
