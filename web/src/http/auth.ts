import { client } from ".";
import { API } from "../const";

interface LoginUserProps {
  email: string;
  password: string;
}

interface RegisterUserProps extends LoginUserProps {
  username: string;
}

export const loginUser = async (body: LoginUserProps) => {
  const resp = await client.post(API.REST.LOGIN_USER, body);
  return resp.data;
};

export const registerUser = async (body: RegisterUserProps) => {
  const resp = await client.post(API.REST.REGISTER_USER, body);
  return resp.data;
};

export const fetchCurrentUser = async () => {
  const resp = await client.get(API.REST.CURRENT_USER);
  return resp.data;
};
