import React from "react";
import moment from "moment/moment";
import { REQUISITION_STATUS } from "@/utils/constants";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ListItem({ item }) {
  const datetimeFormats = {
    date: "DD/MM/YYYY",
    time: "HH:mm",
  };
  const { pathname } = useRouter()

  const date = moment(item.timestamp).format(datetimeFormats.date);
  const time = moment(item.timestamp).format(datetimeFormats.time);
  const deliver = moment(item.date).format(datetimeFormats.date);
  const statusDate = moment(item.status.timestamp).format(datetimeFormats.date);
  const statusTime = moment(item.status.timestamp).format(datetimeFormats.time);

  const timestamp = `${date} às ${time}`;

  return (
    <Link href={pathname + '/' + item.protocol}>
      <div className="transition duration-500 hover:scale-105 hover:bg-blue-700 bg-gray-800 p-4 rounded shadow-md hover:shadow-lg transition duration-300 mb-4 w-full px-5 py-5">
        <h3 className="text-xl font-semibold mb-2 text-gray-100 text-center">
          Solicitação {item.protocol} por {item.author.name}
        </h3>
        <p className="text-gray-400">
          <strong>Quantidade:</strong> {item.quantity} {item.gender}
        </p>
        <p className="text-gray-400">
          <strong>Data de entrega:</strong> {deliver}
        </p>
        <p className="text-gray-400">
          <strong>Momento do pedido:</strong> {timestamp}
        </p>
        {}
        <p className="text-gray-400">
          { item.status.length === 0 ? "Nenhuma movimentação registrada" : <><strong>Última movimentação:</strong> {REQUISITION_STATUS[item.status[0].status]} às {statusTime} de {statusDate}</>}
        </p>
      </div>
    </Link>
  );
}
