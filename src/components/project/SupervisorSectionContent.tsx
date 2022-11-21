import React from 'react'
import { ProjectContext } from "contexts/ProjectContext";
import { BigNumber } from "ethers";
import { useReturnStake } from "hooks/contract/useReturnStake";
import useDebounce from "hooks/useDebounce";
import { useContext, useEffect, useState } from "react";
import { parseWad } from "utils/number";
import { fromWad } from "utils/number";
import { useIsSupervisor } from 'hooks/graph/useIsSupervisor';

const IsSupervisorView = () => {
  const {  stakeEvents} = useContext(ProjectContext);
  const participantsList = 
  stakeEvents?.map((stakeEvent) => {
    return {
      type: "staked",
      address: stakeEvent.participant,
      amount: fromWad(stakeEvent.amount),
      txHash: stakeEvent.txHash,
      timestamp: stakeEvent.timestamp,
    };
  });
  return(
    <>
    <div className="mx-5 my-5">
      <>
        <div className="flex">
          <p className="flex font-bold font-mono">Participants</p>

          <p className=" flex absolute right-32 font-bold font-mono text-black">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className=" mr-2 mt-1 flex w-4 h-4 accent-[#FDBBBB] bg-gray-100 rounded border border-2 border-black "
            />
            Select All
          </p>
        </div>
        {participantsList?.map((participant, idx) => (
          <div
            className=" flex my-4 rounded-3xl h-16 bg-[#E9DDD1]"
            key={idx}
          >
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className=" flex ml-4 mt-6 w-4 h-4 accent-[#FDBBBB] bg-gray-100 rounded border border-2 border-black "
            />

            <p className="flex mx-4 py-5 font-bold font-mono text-black">
              {participant.address}
            </p>
          </div>
        ))}
      </>
    </div>
    <div className="flex">
      <div className="w-3/4"></div>
      <div className="w-1/4">
        <img
          className="pr-10  py-5"
          src="https://s2.loli.net/2022/11/06/kItTN9gb6RdUieH.png"
        />
      </div>
    </div>
  </>
  )
    
}

const IsNotSupervisorView = () => {
  return(
  <>
  <div className="">
    <img
      className="mx-80 my-10 w-36 place-content-center"
      src="https://s2.loli.net/2022/11/06/CxWUZsPjXqnyiEN.png"
    />
    <div className=" mx-5 mt-10 mb-6">
      <p className=" mx-48 font-mono font-bold text-black">
        YOU DO NOT HAVE ACCESS TO SUPERVISORS VIEW
      </p>
    </div>
  </div>
</>);

}

const SupervisorSectionContent = () => {
  const [contractAddress, setContractAddress] = useState<string>("")
  const [completingParticipants, setCompletingParticipants] = useState<string[]>([]);
  const isSupervisor = useIsSupervisor();

  const { write } = useReturnStake(contractAddress,completingParticipants);
  const handleSupervisorReturn = () => {
    write?.();
  };

  return (
    <>
      {isSupervisor? (
        <IsSupervisorView />
      ):(
        <IsNotSupervisorView />
      )
      }
    </>
  )
}

export default SupervisorSectionContent