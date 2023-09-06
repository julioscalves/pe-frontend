import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ListItem({ item }) {
  const { pathname } = useRouter();
  console.log(item);

  return (
    <div className="transition duration-500 hover:scale-105 hover:bg-blue-700 bg-gray-800 p-4 rounded shadow-md hover:shadow-lg transition duration-300 mb-4 w-full px-5 py-5">
      <h3 className="text-xl font-semibold mb-2 text-gray-100 text-center">
        {item.title}
      </h3>
      <p className="text-gray-400">
        <strong>Author:</strong> {item.author.name}{" "}
        {item.author.institute?.abbreviation !== null &&
          item.author.department?.name &&
          `(${item.author.department.name}/${item.author.institute.abbreviation})`}
      </p>
      <p className="text-gray-400">
        <strong>Orientador:</strong> {item.advisor.name}{" "}
        {item.advisor.institute?.abbreviation !== null &&
          item.advisor.department?.name &&
          `(${item.advisor.department.name}/${item.advisor.institute.abbreviation})`}
      </p>
      {item.description.length > 0 && (
        <p className="text-gray-400">
          <strong>Descrição:</strong> {item.description}
        </p>
      )}
      <p className="text-gray-400">
        <strong>Protocol CEUA:</strong> {item.ceua_protocol}
      </p>
      {item.project_file !== null ? (
        <p className="text-gray-400">
          <strong>Arquivo de projeto: </strong>{" "}
          <Link href={item.project_file}>{item.project_file}</Link>
        </p>
      ) : (
        <p className="text-gray-400">
          Nenhum arquivo de projeto cadastrado.
        </p>
      )}
      {item.ceua_file !== null ? (
        <p className="text-gray-400">
          <strong>Arquivo de protocolo CEUA: </strong>{" "}
          <Link href={item.ceua_file}>{item.ceua_file}</Link>
        </p>
      ) : (
        <p className="text-gray-400">
          Nenhum arquivo de protocolo CEUA cadastrado.
        </p>
      )}

    </div>
  );
}
