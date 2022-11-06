import { ProjectContext } from "contexts/ProjectContext";
import gql from "graphql-tag";
import { useContext } from "react";
import { useQuery } from "urql";
import { useAccount } from "wagmi";

const isParticipantQuery = gql`
  query isParticipantQuery($participant: String!, $contractAddress: String!) {
    stakeEvents(
      where: {
        pepperStakeContract_: { address: $contractAddress }
        participant: $participant
      }
    ) {
      amount
    }
  }
`;

export function useIsParticipant() {
  const { address } = useAccount();
  const { address: contractAddress } = useContext(ProjectContext);
  const [result] = useQuery({
    query: isParticipantQuery,
    variables: {
      participant: address,
      contractAddress,
    },
  });
  const { data } = result;

  return data && data.stakeEvents.length > 0;
}
