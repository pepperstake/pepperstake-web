import { ProjectContext } from "contexts/ProjectContext";
import { ProjectMetadataContext } from "contexts/ProjectMetadataContext";
import useProjectMetadata from "hooks/ipfs/useProjectMetadata";
import { PropsWithChildren, useContext } from "react";

export default function ProjectMetadataProvider({
  children,
}: PropsWithChildren<{}>) {
  const { metadataURI } = useContext(ProjectContext);
  const { data: metadata } = useProjectMetadata(metadataURI);
  const projectMetadata = metadata ?? {
    name: "",
    description: "",
    imageUrl: "",
  };

  return (
    <ProjectMetadataContext.Provider value={projectMetadata}>
      {children}
    </ProjectMetadataContext.Provider>
  );
}
