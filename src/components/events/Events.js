import React, { useState, useEffect } from "react";
import EventItem from "./EventItem";
import { ROOT_URL, EVENTS_PATH } from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext";
import BackButton from "../utils/BackButton";

export default function Events() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { authToken } = useAuth();

  useEffect(() => {
    fetch(ROOT_URL + EVENTS_PATH, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data.results);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-center">Eventos</h2>
      <div className="grid grid-cols-1 gap-4 mx-5">
        <div className="text-left">
          <BackButton>Retornar</BackButton>
        </div>
        {data.length > 0 ? (
          data.reverse().map((item) => <EventItem key={item.id} item={item} />)
        ) : (
          <p className="text-center">Nenhum evento cadastrado</p>
        )}
      </div>
    </div>
  );
}
