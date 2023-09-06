import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function AutocompleteInputField({
  label,
  value,
  onChange,
  url,
  placeholder,
  field = "name",
  showIdentifier = false,
  identifier = "id",
}) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const { authToken } = useAuth();

  const searchDelay = 200;

  useEffect(() => {
    let timeoutId;

    const fetchOptions = async () => {
      try {
        const response = await fetch(`${url}?search=${inputValue}`, {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        let results;

        if (data.hasOwnProperty("results")) {
          results = data.results;
        } else {
          results = data;
        }

        const newOptions = showIdentifier
          ? results.map((item) => `${item[field]} - ${item[identifier]}`)
          : results.map((item) => item[field]);

        setOptions(newOptions);
      } catch (error) {
        console.error("Error fetching autocomplete options:", error);
      }
    };

    clearTimeout(timeoutId);
    timeoutId = setTimeout(fetchOptions, searchDelay);

    return () => {
      clearTimeout(timeoutId); // Clear the timeout if component unmounts
    };
  }, [inputValue, authToken, url, field, showPk]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onChange(e);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium">{label}</label>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        className="mt-1 p-2 w-full border rounded-md text-gray-900"
        list={`${label}-options`}
        placeholder={placeholder}
      />
      <datalist id={`${label}-options`}>
        {options.map((option, index) => (
          <option key={index} value={option} />
        ))}
      </datalist>
    </div>
  );
}
