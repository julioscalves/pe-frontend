import React, { useState } from "react";
import moment from "moment/moment";
import Tag from "../utils/Tag";
import { Button } from "flowbite-react";
import { FaWrench } from "react-icons/fa";
import DetailModalForm from "./DetailModalForm";

function Tags({ tags }) {
  return (
    <div className="w-fit mt-2">
      {tags.map((tag) => (
        <Tag
          label={tag.name}
          color={tag.color}
          key={tag.id}
          link={`/tags/${tag.slug}`}
        />
      ))}
    </div>
  );
}

export default function DetailCard({ data, tags }) {
  const [isModalActive, setIsModalActive] = useState(false);

  const datetimeFormats = {
    date: "DD/MM/YYYY",
    time: "HH:mm",
  };
  const date = moment(data.timestamp).format(datetimeFormats.date);
  const time = moment(data.timestamp).format(datetimeFormats.time);
  const deliver = moment(data.date).format(datetimeFormats.date);

  console.log(data)

  return (
    <div className="bg-gray-800 p-4 rounded shadow-md">
      <DetailModalForm
        protocol={data.protocol}
        deliveryDate={data.date}
        solicitedMales={data.males}
        solicitedFemales={data.females}
        oldNotes={data.author_notes}
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
      />
      <div className="grid grid-cols-2 mb-4">
        <h2 className="text-xl font-semibold">Detalhes</h2>
        <Button
          size="xs"
          className="w-fit justify-self-end place-self-center font-bold"
          color="gray"
          outline
          pill
          onClick={() => setIsModalActive(true)}
        >
          <FaWrench className="h-3 w-3" />
        </Button>
      </div>

      <p>Entrega: {deliver}</p>
      <p>
        Quantidade: {data.females}F {data.males}M
      </p>
      <p>
        Momento do pedido: às {time} de {date}
      </p>
      {data.author_notes.length > 0 ? (
        <p>Observações: {data.author_notes}</p>
      ) : (
        <p>Nenhuma observação registrada.</p>
      )}
      {tags.length > 0 ? <Tags tags={tags} /> : <></>}
    </div>
  );
}
