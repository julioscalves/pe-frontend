import React, { useState } from "react";
import moment from "moment/moment";
import { Button } from "flowbite-react";
import { FaTrash, FaExclamationTriangle } from "react-icons/fa";
import DeliveryModalForm from "./DeliveryModalForm";
import { ROOT_URL, DELIVERIES_PATH } from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext";
import { Modal } from "flowbite-react";
import { useRequisitionData } from "./utils/useRequisitionData";
import fetchData from "./utils/fetchData";

function DeleteConfirmationModal({ deliveryId, isOpen, setIsOpen }) {
  const { authToken } = useAuth();
  const { requisitionData, setRequisitionData } = useRequisitionData();
  const protocol = requisitionData.protocol

  const handleDeletion = async (target) => {
    await fetch(ROOT_URL + DELIVERIES_PATH + target + "/", {
      method: "DELETE",
      headers: {
        Authorization: `Token ${authToken}`,
        "Content-Type": "application/json",
      },
    });
    await fetchData({ protocol, setRequisitionData, authToken })
    setIsOpen(false);
  };


  return (
    <>
      <Modal show={isOpen} size="md" popup onClose={() => setIsOpen(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <FaExclamationTriangle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Tem certeza que deseja remover esta entrega?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleDeletion(deliveryId)}
              >
                Confirmar
              </Button>
              <Button color="gray" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

function DeliveryItem({ delivery }) {
  const [isOpen, setIsOpen] = useState(false);
  const datetimeFormats = {
    date: "DD/MM/YYYY",
    time: "HH:mm",
  };

  const femalesText = delivery.females > 0 ? `${delivery.females}F` : "";
  const malesText = delivery.males > 0 ? `${delivery.males}M` : "";

  return (
    <li className="mb-8 ml-4" key={delivery.key}>
      <DeleteConfirmationModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        deliveryId={delivery.id}
      />
      <div className="grid grid-cols-2">
        <div className="col-span-full">
          <div className="absolute w-3 h-3 bg-gray-100 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            {moment(delivery.date).format(datetimeFormats.date)}
          </time>
          <div className="flex">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Entrega de {femalesText} {femalesText && malesText ? "e de" : ""}{" "}
              {malesText}
            </h3>
            <FaTrash
              className="h-4 w-4 mt-1 ml-auto text-gray-400 hover:text-red-500 transition duration-200"
              onClick={() => setIsOpen(true)}
            />
          </div>
          {delivery.notes.length > 1 ? (
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              {delivery.notes}
            </p>
          ) : null}
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            {delivery.author.name}
          </p>
        </div>
      </div>
    </li>
  );
}

function DeliveryTimeline({ data }) {
  return (
    <ol className="relative border-l border-gray-900 dark:border-gray-700">
      {data.map((delivery) => (
        <DeliveryItem key={delivery.key} delivery={delivery} />
      ))}
    </ol>
  );
}

export default function DeliveryCard({ data, males, females, protocol }) {
  const [isModalActive, setIsModalActive] = useState(false);

  const malesDelivered = data.reduce((acc, item) => acc + item.males, 0);
  const femalesDelivered = data.reduce((acc, item) => acc + item.females, 0);
  const malesRemaining = males - malesDelivered;
  const femalesRemaining = females - femalesDelivered;

  return (
    <div className="bg-gray-800 text-gray-200 p-4 rounded shadow-md mt-4 static">
      <DeliveryModalForm
        protocol={protocol}
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
      />
      <h2 className="text-xl font-semibold mb-4 text-left">Entregas</h2>
      {data?.length > 0 ? (
        <DeliveryTimeline data={data} />
      ) : (
        <p className="mb-16">Nenhuma entrega registrada.</p>
      )}
      {data?.length > 0 ? (
        <p>
          Pendentes: {femalesRemaining}F {malesRemaining}M
        </p>
      ) : (
        <></>
      )}
      <Button
        className="w-full relative px-5 font-bold mt-2"
        color="success"
        onClick={() => setIsModalActive(true)}
        pill
        disabled={malesRemaining <= 0 && femalesRemaining <= 0}
      >
        {malesRemaining <= 0 && femalesRemaining <= 0
          ? "Quantitativo solicitado entregue com sucesso"
          : "Registrar entrega"}
      </Button>
    </div>
  );
}
