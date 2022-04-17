import React from "react";
import FriendsBar from "../../components/FriendsBar";

const Friends: React.FC = () => {
  /* Default view when someone starts up YesCord */
  return (
    <div id="friends-view" className="w-full">
      <FriendsBar />
      <h1>Friends??? You HAVE no friends</h1>
    </div>
  );
};

export default Friends;
