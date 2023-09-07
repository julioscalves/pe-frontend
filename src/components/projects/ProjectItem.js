import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaWrench } from "react-icons/fa";
import ProjectModalForm from "./ProjectModalForm";

export default function ListItem({ item }) {
  const [isModalActive, setIsModalActive] = useState(false);
  const { pathname } = useRouter();
  console.log(item)

  return (
    <div className="transition duration-500 hover:bg-blue-700 bg-gray-800 p-4 rounded shadow-md hover:shadow-lg transition duration-300 mb-4 w-full px-5 py-5">
      {isModalActive && (
        <ProjectModalForm
          slug={item.slug}
          previousTitle={item.title}
          previousDescription={item.description}
          previousProjectFile={item.project_file}
          previousCeuaProtocol={item.ceua_protocol}
          previousCeuaFile={item.ceua_file}
          previousAuthor={item.author.name}
          previousAdvisor={item.advisor.name}
          setIsModalActive={setIsModalActive}
          isModalActive={isModalActive}
        />
      )}
      <div className="flex items-center">
        <h3 className="text-xl font-semibold mb-2 text-gray-100 text-center">
          {item.title}
        </h3>
        <button
          className="hover:text-amber-500 mb-auto ml-auto"
          onClick={() => setIsModalActive(true)}
        >
          <FaWrench className="inline-block" />
        </button>
      </div>
      <p className="text-gray-400">
        <strong>Autor:</strong> {item.author.name}{" "}
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
          <Link href={item.project_file}>
            <p className="underline">Aqui</p>
          </Link>
        </p>
      ) : (
        <p className="text-gray-400">Nenhum arquivo de projeto cadastrado.</p>
      )}
      {item.ceua_file !== null ? (
        <p className="text-gray-400">
          <strong>Arquivo de protocolo CEUA: </strong>{" "}
          <Link href={item.ceua_file}>
            <p className="underline">Aqui</p>
          </Link>
        </p>
      ) : (
        <p className="text-gray-400">
          Nenhum arquivo de protocolo CEUA cadastrado.
        </p>
      )}
    </div>
  );
}
