import { ProjectContextType } from "contexts/ProjectContext";
import gql from "graphql-tag";
import { useQuery } from "urql";

const projectQuery = gql`
  query projectQuery($address: String!) {
    pepperStakeContract(id: $address) {
      address
      creator
      supervisors
      stakeAmount
      unreturnedStakeBeneficiaries
      returnWindowDays
      maxParticipants
      shouldParticipantsShareUnreturnedStake
      shouldUseSupervisorInactionGuard
      metadataURI
      stakeEvents{
        participant
        amount
        txHash
        timestamp
      }
      sponsorEvents{
        amount
        txHash
        timestamp
        participant
      }
      returnStakeEvents{
        txHash
        amount
        timestamp
        completingParticipants
        supervisor
      }
      
    }
  }
`;

export function useProjectState({ address }: { address: string | undefined }) {
  const [result] = useQuery({
    query: projectQuery,
    variables: {
      address,
    },
  });
  const { data } = result;
  const stakeAmount = data?.pepperStakeContract?.stakeAmount;
  const metadataURI = data?.pepperStakeContract?.metadataURI;
  const supervisors = data?.pepperStakeContract?.supervisors;
  const creator = data?.pepperStakeContract?.creator;
  const unreturnedStakeBeneficiaries = data?.pepperStakeContract?.unreturnedStakeBeneficiaries;
  const returnWindowDays = data?.pepperStakeContract?.returnWindowDays;
  const maxParticipants = data?.pepperStakeContract?.maxParticipants;
  const shouldParticipantsShareUnreturnedStake = data?.pepperStakeContract?.shouldParticipantsShareUnreturnedStake;
  const shouldUseSupervisorInactionGuard = data?.pepperStakeContract?.shouldUseSupervisorInactionGuard;
  const stakeEvents = data?.pepperStakeContract?.stakeEvents;
  const sponsorEvents = data?.pepperStakeContract?.sponsorEvents;
  const returnStakeEvents = data?.pepperStakeContract?.returnStakeEvents;
  
  const project: ProjectContextType = {
    address,
    supervisors,
    stakeAmount,
    metadataURI,
    creator,
    unreturnedStakeBeneficiaries,
    returnWindowDays,
    maxParticipants,
    shouldParticipantsShareUnreturnedStake,
    shouldUseSupervisorInactionGuard,
    stakeEvents,
    sponsorEvents,
    returnStakeEvents,

  };

  return project;
}
