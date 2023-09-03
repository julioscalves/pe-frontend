import React from "react";
import moment from "moment/moment";
import { REQUISITION_STATUS } from "@/utils/constants";
import { Button } from "flowbite-react";

export default function StatusCard({ status }) {
  const datetimeFormats = {
    date: "DD/MM/YYYY",
    time: "HH:mm",
  };

  if (!status || status.length < 1) {
    return (
      <div className="bg-gray-800 text-gray-200 p-4 rounded shadow-md mt-4">
        <h2 className="text-xl font-semibold mb-4">Movimentação</h2>
        <p>Nenhuma informação registrada.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 text-gray-200 p-4 rounded shadow-md lg:mt-4">
      <h2 className="text-xl font-semibold mb-4">Movimentação</h2>
      {status.map((event) => (
        <div className="bg-gray-700 px-5 py-5 my-5 rounded shadow-md" key={event.key}>
          <p>
            {REQUISITION_STATUS[event.status]} às {moment(event.timestamp).format(datetimeFormats.time)}{" "}
            de {moment(event.timestamp).format(datetimeFormats.date)}
          </p>
            { event.message.length > 1 ? <p>{event.message}</p> : <></>}
        </div>
      ))}
    </div>
  );
}
