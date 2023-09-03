import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ROOT_URL, PROJECTS_PATH } from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext";
import LoadingSpinner from "../utils/LoadingSpinner";
import BackButton from "../utils/BackButton";
import moment from "moment/moment";

export default function DetailCard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authToken } = useAuth();
  const { asPath } = useRouter();
  const slug = asPath.split("/").slice(-1);

  useEffect(() => {
    fetch(ROOT_URL + PROJECTS_PATH + slug, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (error) {
    return <div>Error fetching data.</div>;
  }

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <div className="text-left mb-6">
        <BackButton>Retornar</BackButton>
      </div>
      <div className="bg-gray-800 p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">{data.title}</h2>
        <p></p>
      </div>
    </>
  );
}
