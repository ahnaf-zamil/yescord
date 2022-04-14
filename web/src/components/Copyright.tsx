import React from "react";

const Copyright: React.FC = () => {
  return (
    <p className="text-gray-600 text-sm absolute bottom-3 text-center">
      Copyright &copy; K.M Ahnaf Zamil {new Date().getFullYear()} | All Rights
      Reserved
    </p>
  );
};

export default Copyright;
