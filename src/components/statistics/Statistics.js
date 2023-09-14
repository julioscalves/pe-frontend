import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ROOT_URL, STATISTICS_PATH } from "@/utils/constants";
import Pie from "./Pie";
import LoadingSpinner from "../utils/LoadingSpinner";
import Bar from "./Bar";
import moment from "moment";
import InputField from "../utils/InputField";
import BackButton from "../utils/BackButton";

const statusTranslationTable = {
  delivered_females: "Fêmeas entregues",
  required_females: "Fêmeas solicitadas",
  delivered_males: "Machos entregues",
  required_males: "Machos solicitados",
};

const propertyTranslationTable = {
  by_protocol: "protocolo",
  by_institute: "entidade",
  by_department: "departamento",
  by_advisor: "responsável",
  by_author: "autor",
  by_project: "projeto ou solicitação",
  by_tags: "etiqueta",
};

async function fetchData({ URL, authToken, setData }) {
  console.log(URL);
  try {
    const response = await fetch(URL, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });
    const json = await response.json();
    setData(json);
  } catch (error) {}
}

export default function Statistics() {
  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [URL, setURL] = useState(`${ROOT_URL}${STATISTICS_PATH}?`);

  const { authToken } = useAuth();

  console.log(data);

  useEffect(() => {
    const baseURL = `${ROOT_URL}${STATISTICS_PATH}?`;
    let updatedURL = null;
    const queryParams = [];
    console.log(startDate, endDate);

    if (startDate !== null && moment(startDate).isValid()) {
      queryParams.push(`start_date=${startDate}`);
    }

    if (endDate !== null && moment(endDate).isValid()) {
      queryParams.push(`end_date=${endDate}`);
    }

    console.log(startDate, endDate);

    if (queryParams.length > 0) {
      const query = queryParams.join("&");
      updatedURL = `${baseURL}${query}`;
    } else {
      updatedURL = baseURL;
    }

    const asyncWrapper = async () => {
      setLoading(true);
      fetchData({ URL: updatedURL, authToken, setData });
      setLoading(false);
    };

    asyncWrapper();
  }, [startDate, endDate]);

  useEffect(() => {
    const asyncWrapper = async () => {
      await fetchData({ URL, authToken, setData });
      setLoading(false);
    };

    asyncWrapper();
  }, []);

  if (loading || !data) {
    return <LoadingSpinner />;
  }

  const transformSimpleData = (dataObject) => {
    const transformedData = [];

    for (const key in dataObject) {
      if (dataObject.hasOwnProperty(key)) {
        const dataLabel = statusTranslationTable[key];

        transformedData.push({
          id: dataLabel,
          value: dataObject[key],
        });
      }
    }

    return transformedData;
  };

  const truncateLongStrings = (string) => {
    const MAX_LENGTH = 30;
    return string.length > MAX_LENGTH ? `${string.substring(0, MAX_LENGTH)}...` : string;
  };

  const transformNestedData = (dataObject) => {
    const transformedData = [];

    for (const inst in dataObject) {
      if (dataObject.hasOwnProperty(inst)) {
        const entry = dataObject[inst];
        const data = transformSimpleData(entry);

        transformedData.push({
          id: truncateLongStrings(inst),
          data,
        });
      }
    }

    return transformedData;
  };

  const objectArray = Object.keys(data).map((key) => ({
    id: key,
    ...data[key],
  }));

  return (
    <div className="flex-col items-center justify-center">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-2xl font-bold text-center my-10">
          Estatística de solicitações e entregas
        </h1>
        <BackButton />
        <div className="grid gap-4 grid-cols-2 mt-5 max-w-md mx-auto">
          <InputField
            label="Data inicial"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            type="date"
          />
          <InputField
            label="Data final"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            type="date"
          />
        </div>
        {objectArray.map((item) => (
          <div key={item.id} className="bg-gray-800 rounded py-3 my-5">
            <h1 className="text-xl subpixel-antialiased font-bold text-center mt-10">
              {item.id === "by_total"
                ? "Total de solicitações e entregas"
                : `Total por ${propertyTranslationTable[item.id]}`}
            </h1>
            {item.id === "by_total" ? (
              <Pie data={transformSimpleData(item)} />
            ) : (
              <Bar data={transformNestedData(item)} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
