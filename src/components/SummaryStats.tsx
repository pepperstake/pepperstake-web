import axios from "axios";
import { ProtocolStats } from "pages/api/protocol-summary";
import React, { useEffect, useState } from "react";

const SummaryStats = () => {
  const [protocolStats, setProtocolStats] = useState<ProtocolStats>({
    totalProjects: 0,
    totalVolume: 0,
    uniqueUsers: 0,
  });

  useEffect(() => {
    const fetchSummaryStats = async () => {
      const res = await axios.get("/api/protocol-summary");
      setProtocolStats(res.data);
    };
    fetchSummaryStats();
  }, []);

  return (
    <div className="text-center">
      <div className=" absolute right-[37rem] top-[23rem]">
        <p className="text-4xl font-bold text-[#DF0A0A]">
          {protocolStats.totalProjects}{" "}
        </p>
        <p className="font-mono text-[#994B4B] text-sm font-bold ">
          Projects on PepperStake
        </p>
      </div>
      <div className=" absolute right-[26rem] top-[23rem]">
        <p className="text-4xl font-bold text-[#FEC90D]">
          {protocolStats.totalVolume}{" "}
        </p>
        <p className="font-mono text-[#994B4B] text-sm font-bold ">
          Total ETH Staked
        </p>
      </div>
      <div className=" absolute right-[14rem] top-[23rem]">
        <p className="text-4xl font-bold text-[#3EA400]">
          {protocolStats.uniqueUsers}
        </p>
        <p className="font-mono text-[#994B4B] text-sm font-bold ">
          Unique Participants{" "}
        </p>
      </div>
    </div>
  );
};

export default SummaryStats;
