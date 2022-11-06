import { contracts } from "constants/contracts";
import { ProjectContext } from "contexts/ProjectContext";
import { BigNumber } from "ethers";
import { useContext } from "react";
import { usePrepareContractWrite, useContractWrite, useAccount } from "wagmi";

export function useStake() {
  const { address } = useAccount();
  const { address: contractAddress, stakeAmount } = useContext(ProjectContext);
  const { pepperStake } = contracts.goerli;
  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress || "",
    contractInterface: pepperStake.abi,
    functionName: "stake",
    overrides: {
      from: address,
      value: stakeAmount || BigNumber.from(0),
    },
  });
  return useContractWrite(config);
}
