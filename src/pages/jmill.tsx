// app main page
import { parseEther } from "ethers/lib/utils";
import React from "react";
import { DeployPepperStakeData } from "models/contractData";
import { useDeployPepperStake } from "hooks/contract/deployer/useDeployPepperStake";
import { useStake } from "hooks/contract/useStake";
import { useSponsor } from "hooks/contract/useSponsor";
import { useReturnStake } from "hooks/contract/useReturnStake";
import { usePostReturnWindowDistribution } from "hooks/contract/usePostReturnWindowDistribution";
import { PushNotificationApiRequestPayload } from "pages/api/pushNotification";
import axios from "axios";

const JmillPage = () => {
  const deployData: DeployPepperStakeData = {
    supervisors: ["0xCd2c0B1aD8c42e7b2c66d59B13935Bbd196b53ec"],
    stakeAmount: parseEther("0.0001"),
    unreturnedStakeBeneficiaries: [
      "0xCd2c0B1aD8c42e7b2c66d59B13935Bbd196b53ec",
    ],
    returnWindowDays: 14,
    maxParticipants: 10,
    shouldParticipantsShareUnreturnedStake: false,
    shouldUseSupervisorInactionGuard: true,
    metadataURI: "",
  };
  const pepperStakeContractAddress =
    "0xE3a7e8FFE50807FE9f722C0AF32dcfbd8A3B8585";

  const { write: deployPepperStake } = useDeployPepperStake(deployData);
  const { write: stake } = useStake(pepperStakeContractAddress, "0.0001");
  const { write: sponsor } = useSponsor(pepperStakeContractAddress, "0.0001");
  const { write: returnStake } = useReturnStake(pepperStakeContractAddress, [
    "0xCd2c0B1aD8c42e7b2c66d59B13935Bbd196b53ec",
  ]);
  const { write: postReturnWindowDistribution } =
    usePostReturnWindowDistribution(pepperStakeContractAddress);

  const sendPushNotification = async () => {
    const data: PushNotificationApiRequestPayload = {
      supervisorAddresses: ["0xCd2c0B1aD8c42e7b2c66d59B13935Bbd196b53ec"],
    };
    try {
      await axios.post("/api/pushNotification", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-[#FDBBBB] mx-6 my-6 border border-2 rounded-3xl border-[#4A2222]">
        <button onClick={() => deployPepperStake?.()}>
          Deploy PepperStake
        </button>
      </div>
      <div className="bg-[#FDBBBB] mx-6 my-6 border border-2 rounded-3xl border-[#4A2222]">
        <button onClick={() => stake?.()}>Stake</button>
      </div>
      <div className="bg-[#FDBBBB] mx-6 my-6 border border-2 rounded-3xl border-[#4A2222]">
        <button onClick={() => sponsor?.()}>Sponsor</button>
      </div>
      <div className="bg-[#FDBBBB] mx-6 my-6 border border-2 rounded-3xl border-[#4A2222]">
        <button onClick={() => returnStake?.()}>Return Stake</button>
      </div>
      <div className="bg-[#FDBBBB] mx-6 my-6 border border-2 rounded-3xl border-[#4A2222]">
        <button onClick={() => postReturnWindowDistribution?.()}>
          Post Return Window Distribution
        </button>
      </div>
      <div className="bg-[#FDBBBB] mx-6 my-6 border border-2 rounded-3xl border-[#4A2222]">
        <button onClick={sendPushNotification}>Notify Supervisors</button>
      </div>
    </>
  );
};

export default JmillPage;
