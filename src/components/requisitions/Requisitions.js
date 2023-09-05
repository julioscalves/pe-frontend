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
import Pagination from "../utils/Paginator";
import LoadingSpinner from "../utils/LoadingSpinner";

async function fetchData({
  URL,
  authToken,
  setData,
  setNextPage,
  setPreviousPage,
  setVisualizationData,
  setLoading,
  setError,
}) {
  console.log(URL);
  try {
    const response = await fetch(URL, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    setData(data.results);
    setNextPage(data.next);
    setPreviousPage(data.previous);
    setVisualizationData(data.results);
    setLoading(false);
  } catch (error) {
    setError(error);
    setLoading(false);
  }
}

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
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  const { authToken } = useAuth();

  useEffect(() => {
    const URL = ROOT_URL + REQUISITIONS_PATH + "?ordering=-timestamp";

    const asyncWrapper = async () => {
      fetchData({
        URL,
        authToken,
        setData,
        setNextPage,
        setPreviousPage,
        setLoading,
        setError,
      });
    };

    asyncWrapper();
  }, [authToken]);

  const handleNextPage = () => {
    if (nextPage) {
      fetchData({
        URL: nextPage,
        authToken,
        setData,
        setNextPage,
        setPreviousPage,
        setVisualizationData,
        setLoading,
        setError,
      });
    }
  };

  const handlePreviousPage = () => {
    if (previousPage) {
      fetchData({
        URL: previousPage,
        authToken,
        setData,
        setNextPage,
        setPreviousPage,
        setVisualizationData,
        setLoading,
        setError,
      });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

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
          <div className="mx-auto">
            <Pagination
              previous={previousPage}
              next={nextPage}
              handlePreviousPage={handlePreviousPage}
              handleNextPage={handleNextPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
