import { useAllProjects } from "hooks/graph/useAllProjects";
import Link from "next/link";
import { formatEther } from "ethers/lib/utils";
const PersonalProjectPage = () => {
  const { projects } = useAllProjects();
  return (
    <div className="my-10 mx-10 bg-[#FDBBBB] rounded-3xl border-[#4A2222] border-2 ">
      <div className="flex">
        <div className="w-3/4">
          <h1 className="pl-10 pt-10 text-3xl font-bold font-mono">
            My PepperStakes
          </h1>
        </div>
        <div className="w-1/4 mr-14 mt-10">
          <Link href="/projects/create">
            <a style={{ cursor: "pointer" }}>
              <img src="https://s2.loli.net/2022/11/06/9wjonBuil5Z6SYX.png" />
            </a>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-10 pb-10 mx-14 mx-4">
        {projects &&
          projects.map((project: any) => (
            <div key={project.address}>
              <Link href={`/projects/${project.address}`}>
                <a style={{ cursor: "pointer" }}>
                  <div className="flex border border-2 border-black bg-[#FAEEE1]">
                    <div className="w-1/3 mx-6 my-6 ">
                      <img src="https://s2.loli.net/2022/11/06/quhZY5Lje7gD2tk.png"></img>
                    </div>
                    <div className="w-2/3 mt-8 mr-2">
                      <p className="truncate font-mono font-bold text-[#4A2222]">
                        Project Name
                      </p>
                      <p className="mt-1 text-xs font-normal text-[#994B4B] font-mono">
                        <b>
                          Starts: <b className="text-[#4A2222]">11-04-2022</b>{" "}
                          Ends:<b className="text-[#4A2222]">11-06-2022</b>
                        </b>
                      </p>
                      <p className=" mt-1 text-xs font-normal font-mono text-[#994B4B]">
                        <b className="text-lg text-[#4A2222]">
                          {formatEther(project.stakeAmount)} ETH
                        </b>{" "}
                        <b> per stake</b>
                      </p>
                      <p className=" text-xs font-normal font-mono text-[#994B4B]">
                        <b className="text-lg text-[#4A2222]">
                          {formatEther(0)} ETH
                        </b>{" "}
                        <b> current total stake</b>
                      </p>
                      <p className=" text-xs font-normal font-mono text-[#994B4B]">
                        <b className="text-lg text-[#4A2222]">{0}</b>{" "}
                        <b> people have staked</b>
                      </p>
                      <p className="text-[#994B4B] font-bold text-mono text-xs">
                        Descriptions
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PersonalProjectPage;
