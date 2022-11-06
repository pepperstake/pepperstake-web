import { NextApiRequest, NextApiResponse } from "next";
import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

export interface PingSponsorApiRequestPayload {
  supervisorAddresses: string[];
  userAddress: string;
  pepperStakeAddress: string;
}

interface PushNotificationApiRequest extends NextApiRequest {
  body: PingSponsorApiRequestPayload;
}

const handler = async (
  req: PushNotificationApiRequest,
  res: NextApiResponse
) => {
  const { supervisorAddresses, userAddress, pepperStakeAddress } = req.body;
  const signerKey = process.env.PUSH_SENDER_DELEGATE_KEY;
  const channelAddress = process.env.PUSH_CHANNEL_ADDRESS;
  if (!signerKey) {
    return res.status(500).json({ error: "Not configured." });
  }
  const signer = new ethers.Wallet(signerKey);
  const formattedSupervisorAddresses = supervisorAddresses.map((address) => {
    return `eip155:5:${address}`;
  });

  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: `I've completed my goal!`,
        body: `Would you please return my PepperStake?`,
      },
      payload: {
        title: `Hey, I've completed my goal!`,
        body: `Hey supervisors, it's ${userAddress} here. I've completed my goal and would like to get my stake back. You can help me out by clicking this notification then clicking supervisor view.`,
        cta: `/projects/${pepperStakeAddress}`,
        img: "",
      },
      recipients: formattedSupervisorAddresses,
      channel: `eip155:5:${channelAddress}`,
      env: "staging",
    });

    if (apiResponse?.status === 204) {
      return res.status(200).json({ success: true });
    } else {
      console.error(apiResponse);
      return res.status(500).json({ error: "Failed to send notification." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to send notification." });
  }
};

export default handler;
