// components/Loading.js
import React from "react";

const Loading = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-opacity-75">
      <div className="w-10 h-10 border-solid border-blue-500 border-t-4 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
