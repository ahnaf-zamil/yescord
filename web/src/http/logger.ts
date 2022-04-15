import { webLogger } from "../utils";

export const httpLogger = (value: string) => {
  webLogger(`%cREST -> %c${value}`, "lightgreen");
};
