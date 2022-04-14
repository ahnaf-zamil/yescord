import React from "react";
import Copyright from "../../components/Copyright";

const HomePage: React.FC = () => {
  return (
    <div className="flex h-screen flex-col container mx-auto justify-center items-center gap-8">
      <a
        href="https://github.com/ahnaf-zamil/yescord"
        rel="noreferrer"
        target="_blank"
        className="text-3xl absolute top-6 right-6 hover:text-4xl text-center"
      >
        <i className="fa-brands fa-github"></i>
      </a>
      <h1 className="text-6xl font-bold">Yescord</h1>
      <p className="text-gray-400 text-lg">
        A Discord clone because yes. Made with Python, TypeScript, Java
      </p>
      <div className="flex gap-6">
        <a
          href="/login"
          className="transition duration-300 hover:bg-blue-500 font-semibold shadow shadow-blue-500 rounded-md px-6 py-3 border border-blue-500"
        >
          Log In
        </a>
        <a
          href="/register"
          className="transition duration-300 hover:bg-blue-500 font-semibold shadow shadow-blue-500 rounded-md px-6 py-3 border border-blue-500"
        >
          Sign Up
        </a>
      </div>
      <Copyright />
    </div>
  );
};

export default HomePage;
