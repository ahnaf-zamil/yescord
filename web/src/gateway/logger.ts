import { webLogger } from "../utils";

export const gatewayLogger = (value: string) => {
  webLogger(`%cGateway -> %c${value}`, "aqua");
};
