import axios from "axios";
import { ProjectMetadataContextType } from "contexts/ProjectMetadataContext";
import { useQuery } from "react-query";
import { cidToUrl, ipfsLinkToCid } from "utils/ipfs";

export default function useProjectMetadata(metadataURI: string | undefined) {
  const url = cidToUrl(ipfsLinkToCid(metadataURI || ""));
  return useQuery(
    ["project-metadata", url],
    async () => {
      if (!url) {
        throw new Error("Project URI not specified.");
      }
      const response = await axios.get(url);
      const r: ProjectMetadataContextType = response.data
        ? {
            ...response.data,
            imageUrl: cidToUrl(response.data.imageCid),
          }
        : {
            name: undefined,
            description: undefined,
            imageUrl: undefined,
          };
      return r;
    },
    {
      enabled: !!metadataURI,
      staleTime: 60000,
    }
  );
}
