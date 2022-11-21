import { useAllProjects } from "hooks/graph/useAllProjects";
import Link from "next/link";
import { formatEther } from "ethers/lib/utils";
import ProjectCard from "components/ProjectCard";

const ProjectPage = () => {
  const { projects } = useAllProjects();
  console.log("projects", projects);
  return (
    <div className="my-10 mx-10">
      <div className="flex">
        <div className="w-3/4">
          <h1 className="text-3xl font-bold font-mono">
            Projects on PepperStake
          </h1>
        </div>
        <div className="w-1/4  ">
          <Link href="/projects/create">
            <a style={{ cursor: "pointer" }}>
              <img src="https://s2.loli.net/2022/11/06/9wjonBuil5Z6SYX.png" />
            </a>
          </Link>
        </div>
      </div>
      <div className="mt-4 w-full ">
        <p className=" font-mono text-[#994B4B] bg-[#FEC90D] text-xs font-bold py-4 px-4  block w-full rounded-xl border border-2 border-[#4A2222] ">
          <span>
            {" "}
            <img
              className="h-7 w-7 float-left mr-3"
              src="https://s2.loli.net/2022/11/05/TY4CeJwBZRrfMc5.png"
            />
          </span>
          The PepperStake protocol is open to anyone, and project configurations
          can vary widely. There are risks associated with interacting with all
          projects on the protocol. Projects built on the protocol are not
          endorsed or vetted by PepperStake Protocol. Do your own research and
          understand the risks before committing your funds.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-10 mx-4">
        {projects &&
          projects.map((project: any) => (
            <div key={project.pepperStakeContract.address}>
              <ProjectCard project={project.pepperStakeContract} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProjectPage;
