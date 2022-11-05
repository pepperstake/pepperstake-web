import { contracts } from "constants/contracts";
import { usePrepareContractWrite, useContractWrite } from "wagmi";

export function usePostReturnWindowDistribution(contractAddress: string) {
  const { pepperStake } = contracts.goerli;
  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: pepperStake.abi,
    functionName: "postReturnWindowDistribution",
  });
  return useContractWrite(config);
}
