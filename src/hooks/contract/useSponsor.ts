import { contracts } from "constants/contracts";
import { ProjectContext } from "contexts/ProjectContext";
import { BigNumberish } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { useContext } from "react";
import { usePrepareContractWrite, useContractWrite, useAccount } from "wagmi";

export function useSponsor(
  amount: BigNumberish,
  options: {
    enabled?: boolean;
  } = { enabled: true }
) {
  const { address: contractAddress } = useContext(ProjectContext);
  const { address } = useAccount();
  const { pepperStake } = contracts.goerli;
  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress || "",
    contractInterface: pepperStake.abi,
    functionName: "sponsor",
    overrides: {
      from: address,
      value: amount,
    },
    enabled: options.enabled,
  });
  return useContractWrite(config);
}
