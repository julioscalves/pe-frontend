import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-black opacity-50 flex justify-center items-center z-40">
      <div className="animate-bounce">
        <div className="rounded-full bg-blue-600 w-12 h-12"></div>
      </div>
    </div>
  );
};
