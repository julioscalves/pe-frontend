import React from "react";
import moment from "moment/moment";
import { REQUISITION_STATUS } from "@/utils/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import Tag from "../utils/Tag";

function Tags({ tags }) {
  return (
    <div className="w-fit mt-2">
      {tags.map((tag) => (
        <Tag
          label={tag.name}
          color={tag.color}
          key={tag.id}
        />
      ))}
    </div>
  );
}

export default function ListItem({ item, tags }) {
  const datetimeFormats = {
    date: "DD/MM/YYYY",
    time: "HH:mm",
  };

  const { pathname } = useRouter();

  const formatDateAndTime = (timestamp) => ({
    date: moment(timestamp).format(datetimeFormats.date),
    time: moment(timestamp).format(datetimeFormats.time),
  });

  const itemDateAndTime = formatDateAndTime(item.timestamp);
  const deliverDate = formatDateAndTime(item.date);

  let statusDate = null;
  let statusTime = null;

  if (item.status.length > 0) {
    const lastStatus = item.status[item.status.length - 1];
    const statusDateTime = formatDateAndTime(lastStatus.timestamp);
    statusDate = statusDateTime.date;
    statusTime = statusDateTime.time;
  }

  return (
    <Link href={pathname + "/" + item.protocol}>
      <div className="transition duration-300 hover:bg-blue-700 bg-gray-800 p-4 rounded shadow-md hover:shadow-lg transition duration-300 mb-4 w-full px-5 py-5">
        <h3 className="text-xl font-semibold mb-2 text-gray-100 text-center">
          Solicitação {item.protocol}
        </h3>
        <p className="text-gray-400">
          <strong>Autor:</strong> {item.author.name} ({item.author.institute.abbreviation})
        </p>
        <p className="text-gray-400">
          <strong>Responsável:</strong> {item.advisor.name} ({item.advisor.institute.abbreviation})
        </p>
        <p className="text-gray-400">
          <strong>Quantidade:</strong> {item.females}F {item.males}M
        </p>
        <p className="text-gray-400">
          <strong>Estimativa de finalização de entregas:</strong> {deliverDate.date}
        </p>
        <p className="text-gray-400">
          <strong>Momento de registro do pedido:</strong> às {itemDateAndTime.time} de{" "}
          {itemDateAndTime.date}
        </p>
        {}
        <p className="text-gray-400">
          {item.status.length === 0 ? (
            "Nenhuma movimentação registrada"
          ) : (
            <>
              <strong>Última movimentação:</strong>{" "}
              {REQUISITION_STATUS[item.status[item.status.length - 1].status]}{" "}
              às {statusTime} de {statusDate}
            </>
          )}
        </p>
        {item.tags.length > 0 ? <Tags tags={tags} /> : <></>}
      </div>
    </Link>
  );
}
