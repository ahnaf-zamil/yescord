import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./app/Landing";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";

interface IRoute {
  path: string;
  component: React.ReactNode;
}

const mappings: Array<IRoute> = [
  { path: "/", component: <LandingPage /> },
  { path: "/register", component: <RegisterPage /> },
  { path: "/login", component: <LoginPage /> },
];

const Routing: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {mappings.map((mapping: IRoute) => {
          return <Route path={mapping.path} element={mapping.component} />;
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
