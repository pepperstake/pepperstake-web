// app main page
import { contracts } from "constants/contracts";
import { parseEther } from "ethers/lib/utils";
import React from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { DeployPepperStakeData } from "models/contractData";

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

  const { pepperStakeDeployer } = contracts.goerli;
  const { config } = usePrepareContractWrite({
    addressOrName: pepperStakeDeployer.address,
    contractInterface: pepperStakeDeployer.abi,
    functionName: "deployPepperStake",
    args: [...Object.values(deployData)],
  });
  console.log(pepperStakeDeployer.abi);
  const { data, write } = useContractWrite(config);

  const handleDeployButtonClick = () => {
    write?.();
  };

  return (
    <>
      <div className="bg-[#FDBBBB] mx-6 my-6 border border-2 rounded-3xl border-[#4A2222]">
        <button onClick={handleDeployButtonClick}>Deploy PepperStake</button>
      </div>
    </>
  );
};

export default JmillPage;
