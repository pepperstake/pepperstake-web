// app main page
import ProjectContent from "components/project/ProjectContent";
import { useRouter } from "next/router";
import ProjectProvider from "providers/ProjectProvider";

export default function ProjectPage() {
  const router = useRouter();
  const address = router.query.address as string;

  return (
    <ProjectProvider address={address}>
      <ProjectContent />
    </ProjectProvider>
  );
}
