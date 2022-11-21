import { placeHolderLogoImageUri } from "constants/images";
import { formatEther } from "ethers/lib/utils";
import useProjectMetadata from "hooks/ipfs/useProjectMetadata";
import Link from "next/link";
import React from "react";
import { ethers } from "ethers";
const ProjectCard = (p: any) => {
  const { project } = p;
  const { data: metadata } = useProjectMetadata(project.metadataURI);
  
  return (
    <Link href={`/projects/${project.address}`}>
      <a style={{ cursor: "pointer" }}>
        <div className="flex border border-2 border-black bg-[#FDBBBB]">
          <div className="w-1/3 mx-6 my-6 ">
            <img
              src={
                metadata?.imageUrl ? metadata.imageUrl : placeHolderLogoImageUri
              }
            />
          </div>
          <div className="w-2/3 mt-8 mr-2">
            <p className="truncate font-mono font-bold text-[#4A2222]">
              {metadata?.name ? metadata.name : "Unknown Project"}
            </p>
            <p className="mt-1 text-xs font-normal text-[#994B4B] font-mono">
              <b>
                Starts: <b className="text-[#4A2222]">11-04-2022</b> Ends:
                <b className="text-[#4A2222]">11-06-2022</b>
              </b>
            </p>
            <p className=" mt-1 text-xs font-normal font-mono text-[#994B4B]">
              <b className="text-lg text-[#4A2222]">
                {formatEther(project.stakeAmount)} ETH
              </b>{" "}
              <b> per stake</b>
            </p>
            <p className=" text-xs font-normal font-mono text-[#994B4B]">

              <b className="text-lg text-[#4A2222]">{+formatEther(project.stakeAmount)*(project.stakeEvents.length)} ETH</b>{" "}

              <b> current total stake</b>
            </p>
            <p className=" text-xs font-normal font-mono text-[#994B4B]">
              <b className="text-lg text-[#4A2222]">{project.stakeEvents.length}</b>{" "}
              <b> {project.stakeEvents.length===1 ? 'person has staked' : 'people have staked'}</b>
            </p>
            <p className="text-[#994B4B] font-bold text-mono text-xs">
              {metadata?.description ? metadata.description : ""}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ProjectCard;
