import React, { useState, useEffect } from "react";
import ProjectItem from "./ProjectItem";
import { ROOT_URL, PROJECTS_PATH, PROFILES_PATH } from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext";
import BackButton from "../utils/BackButton";
import Button from "../utils/Button";
import Link from "next/link";
import Pagination from "../utils/Paginator";
import LoadingSpinner from "../utils/LoadingSpinner";

async function fetchData({
  URL,
  authToken,
  setData,
  setNextPage,
  setPreviousPage,
  setLoading,
  setError,
}) {
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
    setLoading(false);
  } catch (error) {
    setError(error);
    setLoading(false);
  }
}

export default function Projects() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { authToken } = useAuth();
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const URL = ROOT_URL + PROJECTS_PATH + "?";

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
  }, []);

  const handleNextPage = () => {
    if (nextPage) {
      fetchData({
        URL: nextPage,
        authToken,
        setData,
        setNextPage,
        setPreviousPage,
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
        setLoading,
        setError,
      });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-center">Projetos</h2>
      <div className="grid grid-cols-1 gap-4 mx-5">
        <div className="grid grid-cols-2 mt-4">
          <div className="text-left">
            <BackButton>Retornar</BackButton>
          </div>
          <div className="text-right">
            <Link href="/dashboard/projects/create">
              <Button>Novo projeto</Button>
            </Link>
          </div>
        </div>
        {data.length > 0 ? (
          data.map((item) => <ProjectItem key={item.id} item={item} />)
        ) : (
          <p className="text-center text-2xl font-semibold text-gray-500">Nenhum projeto cadastrado</p>
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
  );
}
