import { BigNumber } from "ethers";
import { createContext } from "react";

export type StakeEvent = {
  participant: string;
  amount: BigNumber;
  txHash: string;
  timestamp: number;
};

export type SponsorEvent = {
  amount: BigNumber;
  txHash: string;
  timestamp: number;
  participant: string;
};

export type ReturnStakeEvent = {
  txHash: string;
  amount: BigNumber;
  timestamp: number;
  completingParticipants: string[];
  supervisor: string;
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
  sponsorEvents: SponsorEvent[] | undefined;
  returnStakeEvents: ReturnStakeEvent[] | undefined;

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
  sponsorEvents: undefined,
  returnStakeEvents: undefined,

});
