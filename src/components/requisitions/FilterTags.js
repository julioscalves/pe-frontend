import React, { useState, useEffect } from "react";
import { ROOT_URL, TAGS_PATH } from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext";

export default function FilterTags({ setVisualizationData, data }) {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const { authToken } = useAuth();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(ROOT_URL + TAGS_PATH, {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch options: ${response.status}`);
        }
        const optionsData = await response.json();
        setOptions(optionsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOptions();
  }, []);

  const handleOptionChange = (optionId) => {
    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
    } else {
      setSelectedOptions([...selectedOptions, optionId]);
    }
  };

  useEffect(() => {
    const filtered = data.filter((item) =>
      selectedOptions.every((optionId) =>
        item.tags.some((tag) => tag.id === optionId)
      )
    );

    setVisualizationData([...filtered]);
  }, [selectedOptions]);

  return (
    <div className="p-4">
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.id}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedOptions.includes(option.id)}
              onChange={() => handleOptionChange(option.id)}
              className="form-checkbox h-4 w-4 text-indigo-600"
            />
            <span className={`text-${option.color}-500 font-semibold`}>
              {option.name}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
