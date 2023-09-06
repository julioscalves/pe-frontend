import React from "react";

export default function SubmitButton({
  type,
  children,
  disabled,
  onClick,
  color = "blue",
}) {
  const disabledClass = disabled
    ? "bg-gray-900"
    : `bg-${color}-500 hover:bg-${color}-700`;

  return (
    <button
      type={type}
      className={`text-white font-bold py-2 px-4 rounded w-full mt-5 ${disabledClass} w-full`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
