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
  const colorStyle = disabled ? `bg-${color}-500 hover:bg-${color}-800` : `bg-${color}-900`
  const style = `text-white font-bold ${size} rounded transition duration-200 ${properties} ${colorStyle}`
  return (
    <button
      type={type}
      className={style}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
