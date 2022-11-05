// app main page
import React from "react";
import { useState } from "react";
export default function App() {
    const title='ETHSF'
    const startDate='2022-11-04'
    const endDate='2022-11-06'
    const description='ETH SF is a web3 hackathon that starts at 11/4/2022 and ends at 11/6/2022. We are awesome people and we give our participants their stake on time.'
    const inactionGuard="true";
    const shareUnreturnedStake="false";
    const stakeAmount="0.5"
    const totalCurrentStake="10"
    const totalParticipants="20"

    const [creatorView, setCreatorView] = useState(true);
    const [supervisorView, setSupervisorView] = useState(false);
    const [participantsView, setParticipantsView] = useState(false);
    const [sponsorView, setSponsorView] = useState(false);
    
    const activityList = [
        {type:"stake returned", address:"ethglobal.eth", amount:"5"},
        {type:"staked", address:"0x42424242424242" , amount:"0.5"},
        {type:"sponsored", address:"ethglobal.eth", amount:"0.111"},
        {type:"staked", address:"lucyqiu.eth", amount:"0.5"},
    ]

    const renderFn = (activity:any) => {
        switch (activity.type) {
            case "stake returned":
                return <p className="mx-4 py-5 font-bold font-mono text-[#3EA400]">stake returned {activity.address}</p>
            case "staked":
                return <p className="mx-4 py-5 font-bold font-mono text-[#FF8181]">staked</p>
            case "sponsored":
                return <p className="mx-4 py-5 font-bold font-mono text-[#5D8FCA]">sponsored</p>
            default:
                return null
        }
    }

  return (
    <>
      <div className="bg-[#FDBBBB] mx-6 my-6 border border-2 rounded-3xl border-[#4A2222]">
        <div className="flex mx-20  mt-16">
            <img className='h-44 w-44'src='https://s2.loli.net/2022/11/06/quhZY5Lje7gD2tk.png' />
            <p className='mx-10 font-mono text-[#4A2222] text-5xl font-bold'>{title}
                <p className="mt-2 flex-row text-sm font-normal">Starts: <b>{startDate}</b>  Ends:<b>{endDate}</b></p>
                <p className='mt-2 text-[#994B4B] text-sm font-mono'>{description}</p>
                <p className='mt-2 text-[#4A2222] text-sm font-mono font-normal'> Inaction Guard:<b>{inactionGuard}</b>  Participants Share Unreturned Stake: <b>{shareUnreturnedStake}</b></p>
                <p className='mt-2 text-[#4A2222] text-sm font-mono font-normal'> Unreturned Stake Beneficiaries: <a href=''> <b>view list</b></a></p>
            </p>
        </div>
       
        <div className="flex mx-20  mt-10">
            <p className="mr-4"><b className="text-3xl font-mono mr-2 ">{stakeAmount} ETH</b> <b className="text-[#994B4B] font-mono">per stake</b></p>
            <p className="mr-4"><b className="text-3xl font-mono mr-2 ">{totalCurrentStake} ETH</b> <b className="text-[#994B4B] font-mono">current total stake</b></p>
            <p className="mr-4"><b className="text-3xl font-mono mr-2 ">{totalParticipants} People</b><b className="text-[#994B4B] font-mono">have staked</b></p>
        </div>
        
        <div className="flex mx-20 mt-10">
            <div className="w-1/4">
                <img className="my-4 px-6" src='https://s2.loli.net/2022/11/06/zPieVo4qsdLDmCQ.png'/>
                <img className="my-4 px-6" src='https://s2.loli.net/2022/11/06/N7SQ8fq5usYkav6.png'/>
                <img className="my-4 px-6" src='https://s2.loli.net/2022/11/06/iMN3mgIuKyhLEr9.png'/>
                <img className="my-4 px-6" src='https://s2.loli.net/2022/11/06/yd3JlOc8tnGWACH.png'/>
            </div>

            <div className="w-3/4 my-4 border border-2 rounded-xl border-[#4A2222] bg-[#FAEEE1]">
                {creatorView &&
                <>
                    <div className="mx-5 my-5">
                        <>
                        <p className="font-bold font-mono">Activities</p>
                        {
                            activityList.map(activity => (
                                <div className="my-4 rounded-3xl h-16 bg-[#E9DDD1]">
                                    {renderFn(activity)}
                                </div>

                            ))
                        }
                        </>
                    </div>
                </>
                }
                
            </div>
        </div>

      </div>
    </>
  );
}
