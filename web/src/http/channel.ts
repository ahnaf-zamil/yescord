import { client } from ".";
import { ENDPOINTS } from "./endpoints";

export const sendMessage = async (channelId: string, content: string) => {
  const resp = await client.post(ENDPOINTS.CHANNEL + `/${channelId}`, {
    content,
  });
  return resp.data;
};
