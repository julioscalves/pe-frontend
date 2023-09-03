import React from "react";
import moment from "moment/moment";
import { REQUISITION_STATUS } from "@/utils/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import Tag from "../utils/Tag";

export default function ListItem({ data }) {
  const datetimeFormats = {
    date: "DD/MM/YYYY",
    time: "HH:mm",
  };

  return (
    <div className="transition duration-500 hover:scale-105 hover:bg-blue-700 bg-gray-800 p-4 rounded shadow-md hover:shadow-lg transition duration-300 mb-4 w-full px-5 py-5">
      <h3 className="text-xl font-semibold mb-2 text-gray-100 text-center">
      Entrega de {data.females > 0 ? `${data.females}F` : ""}{" "}
                  {data.females > 0 && data.males > 0 ? "e de" : ""}{" "}
                  {data.males > 0 ? `${data.males}M` : ""}{" "}
      </h3>
      <p className="text-gray-400">
        <strong>Requisição:</strong> {data.requisition.protocol}{" "}
      </p>
      <p className="text-gray-400">
        <strong>Data de entrega:</strong> {data.date}
      </p>
      <p className="text-gray-400">
        <strong>Registrada por:</strong> {data.author.name}
      </p>
    </div>
  );
}
