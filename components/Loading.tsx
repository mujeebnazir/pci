import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center mt-6">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-black dark:border-white"></div>
    </div>
  );
};

export default Loading;
