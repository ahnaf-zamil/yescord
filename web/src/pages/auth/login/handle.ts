import { AxiosError } from "axios";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { loginUser } from "../../../http/auth";

const handleFormSubmit = async (
  e: FormEvent<HTMLFormElement>,
  setError: Dispatch<SetStateAction<string | null>>
) => {
  e.preventDefault();
  setError(null);

  const targetForm = e.target as typeof e.target & {
    email: { value: string };
    password: { value: string };
  };

  const email = targetForm.email.value;
  const password = targetForm.password.value;

  try {
    await loginUser({ email, password });
    window.location.href = "/";
  } catch (e) {
    setError((e as AxiosError).response?.data.detail);
  }
};

export default handleFormSubmit;
