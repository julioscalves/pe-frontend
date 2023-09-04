export default function Pagination({ previous, next, handlePreviousPage, handleNextPage }) {
  const style = {
    true: "text-gray-600 bg-gray-900 border-gray-700",
    false:
      "text-gray-500 bg-white hover:bg-gray-100 border-gray-300 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
  };

  const previousStyle = style[previous === null];
  const nextStyle = style[next === null];

  return (
    <div className="flex">
      <button
        href="#"
        className={`flex items-center justify-center px-4 h-10 mr-3 text-base font-medium border rounded-lg ${previousStyle}`}
        disabled={previous === null}
        onClick={handlePreviousPage}
      >
        <svg
          className="w-3.5 h-3.5 mr-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 5H1m0 0 4 4M1 5l4-4"
          />
        </svg>
        Anterior
      </button>
      <button
        href="#"
        className={`flex items-center justify-center px-4 h-10 mr-3 text-base font-medium ${nextStyle} border rounded-lg `}
        disabled={next === null}
        onClick={handleNextPage}
      >
        Próxima
        <svg
          className="w-3.5 h-3.5 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </div>
  );
}
