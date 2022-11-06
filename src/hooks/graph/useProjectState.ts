import { ProjectContextType } from "contexts/ProjectContext";
import gql from "graphql-tag";
import { useQuery } from "urql";

const projectQuery = gql`
  query projectQuery($address: String!) {
    pepperStakeContract(id: $address) {
      address
      stakeAmount
      metadataURI
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
  const project: ProjectContextType = {
    address,
    stakeAmount,
    metadataURI,
  };

  return project;
}
