import { NextApiRequest, NextApiResponse } from "next";
import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

export interface PushNotificationApiRequestPayload {
  supervisorAddresses: string[];
}

interface PushNotificationApiRequest extends NextApiRequest {
  body: PushNotificationApiRequestPayload;
}

const handler = async (
  req: PushNotificationApiRequest,
  res: NextApiResponse
) => {
  const { supervisorAddresses } = req.body;
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
        title: `I've completed my goal!`,
        body: `Would you please return my PepperStake?`,
        cta: "",
        img: "",
      },
      recipients: formattedSupervisorAddresses,
      channel: `eip155:5:${channelAddress}`,
      env: "staging",
    });

    if (apiResponse?.status === 204) {
      return res.status(200).json({ success: true });
    } else {
      console.log("API repsonse: ", apiResponse);
      return res.status(500).json({ error: "Failed to send notification." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to send notification." });
  }
};

export default handler;
