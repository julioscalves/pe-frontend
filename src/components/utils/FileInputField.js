import React from "react";

export default function FileInputField({ label, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium">{label}</label>
      <input
        type="file"
        onChange={onChange}
        className="mt-1 p-2 w-full border rounded-md text-gray-900"
      />
    </div>
  );
}