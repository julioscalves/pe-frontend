import React from "react";

export default function InputField({ label, value, onChange, required=false, placeholder, readonly=false, type="text", properties="" }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`mt-1 p-2 w-full border rounded-md text-gray-900 ${properties} ${readonly ? "bg-gray-300" : ""}`}
        placeholder={placeholder}
        required={required}
        readOnly={readonly}
      />
    </div>
  );
}
