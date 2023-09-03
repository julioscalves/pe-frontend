import React, { useState, useEffect } from "react";
import RequisitionItem from "@/components/requisitions/RequisitionItem";
import { ROOT_URL, REQUISITIONS_PATH } from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext";
import BackButton from "../utils/BackButton";
import Link from "next/link";
import Shimmer from "../utils/Shimmer";
import { FaPlusCircle } from "react-icons/fa";
import { Tooltip } from "flowbite-react";
import RequisitionSidebar from "./RequisitionSidebar";

function RequisitionList({ visualizationData }) {
  return !visualizationData || visualizationData.length === 0 ? (
    <p className="text-center text-2xl font-semibold text-gray-500">
      Nenhuma requisição cadastrada
    </p>
  ) : (
    visualizationData.map((item) => (
      <RequisitionItem key={item.id} item={item} tags={item.tags} />
    ))
  );
}

export default function Requisitions() {
  const [data, setData] = useState([]);
  const [visualizationData, setVisualizationData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authToken } = useAuth();

  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          ROOT_URL + REQUISITIONS_PATH + "?ordering=-timestamp",
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setData(data);
        setVisualizationData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 flex">
      <RequisitionSidebar
        setVisualizationData={setVisualizationData}
        data={data}
      ></RequisitionSidebar>

      <div className="flex-grow">
        <h2 className="text-2xl font-semibold text-center">Requisições</h2>
        <div className="grid grid-cols-1 gap-4 mx-5">
          <div className="flex justify-between">
            <BackButton />
            <Tooltip content="Registrar uma nova requisição">
              <Link href="/dashboard/requisitions/create">
                <FaPlusCircle className="w-8 h-8 text-gray-300 hover:text-blue-500 transition duration-200" />
              </Link>
            </Tooltip>
          </div>
          {loading === true ? (
            <Shimmer />
          ) : (
            <RequisitionList visualizationData={visualizationData} />
          )}
        </div>
      </div>
    </div>
  );
}
