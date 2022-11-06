import { NextApiRequest, NextApiResponse } from "next";
import { DuneClient, QueryParameter } from "@cowprotocol/ts-dune-client";

const TOTAL_PROJECTS_QUERY_ID = 1532947;
const TOTAL_VOLUME_QUERY_ID = 1532951;
const UNIQUE_USERS_QUERY_ID = 1532957;

export interface ProtocolStats {
  totalProjects: number;
  totalVolume: number;
  uniqueUsers: number;
}

const executeTotalProjectsQuery = async (client: DuneClient) => {
  try {
    const executionResult = await client.refresh(TOTAL_PROJECTS_QUERY_ID);
    return executionResult.result?.rows[0].Projects;
  } catch (err) {
    return 0;
  }
};

const executeTotalVolumeQuery = async (client: DuneClient) => {
  try {
    const params = [QueryParameter.text("period", "week")];
    const executionResult = await client.refresh(TOTAL_VOLUME_QUERY_ID, params);
    return Math.floor(
      parseFloat(executionResult.result?.rows[0].CumuPayment || "0")
    );
  } catch (err) {
    return 0;
  }
};

const executeUniqueUsersQuery = async (client: DuneClient) => {
  try {
    const executionResult = await client.refresh(UNIQUE_USERS_QUERY_ID);
    return executionResult.result?.rows[0].count;
  } catch (err) {
    return 0;
  }
};

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  const DUNE_API_KEY = process.env.DUNE_API_KEY;
  if (!DUNE_API_KEY) {
    return res.status(500).json({ error: "Not configured." });
  }
  const client = new DuneClient(DUNE_API_KEY);
  const promises = [
    executeTotalProjectsQuery(client),
    executeTotalVolumeQuery(client),
    executeUniqueUsersQuery(client),
  ];
  try {
    const [totalProjects, totalVolume, uniqueUsers] = await Promise.all(
      promises
    );
    const stats: ProtocolStats = {
      totalProjects: parseInt(totalProjects!.toString()),
      totalVolume: parseInt(totalVolume!.toString()),
      uniqueUsers: parseInt(uniqueUsers!.toString()),
    };
    return res.status(200).json(stats);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch stats." });
  }
};

export default handler;
