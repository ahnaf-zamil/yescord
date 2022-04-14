import React, { useRef, useState } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import FormInput from "../components/FormInput";
import handleFormSubmit from "./handle";

const RegisterPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<LoadingBarRef>(null);

  return (
    <main className="h-screen w-full bg-[#060c23] flex items-center justify-center flex-col gap-8">
      <LoadingBar color="#f11946" ref={ref} />
      {error && (
        <div className="container md:w-7/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12 bg-red-500 text-center py-4 rounded-md text-lg">
          An error occurred: {error}
        </div>
      )}
      <form
        onSubmit={(e) => {
          ref.current?.staticStart(10);
          handleFormSubmit(e, setError);
          ref.current?.complete();
        }}
        className="container md:w-7/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12 bg-[#1e2338] py-10 px-14 rounded-md shadow-4xl flex flex-col text-left"
      >
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-2xl font-semibold">Sign Up</h1>
          <small className="text-lg text-gray-400">
            Create an account to use Yescord
          </small>
        </div>
        <div className="flex flex-col gap-4">
          <FormInput
            name="username"
            icon="fa-solid fa-user"
            type="text"
            placeholder="Username"
            minLength={3}
            maxLength={32}
          />
          <FormInput
            name="email"
            icon="fa-solid fa-envelope-open"
            type="email"
            placeholder="Email"
          />
          <FormInput
            name="password"
            icon="fa-solid fa-key"
            type="password"
            placeholder="Password"
            minLength={8}
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 rounded-md mt-6 py-2">
          Submit
        </button>
      </form>
      <small className="text-lg text-gray-400">
        Already have an account?{" "}
        <a className="text-blue-400 hover:text-blue-500 cursor-pointer">
          Log In
        </a>
      </small>
      <p className="text-gray-600 text-sm absolute bottom-2 text-center">
        Copyright &copy; K.M Ahnaf Zamil {new Date().getFullYear()} | All Rights
        Reserved
      </p>
    </main>
  );
};

export default RegisterPage;
