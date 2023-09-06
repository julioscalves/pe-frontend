import { useState, useEffect } from "react";
import { ROOT_URL, TAGS_PATH } from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext";

export default function TagInputField({ tags, setTags }) {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { authToken } = useAuth();

  useEffect(() => {
    const fetchBadgeOptions = async () => {
      try {
        const response = await fetch(ROOT_URL + TAGS_PATH, {
          method: "GET",
          headers: {
            Authorization: `Token ${authToken}`,
          },
        });
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error("Error fetching badge options:", error);
      }
    };

    fetchBadgeOptions();
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleTagRemove = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Tags</label>
      <input
        type="text"
        className="mt-1 p-2 w-full border rounded-md text-gray-900"
        placeholder="Adicionar tag..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <div className="mt-2">
        {options.map((option) => (
          <label key={option.id} className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              className="form-checkbox text-blue-500"
              value={option.id}
              onChange={(e) => {
                if (e.target.checked) {
                  setTags([...tags, option.name]);
                } else {
                  const updatedTags = tags.filter((t) => t !== option.name);
                  setTags(updatedTags);
                }
              }}
            />
            <span className="ml-2">{option.name}</span>
          </label>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        {tags.map((tag) => (
          <span key={tag} className="px-2 bg-blue-500 text-white rounded-full">
            {tag}
            <button
              type="button"
              className="ml-1 focus:outline-none"
              onClick={() => handleTagRemove(tag)}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
