import React from "react";

export default function Button({
  type,
  children,
  onClick,
  properties = "",
  color = "green",
  disabled = false,
  size = "px-5 py-2.5 text-sm",
}) {
  return (
    <button
      type={type}
      className={`text-white font-bold ${size} rounded bg-${color}-500 transition duration-200 hover:bg-${color}-800 ${properties}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
