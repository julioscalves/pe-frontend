import React, { useState, useEffect } from "react";
import DeliveryItem from "./DeliveryItem";
import { ROOT_URL, DELIVERIES_PATH } from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext";
import BackButton from "../utils/BackButton";
import Button from "../utils/Button";
import Link from "next/link";
import Shimmer from "../utils/Shimmer";

function DeliveryList({ data }) {
  return (!data || data.length === 0 ? (
    <p className="text-center text-2xl font-semibold text-gray-500">Nenhuma requisição cadastrada</p>
  ) : (
    data.map((item) => <DeliveryItem data={item} key={item.id} />)
  ))
}

export default function Requisitions() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authToken } = useAuth();

  useEffect(() => {
    fetch(ROOT_URL + DELIVERIES_PATH + "?ordering=-timestamp", {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false)
      })
      .catch((error) => {
        setError(error);
        setLoading(false)
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-center">Requisições</h2>
      <div className="grid grid-cols-1 gap-4 mx-5">
        <div className="grid grid-cols-2">
          <div className="text-left">
            <BackButton>Retornar</BackButton>
          </div>
        </div>
        { loading === true ? <Shimmer /> : <DeliveryList data={data} />}
      </div>
    </div>
  );
}
