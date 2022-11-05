import gql from "graphql-tag";
import { useQuery } from "urql";

const allProjectsQuery = gql`
  query allProjectsQuery {
    pepperStakeContracts {
      address
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
