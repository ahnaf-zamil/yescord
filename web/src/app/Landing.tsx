import React, { useEffect, useState } from "react";
import { fetchCurrentUser } from "../http/auth";
import { httpLogger } from "../http/logger";
import HomePage from "../pages/home";
import { useAuthStore } from "../state/auth";
import AppView from "./views";

const LandingPage: React.FC = () => {
  const authState = useAuthStore();
  const [showApp, setShowApp] = useState<boolean | null>(null);

  useEffect(() => {
    fetchCurrentUser()
      .then((user) => {
        httpLogger(`Logged in as ${user.username}#${user.discriminator}`);
        authState.setUser(user);
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
