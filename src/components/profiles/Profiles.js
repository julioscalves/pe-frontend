import React, { useState, useEffect } from "react";
import ProfileItem from "./ProfileItem";
import { ROOT_URL, PROFILES_PATH } from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext";
import BackButton from "../utils/BackButton";
import Link from "next/link";
import Button from "../utils/Button";
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
    const response = await fetch(URL + "ordering=name", {
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

export default function Events() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authToken } = useAuth();

  useEffect(() => {
    const URL = ROOT_URL + PROFILES_PATH + "?";

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
      <h2 className="text-2xl font-semibold text-center">Usuários</h2>
      <div className="grid grid-cols-1 gap-4 mx-5">
        <div className="grid grid-cols-2">
          <div className="text-left">
            <BackButton />
          </div>
          <div className="text-right">
            <Link href="/dashboard/profiles/create">
              <Button color="green">Novo usuário</Button>
            </Link>
          </div>
        </div>
        {data.length >= 1 ? (
          data
            .map((item) => <ProfileItem key={item.id} item={item} />)
        ) : (
          <p className="text-center text-2xl font-semibold text-gray-500">
            Nenhum usuário cadastrado
          </p>
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
