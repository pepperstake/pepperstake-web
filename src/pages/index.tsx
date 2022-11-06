import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Link from "next/link";
const Home: NextPage = () => {

  const totalProjects=947;
  const totalMoney=50283;
  const totalParticipants=54998;
  return (
    <div className="flex">
      <div className=" absolute w-3/4">

      </div>
      <div className="text-center" > 
        <div className=" absolute right-[37rem] top-[23rem]">
            <p className="text-4xl font-bold text-[#DF0A0A]">{totalProjects} </p>
            <p className="font-mono text-[#994B4B] text-sm font-bold ">Projects on PepperStake</p>
        </div>
        <div className=" absolute right-[26rem] top-[23rem]">
            <p className="text-4xl font-bold text-[#FEC90D]">{totalMoney} </p> 
            <p className="font-mono text-[#994B4B] text-sm font-bold ">Total ETH Staked</p>
        </div>
        <div className=" absolute right-[14rem] top-[23rem]">
            <p className="text-4xl font-bold text-[#3EA400]">{totalParticipants}</p> 
            <p className="font-mono text-[#994B4B] text-sm font-bold ">Total Participants </p>
        </div>
      </div>
      <div className=" absolute right-[38rem] top-[36rem]">
      <Link href={"/projects/create"}>
          <a style={{ cursor: "pointer" }}>
            <img
              className="pl-4 h-14"
              src="https://s2.loli.net/2022/11/06/ABJ1q8CbnK4TEdG.png"
            />
          </a>
        </Link>
      </div>
      <div className=" absolute right-[26rem] top-[36rem]">
      <Link href={"/projects"}>
          <a style={{ cursor: "pointer" }}>
            <img
              className="pl-4 h-14"
              src="https://s2.loli.net/2022/11/06/UluWRnCcYrgENO1.png"
            />
          </a>
        </Link>
      </div>
      

      <img src="https://s2.loli.net/2022/11/06/INauPdXBgLEJ1iw.png" />

    </div>
  );
};

export default Home;
