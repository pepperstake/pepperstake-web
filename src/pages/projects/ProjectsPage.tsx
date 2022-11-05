import { useAllProjects } from "hooks/graph/useAllProjects";
import Link from "next/link";

const ProjectPage = () => {
  const { projects } = useAllProjects();
  console.log(projects);
  return (
    <div>
      <h1>Projects</h1>
      {projects &&
        projects.map((project) => (
          <div key={project.address}>
            <Link href={`/projects/${project.address}`}>{project.address}</Link>
          </div>
        ))}
    </div>
  );
};

export default ProjectPage;
