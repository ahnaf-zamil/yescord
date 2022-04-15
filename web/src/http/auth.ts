import { client } from ".";
import { ENDPOINTS } from "./endpoints";

interface LoginUserProps {
  email: string;
  password: string;
}

interface RegisterUserProps extends LoginUserProps {
  username: string;
}

export const loginUser = async (body: LoginUserProps) => {
  const resp = await client.post(ENDPOINTS.AUTH.LOGIN_USER, body);
  return resp.data;
};

export const registerUser = async (body: RegisterUserProps) => {
  const resp = await client.post(ENDPOINTS.AUTH.REGISTER_USER, body);
  return resp.data;
};

export const fetchCurrentUser = async () => {
  const resp = await client.get(ENDPOINTS.AUTH.CURRENT_USER);
  return resp.data;
};
