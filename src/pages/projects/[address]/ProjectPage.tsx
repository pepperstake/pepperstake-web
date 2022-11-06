// app main page
import ProjectContent from "components/project/ProjectContent";
import { useRouter } from "next/router";
import ProjectMetadataProvider from "providers/ProjectMetadataProvider";
import ProjectProvider from "providers/ProjectProvider";

export default function ProjectPage() {
  const router = useRouter();
  const address = router.query.address as string;

  return (
    <ProjectProvider address={address}>
      <ProjectMetadataProvider>
        <ProjectContent />
      </ProjectMetadataProvider>
    </ProjectProvider>
  );
}
