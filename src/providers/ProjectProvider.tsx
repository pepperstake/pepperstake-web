import { ProjectContext } from "contexts/ProjectContext";
import { useProjectState } from "hooks/graph/useProjectState";
import { PropsWithChildren } from "react";

export default function ProjectProvider({
  address,
  children,
}: PropsWithChildren<{
  address: string | undefined;
}>) {
  const project = useProjectState({ address });

  return (
    <ProjectContext.Provider value={project}>
      {children}
    </ProjectContext.Provider>
  );
}
