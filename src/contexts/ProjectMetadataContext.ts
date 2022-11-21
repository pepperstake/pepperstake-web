import { BigNumber } from "ethers";
import { createContext } from "react";

export type ProjectMetadataContextType = {
  name: string | undefined;
  description: string | undefined;
  imageUrl: string | undefined;
};

export const ProjectMetadataContext = createContext<ProjectMetadataContextType>({
  name: undefined,
  description: undefined,
  imageUrl: undefined,
});


export type StakeEvent = {
  participant: string;
  amount: BigNumber;
  txHash: string;
  timestamp: number;
};

export type ProjectContextType = {
  address: string | undefined;
  supervisors: string[] | undefined;
  stakeAmount: BigNumber | undefined;
  metadataURI: string | undefined;
  creator: string | undefined;
  unreturnedStakeBeneficiaries: string[] | undefined;
  returnWindowDays: BigNumber | undefined;
  maxParticipants: BigNumber | undefined;
  shouldParticipantsShareUnreturnedStake: boolean | undefined;
  shouldUseSupervisorInactionGuard: boolean | undefined;
  stakeEvents: StakeEvent[] | undefined;
};

export const ProjectContext = createContext<ProjectContextType>({
  address: undefined,
  supervisors: undefined,
  stakeAmount: undefined,
  metadataURI: undefined,
  creator: undefined,
  unreturnedStakeBeneficiaries: undefined,
  returnWindowDays: undefined,
  maxParticipants: undefined,
  shouldParticipantsShareUnreturnedStake: undefined,
  shouldUseSupervisorInactionGuard: undefined,
  stakeEvents: undefined,
});
