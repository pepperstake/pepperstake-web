import { ProjectContext } from "contexts/ProjectContext";
import { useStake } from "hooks/contract/useStake";
import { useIsParticipant } from "hooks/graph/useIsParticipant";
import React, { useContext } from "react";
import { sendPingSponsorPushNotification } from "utils/push";
import { useAccount } from "wagmi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const IsParticipantContent = () => {
  const daysRemaining = 2;
  const { address } = useAccount();
  const { supervisors, address: pepperstakeAddress } =
    useContext(ProjectContext);

    const notifySupervisor = () => toast.info("Notifying Supervisor(s) 😉", {
      position: "bottom-right",
      theme: "light"
    });

  const handlePingSponsor = async () => {
    notifySupervisor();
    if (!supervisors || !address || !pepperstakeAddress) {
      return;
    }
    await sendPingSponsorPushNotification(
      supervisors,
      address,
      pepperstakeAddress
    );
  };

  return (
    <>
    <div className="flex">
      <img
        className="mx-10 my-10 w-48"
        src="https://s2.loli.net/2022/11/06/HdJQpCD4hbLyFtm.png"
      />
      <div className=" mx-5 mt-20">
        <p className=" font-mono font-bold text-black">
          YOU HAVE STAKED FOR THIS PROJECT
          <a style={{ cursor: "pointer" }} target="_blank" href="">
            <b className="text-[#CE8888]"> view txn</b>
          </a>
        </p>
        <p className=" mt-3 font-mono font-bold text-black">
          RETURN WINDOW IN <b className="font-bold text-5xl">{daysRemaining}</b>{" "}
          DAYS
        </p>
        <div className="flex">
        <p className=" mt-8 font-mono font-bold text-black">
          COMPLETED YOUR TASK? 
        </p>
        <a style={{ cursor: "pointer" }}>
        <img onClick={handlePingSponsor} className="h-10 mt-6 ml-4" src="https://s2.loli.net/2022/11/06/BGr5UDPYn7fEbtA.png"></img>
        </a>
        </div>
        {/* <button onClick={handlePingSponsor}>Ping your Sponsors</button> */}
      </div>
      <ToastContainer className="toast-container"  pauseOnFocusLoss={false}/>

    </div>
    </>
  );
};

const IsEligableParticipantContent = () => {
  const { write } = useStake();
  const handleStake = () => {
    write?.();
  };

  return (
    <div className="flex">
      <img
        className="mx-10 my-10 w-48"
        src="https://s2.loli.net/2022/11/06/nGhgd1THQJ6KAFD.png"
      />
      <div className=" mx-5 mt-20">
        <p className=" font-mono font-bold text-black">
          YOU HAVE NOT STAKE FOR THIS PROJECT YET
        </p>
        <div onClick={handleStake}>
          <img
            style={{ cursor: "pointer" }}
            className="h-10 mt-4 mx-20"
            src="https://s2.loli.net/2022/11/06/vCBINbpy5QVkg4i.png"
          />
        </div>
      </div>

    </div>
  );
};

const ParticipantSectionContent = () => {
  const isParticipant = useIsParticipant();
  return (
    <>
      {isParticipant ? (
        <IsParticipantContent />
      ) : (
        <IsEligableParticipantContent />
      )}
    </>
  );
};

export default ParticipantSectionContent;
