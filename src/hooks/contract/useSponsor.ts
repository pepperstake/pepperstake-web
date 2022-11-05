import { contracts } from "constants/contracts";
import { parseEther } from "ethers/lib/utils";
import { usePrepareContractWrite, useContractWrite, useAccount } from "wagmi";

export function useSponsor(contractAddress: string, amount: string) {
  const { address } = useAccount();
  const { pepperStake } = contracts.goerli;
  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: pepperStake.abi,
    functionName: "sponsor",
    overrides: {
      from: address,
      value: parseEther(amount),
    },
  });
  return useContractWrite(config);
}
