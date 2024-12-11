import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {/* Loader Spinner */}
      <div className="border-t-4 border-gray-950 border-solid w-16 h-16 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
