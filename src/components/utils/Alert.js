export default function Alert({ message, type = "info", onClick }) {
  const types = {
    border: {
      info: "text-blue-800 border-t-4 border-blue-300 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800",
      danger:
        "text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800",
      success:
        "text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800",
      alert:
        "text-yellow-800 border-t-4 border-yellow-300 bg-yellow-50 dark:text-yellow-300 dark:bg-gray-800 dark:border-yellow-800",
      dark: "border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-600",
    },
    text: {
      info: "text-blue-800 border-t-4 border-blue-300 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800",
      danger:
        "text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800",
      success:
        "text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800",
      alert:
        "text-yellow-800 border-t-4 border-yellow-300 bg-yellow-50 dark:text-yellow-300 dark:bg-gray-800 dark:border-yellow-800",
      dark: "border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-600",
    },
    button: {
      info: "bg-blue-50 text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700",
      danger:
        "bg-red-50 text-red-500 focus:ring-red-400 hover:bg-red-200 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700",
      success:
        "bg-green-50 text-green-500 focus:ring-green-400 hover:bg-green-200 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700",
      alert:
        "bg-yellow-50 text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700",
      dark: "bg-gray-50 text-gray-500 focus:ring-gray-400 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
    },
  };

  return (
    <div
      id="alert-border-1"
      className={`fixed top-0 left-0 right-0 flex items-center p-4 mb-4 ${types.border[type]} z-50`}
      role="alert"
    >
      <svg
        className="flex-shrink-0 w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <div className={`ml-3 text-sm font-medium ${types.text[type]}`}>
        {message}
      </div>
      <button
        type="button"
        className={`ml-auto -mx-1.5 -my-1.5 p-1.5 inline-flex items-center justify-center h-8 w-8 rounded-lg focus:ring-2 ${types.button[type]}`}
        data-dismiss-target="#alert-border-1"
        onClick={onClick}
        aria-label="Close"
      >
        <span className="sr-only">Dispensar</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
}
