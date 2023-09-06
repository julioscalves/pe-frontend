export default function Button({
  children,
  onClick,
  properties = "",
  color = "green",
  disabled = false,
}) {
  return (
    <button
      type="button"
      className={`bg-${color}-500 hover:bg-${color}-800 transition duration-200 text-white rounded focus:outline-none focus:ring-4 focus:ring-blue-300 font-bold rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 ${properties}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
