import React, { useState, useEffect } from "react";
import ProfileItem from "./ProfileItem";
import { ROOT_URL, PROFILES_PATH } from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext";
import BackButton from "../utils/BackButton";
import Link from "next/link";
import Button from "../utils/Button";

export default function Events() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { authToken } = useAuth();

  useEffect(() => {
    fetch(ROOT_URL + PROFILES_PATH, {
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
      <h2 className="text-2xl font-semibold text-center">Usuários</h2>
      <div className="grid grid-cols-1 gap-4 mx-5">
        <div className="grid grid-cols-2">
          <div className="text-left">
            <BackButton>Retornar</BackButton>
          </div>
          <div className="text-right">
            <Link href="/dashboard/profiles/create">
              <Button color="green">Novo usuário</Button>
            </Link>
          </div>
        </div>
        {data.length > 0 ? (
          data
            .reverse()
            .map((item) => <ProfileItem key={item.id} item={item} />)
        ) : (
          <p className="text-center text-2xl font-semibold text-gray-500">Nenhum usuário cadastrado</p>
        )}
      </div>
    </div>
  );
}
