import React from "react";
import moment from "moment/moment";
import { REQUISITION_STATUS } from "@/utils/constants";

export default function StatusCard({ events }) {

    if (!events) {
        return (
            <div className="bg-gray-800 text-gray-200 p-4 rounded shadow-md mt-4">
              <h2 className="text-xl font-semibold mb-4">Eventos</h2>
              <p>Nenhum evento registrado.</p>
            </div>
          );
    }


  const datetimeFormats = {
    date: "DD/MM/YYYY",
    time: "HH:mm",
  };
  const date = moment(status.timestamp).format(datetimeFormats.date);
  const time = moment(status.timestamp).format(datetimeFormats.time);

  return (
    <div className="bg-gray-800 text-gray-200 p-4 rounded shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-4">Eventos</h2>
      <p>Estado: {REQUISITION_STATUS[status.status]} - {status.message}</p>
      <p>Momento: às {time} de {date}</p>
      <p>Registrado por: {status.author.name}</p>
    </div>
  );
}
