import gql from "graphql-tag";
import { useQuery } from "urql";

const allProjectsQuery = gql`
  query allProjectsQuery {
    pepperStakeContracts {
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
    }
  }
`;

const allProjectsQueryByTime = gql`
  query allProjectsQueryByTime {
    deployPepperStakeEvents(orderedBy:timestamp orderDirection: desc){
    	id
    	txHash
      timestamp
      pepperStakeContract{
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
    }
    
  }
  }
`;
export function useAllProjects() {
  const [result] = useQuery({
    query: allProjectsQueryByTime,
  });
  const { data, fetching, error } = result;
  console.log("data", data);
  return {
    projects: data?.deployPepperStakeEvents,
    fetching,
    error,
  };
}
