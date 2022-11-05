import { contracts } from "constants/contracts";
import { usePrepareContractWrite, useContractWrite } from "wagmi";

export function useReturnStake(
  contractAddress: string,
  completingParticipants: string[]
) {
  const { pepperStake } = contracts.goerli;
  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: pepperStake.abi,
    functionName: "returnStake",
    args: [completingParticipants],
  });
  return useContractWrite(config);
}
