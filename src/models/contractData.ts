import { BigNumber } from "ethers";

export interface DeployPepperStakeData {
  supervisors: string[];
  stakeAmount: BigNumber;
  unreturnedStakeBeneficiaries: string[];
  returnWindowDays: number;
  maxParticipants: number;
  shouldParticipantsShareUnreturnedStake: boolean;
  shouldUseSupervisorInactionGuard: boolean;
  metadataURI: string;
}
