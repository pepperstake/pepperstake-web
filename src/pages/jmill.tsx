// app main page
import { contracts } from "constants/contracts";
import { parseEther } from "ethers/lib/utils";
import React from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { DeployPepperStakeData } from "models/contractData";
import { useDeployPepperStake } from "hooks/contract/deployer/useDeployPepperStake";
import { useStake } from "hooks/contract/useStake";

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
    "0x087C31ae9235D6eb19952Ff4A1035De17d7Dac87";

  const { write: deployPepperStake } = useDeployPepperStake(deployData);
  const { write: stake } = useStake(pepperStakeContractAddress, "0.0001");

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
    </>
  );
};

export default JmillPage;
