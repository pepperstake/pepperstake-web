import { ProjectContext } from "contexts/ProjectContext";
import gql from "graphql-tag";
import { useContext } from "react";
import { useQuery } from "urql";
import { useAccount } from "wagmi";

const isSupervisorQuery = gql`
  query isSupervisorQuery($supervisor: String! $contractAddress: String!) {
    pepperStakeContracts(
    where:{
      address:$contractAddress
      supervisors_contains:[$supervisor]
    }
  ){
    id
    supervisors
    address
  }
  }
`;

export function useIsSupervisor() {
  const { address } = useAccount();
  const { address: contractAddress } = useContext(ProjectContext);
  const [result] = useQuery({
    query: isSupervisorQuery,
    variables: {
      supervisor: address,
      contractAddress,
    },
  });
  const { data } = result;
  if(data){
  console.log("data", data);
  console.log("contract", data.pepperStakeContracts);
  console.log("length", data.pepperStakeContracts.length);
  }
  return data && data.pepperStakeContracts.length > 0;
return null;
}
