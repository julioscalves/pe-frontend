import React, { useState } from "react";

export default function DateFilter({ setVisualizationData, data }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilter = () => {
    const startTimestamp = Date.parse(startDate);
    const endTimestamp = Date.parse(endDate);

    const filteredData = data.filter((item) => {
      const itemTimestamp = Date.parse(item.date);

      if (startDate && endDate) {
        return itemTimestamp >= startTimestamp && itemTimestamp <= endTimestamp;
      } else if (startDate) {
        return itemTimestamp >= startTimestamp;
      } else if (endDate) {
        return itemTimestamp <= endTimestamp;
      } else {
        return true;
      }
    });

    setVisualizationData(filteredData);
  };

  console.log(data);

  return (
    <div className="space-x-4">
      <div className="grid grid-cols-1 gap-1">
        <label className="mt-3">Data inicial</label>
        <input
          type="date"
          className="border rounded-md text-gray-800"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label className="mt-3">Data final</label>
        <input
          type="date"
          className="border rounded-md text-gray-800 mb-4"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleFilter}
        >
          Filtrar
        </button>
      </div>
    </div>
  );
}
