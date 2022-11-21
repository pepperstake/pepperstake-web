// app main page
import ParticipantSectionContent from "components/project/ParticipantSectionContent";
import SponsorSectionContent from "components/project/SponsorSectionContent";
import { ProjectContext } from "contexts/ProjectContext";
import { ProjectMetadataContext } from "contexts/ProjectMetadataContext";
import React, { useContext } from "react";
import { useState } from "react";
import { formatEther } from "ethers/lib/utils";
import { fromWad } from "utils/number";
import { Affix, Modal} from 'antd';
import SupervisorSectionContent from "./SupervisorSectionContent";
export default function ProjectContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { name, description, imageUrl } = useContext(ProjectMetadataContext);
  const { address, shouldUseSupervisorInactionGuard, stakeAmount, stakeEvents, sponsorEvents, returnStakeEvents,
    shouldParticipantsShareUnreturnedStake, unreturnedStakeBeneficiaries} = useContext(ProjectContext);
  const startDate = "2022-11-04";
  const endDate = "2022-11-06";
  const inactionGuard = shouldUseSupervisorInactionGuard;
  const shareUnreturnedStake = shouldParticipantsShareUnreturnedStake;
  const totalParticipants = stakeEvents?.length;
  console.log(stakeAmount);
  let totalCurrentStake = 0;
  if(stakeAmount){
    totalCurrentStake = totalParticipants! * (+formatEther(stakeAmount!));
  }
  // const totalCurrentStake = 0;
  console.log(inactionGuard)

  const [creatorView, setCreatorView] = useState(true);
  const [supervisorView, setSupervisorView] = useState(false);
  const [participantsView, setParticipantsView] = useState(false);
  const [sponsorView, setSponsorView] = useState(false);

  const [sponsorReward, setSponsorReward] = useState(0.5);

  const isSupervisor = true;

  const toggleCreatorView = () => {
    setCreatorView(true);
    setSupervisorView(false);
    setParticipantsView(false);
    setSponsorView(false);
  };
  const toggleSupervisorsView = () => {
    setCreatorView(false);
    setSupervisorView(true);
    setParticipantsView(false);
    setSponsorView(false);
  };
  const toggleParticipantsView = () => {
    setCreatorView(false);
    setSupervisorView(false);
    setParticipantsView(true);
    setSponsorView(false);
  };
  const toggleSponsorView = () => {
    setCreatorView(false);
    setSupervisorView(false);
    setParticipantsView(false);
    setSponsorView(true);
  };

  const returnStakeEventList = returnStakeEvents?.map((event) => {
    return {
      type: "stake returned",
      address: event.supervisor,
      amount: fromWad(event.amount),
      timestamp: event.timestamp,
      completingParticipant: event.completingParticipants,
      txHash: event.txHash,
    };
  });


  const sponsorList = sponsorEvents?.map((sponsor) => {
    return {
      type:"sponsored",
      address: sponsor.participant,
      amount: fromWad(sponsor.amount),
      txHash: sponsor.txHash,
      timestamp: sponsor.timestamp,
    };
  });

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

  // const activityList = [...sponsorList!, ...participantsList!, ...returnStakeEventList!];
  const activityList = sponsorList?.concat(participantsList!).concat(returnStakeEventList!);
  if(activityList){
    activityList.sort ((a, b) => {
      return b.timestamp - a.timestamp;
    });
  }
  // const activityList = [
  //   { type: "stake returned", address: "ethglobal.eth", amount: "5" },
  //   { type: "staked", address: "0x42424242424242", amount: "0.5" },
  //   { type: "sponsored", address: "0x111111111111", amount: "0.111" },
  //   { type: "staked", address: "lucyqiu.eth", amount: "0.5" },
  // ];


  const renderFn = (activity: any) => {
    switch (activity.type) {
      case "stake returned":
        return (
          <>
            <div className="flex">
              <div className="w-3/4">
                <p className="mx-4 py-5 font-bold font-mono text-[#3EA400]">
                  stake returned{" "}
                  <b className="text-black">{activity.address}</b>{" "}
                </p>
              </div>
              <div className="w-1/4 pt-5">
                <a href={`https://goerli.etherscan.io/tx/${activity.txHash}`} style={{ cursor: "pointer" }}>
                  <b className="text-[#CE8888] "> view txn</b>
                </a>
              </div>
            </div>
          </>
        );
      case "staked":
        return (
          <>
            <div className="flex">
              <div className="w-3/4">
                <p className="mx-4 py-5 font-bold font-mono text-[#FF8181]">
                  staked <b className="text-black">{activity.address}</b>
                </p>
              </div>
              <div className="w-1/4 pt-5">
                <a href={`https://goerli.etherscan.io/tx/${activity.txHash}`} style={{ cursor: "pointer" }}>
                  <b className="text-[#CE8888] "> view txn</b>
                </a>
              </div>
            </div>
          </>
        );
      case "sponsored":
        return (
          <>
            <div className="flex">
              <div className="w-3/4">
                <p className="mx-4 py-5 font-bold font-mono text-[#5D8FCA]">
                  sponsored{" "}
                  <b className="text-[#994B4B]">{activity.amount} ETH</b>{" "}
                  <b className="text-black">{activity.address}</b>
                </p>
              </div>
              <div className="w-1/4 pt-5">
                <a href={`https://goerli.etherscan.io/tx/${activity.txHash}`} style={{ cursor: "pointer" }}>
                  <b className="text-[#CE8888] "> view txn</b>
                </a>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#FDBBBB] mx-6 my-6 border border-2 rounded-3xl border-[#4A2222]">
      <div className="flex mx-24  mt-16">
        <img className=" w-1/4" src={imageUrl? imageUrl : 'https://s2.loli.net/2022/11/21/vlFEB4WmYHfDxj6.png'} />
        <div className="mx-10 font-mono text-[#4A2222] text-5xl font-bold">
          {name}
          <p className="mt-2 flex-row text-sm font-normal">
            Starts: <b>{startDate}</b> Ends:<b>{endDate}</b>
          </p>
          <p className="mt-2 text-[#994B4B] text-sm font-mono">{description}</p>
          <p className="mt-2 text-[#4A2222] text-sm font-mono font-normal">
            {" "}
            Inaction Guard:<b>{inactionGuard?.toString()}</b> Participants Share Unreturned
            Stake: <b>{shareUnreturnedStake?.toString()}</b>
          </p>
          <p className="mt-2 text-[#4A2222] text-sm font-mono font-normal">
            {" "}
            Unreturned Stake Beneficiaries:{" "}

            <b onClick={showModal} style={{cursor:"pointer"}}>view list</b>
            <Modal title="Unreturned Stake Beneficiaries" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              {unreturnedStakeBeneficiaries?.map((beneficiary) => (
                <p key={beneficiary}>{beneficiary}</p>
              ))}
          </Modal>
          </p>
        </div>
      </div>

      <div className="flex mx-32  mt-10">
        <p className="mr-4">
          <b className="text-3xl font-mono mr-2 ">
            {stakeAmount ? fromWad(stakeAmount) : ""} ETH
          </b>{" "}
          <b className="text-[#994B4B] font-mono">per stake</b>
        </p>
        <p className="mr-4">
          <b className="text-3xl font-mono mr-2 ">{totalCurrentStake} ETH</b>{" "}
          <b className="text-[#994B4B] font-mono">current total stake</b>
        </p>
        <p className="mr-4">
          <b className="text-3xl font-mono mr-2 ">{totalParticipants} People</b>
          <b className="text-[#994B4B] font-mono">have staked</b>
        </p>
      </div>

      <div className="flex mx-20 mt-10">
        <div className="w-1/4">
          <img
            style={{ cursor: "pointer" }}
            onClick={toggleCreatorView}
            className="my-4 px-6"
            src="https://s2.loli.net/2022/11/06/zPieVo4qsdLDmCQ.png"
          />
          <img
            style={{ cursor: "pointer" }}
            onClick={toggleSupervisorsView}
            className="my-4 px-6"
            src="https://s2.loli.net/2022/11/06/N7SQ8fq5usYkav6.png"
          />
          <img
            style={{ cursor: "pointer" }}
            onClick={toggleParticipantsView}
            className="my-4 px-6"
            src="https://s2.loli.net/2022/11/06/iMN3mgIuKyhLEr9.png"
          />
          <img
            style={{ cursor: "pointer" }}
            onClick={toggleSponsorView}
            className="my-4 px-6"
            src="https://s2.loli.net/2022/11/06/yd3JlOc8tnGWACH.png"
          />
        </div>
        <div className="w-3/4 my-4 border border-2 rounded-xl border-[#4A2222] bg-[#FAEEE1]">
          {creatorView && (
            <>
              <div className="mx-5 my-5">
                <>
                  <p className="font-bold font-mono">Activities</p>
                  {activityList && activityList.map((activity, idx) => (
                    <div
                      className="my-4 rounded-3xl h-16 bg-[#E9DDD1]"
                      key={idx}
                    >
                      {renderFn(activity)}
                    </div>
                  ))}
                </>
              </div>
            </>
          )}


          {supervisorView && <SupervisorSectionContent/>}


          {participantsView && <ParticipantSectionContent />}

          {sponsorView && <SponsorSectionContent />}
        </div>
      </div>
    </div>
  );
}
