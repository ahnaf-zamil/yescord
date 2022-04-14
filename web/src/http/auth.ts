import { client } from ".";
import { API } from "../const";

interface RegisterUserProps {
  username: string;
  email: string;
  password: string;
}

export const registerUser = async (body: RegisterUserProps) => {
  const resp = await client.post(API.REST.REGISTER_USER, body);
  return resp.data;
};
