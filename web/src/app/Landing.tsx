import React, { useEffect, useState } from "react";
import { fetchCurrentUser } from "../http/auth";
import HomePage from "../pages/home";
import AppView from "./views";

const LandingPage: React.FC = () => {
  const [showApp, setShowApp] = useState<boolean | null>(null);

  useEffect(() => {
    fetchCurrentUser()
      .then((user) => {
        console.log(user);
        setShowApp(true);
      })
      .catch(() => setShowApp(false));
  }, []);

  if (showApp) {
    return <AppView />;
  } else if (showApp === false) {
    return <HomePage />;
  }

  return <div></div>;
};

export default LandingPage;
