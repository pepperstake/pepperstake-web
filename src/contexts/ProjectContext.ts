import { BigNumber } from "ethers";
import { createContext } from "react";

export type ProjectContextType = {
  address: string | undefined;
  stakeAmount: BigNumber | undefined;
};

export const ProjectContext = createContext<ProjectContextType>({
  address: undefined,
  stakeAmount: undefined,
});
