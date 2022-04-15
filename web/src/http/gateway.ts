import { client } from ".";
import { ENDPOINTS } from "./endpoints";

export interface GatewayCredentials {
  token: string;
  endpoint: string;
}

export const getGatewayCredentials = async () => {
  const resp = await client.post(ENDPOINTS.GATEWAY.GET_GATEWAY_CREDENTIALS);
  return resp.data as GatewayCredentials;
};
