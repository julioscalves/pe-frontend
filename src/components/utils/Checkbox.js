export default function Checkbox({ label, text, checked, onChange }) {
  return (
    <div className="flex">
      <div className="flex items-center h-5">
        <input
          id={label}
          aria-describedby="helper-checkbox-text"
          type="checkbox"
          checked={checked}
          onChange={() => onChange(!checked)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      <div className="ml-2 text-sm">
        <label
          htmlFor="helper-checkbox"
          className="font-medium text-gray-200 dark:text-gray-300"
        >
          {label}
        </label>
        <p
          id="helper-checkbox-text"
          className="text-xs font-normal text-gray-500 dark:text-gray-300"
        >
          {text}
        </p>
      </div>
    </div>
  );
}
