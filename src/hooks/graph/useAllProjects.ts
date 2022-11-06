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

export function useAllProjects() {
  const [result] = useQuery({
    query: allProjectsQuery,
  });
  const { data, fetching, error } = result;
  return {
    projects: data?.pepperStakeContracts,
    fetching,
    error,
  };
}
