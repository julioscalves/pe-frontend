import React, { useState, useEffect } from "react";
import DetailCard from "./DetailCard";
import StatusCard from "./StatusCard";
import DeliveryCard from "./DeliveryCard";
import ProjectCard from "./ProjectCard";
import { useRouter } from "next/router";
import LoadingSpinner from "../utils/LoadingSpinner";
import BackButton from "../utils/BackButton";
import fetchData from "./utils/fetchData";
import { useRequisitionData } from "./utils/useRequisitionData";
import { useAuth } from "@/contexts/AuthContext";

export default function RequisitionDetail() {
  const { requisitionData, setRequisitionData } = useRequisitionData();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { asPath } = useRouter();
  const protocol = asPath.split("/").pop();
  const { authToken } = useAuth();

  useEffect(() => {
    async function fetchDataAndHandleErrors() {
      try {
        await fetchData({ protocol, setRequisitionData, authToken });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    }

    fetchDataAndHandleErrors();
  }, []);

  if (error) {
    return <div>Error fetching data.</div>;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-2 text-center mb-5">
        Requisição {requisitionData.protocol} por {requisitionData.author.name}{" "}
        ({requisitionData.author.institute.abbreviation}/
        {requisitionData.author.department.name})
      </h1>
      <div className="mb-4">
        <BackButton>Retornar</BackButton>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DetailCard
          data={requisitionData}
          tags={requisitionData.tags}
          protocol={requisitionData.protocol}
          setData={setRequisitionData}
          setLoading={setLoading}
          setError={setError}
        />
        <ProjectCard
          project={requisitionData.project}
          protocol={requisitionData.protocol}
          setData={setRequisitionData}
          setLoading={setLoading}
          setError={setError}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DeliveryCard
          data={requisitionData.deliveries}
          males={requisitionData.males}
          females={requisitionData.females}
          protocol={requisitionData.protocol}
          setData={setRequisitionData}
          setLoading={setLoading}
          setError={setError}
        />
        <StatusCard status={requisitionData.status} />
      </div>
    </div>
  );
}
