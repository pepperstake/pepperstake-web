import * as PushAPI from "@pushprotocol/restapi";
import axios from "axios";
import { PingSponsorApiRequestPayload } from "pages/api/ping-sponsor";

export const sendPingSponsorPushNotification = async (
  supervisorAddresses: string[],
  userAddress: string,
  pepperStakeAddress: string
) => {
  const data: PingSponsorApiRequestPayload = {
    supervisorAddresses,
    userAddress,
    pepperStakeAddress,
  };
  try {
    console.log('here')
    await axios.post("/api/ping-sponsor", data);
  } catch (error) {
    console.error(error);
  }
};

export const checkNotifications = async (address: string) => {
  const notifications = await PushAPI.user.getFeeds({
    user: `eip155:5:${address}`,
    env: "staging",
  });
  return notifications;
};
