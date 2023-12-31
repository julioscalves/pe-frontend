import React, { useState, useEffect } from "react";
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
  filterOut = false,
  filterOutBy = null,
  filterIn = false,
  filterInBy = null,
}) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const { authToken } = useAuth();

  const searchDelay = 200;

  useEffect(() => {
    let timeoutId;

    const fetchOptions = async () => {
      try {
        const response = await fetch(`${url}?search=${inputValue}&ordering=name`, {
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

        const getProperty = (object, property) => {
          const keys = Array.isArray(property) ? property : property.split('.');
          return keys.reduce((value, key) => (value && typeof value === 'object') ? value[key] : undefined, object);
        };

        if (results.hasOwnProperty("user")) {
          results = results.filter((item) => !item.user.is_staff);
        }

        if (filterOut) {
          results = results.filter((item) => !item[filterOutBy])
        }

        if (filterIn) {
          results = results.filter(item => item[filterInBy])
        }

        const newOptions = showIdentifier
          ? results.map((item) => `${item[field]} - ${getProperty(item, identifier)}`)
          : results.map((item) => item[field]);

        setOptions(newOptions);
      } catch (error) {
        console.error("Error fetching autocomplete options:", error);
      }
    };

    clearTimeout(timeoutId);
    timeoutId = setTimeout(fetchOptions, searchDelay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue, authToken, url, field, showIdentifier]);

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
