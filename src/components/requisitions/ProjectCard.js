import React, { useState } from "react";
import { Button } from "flowbite-react";
import { FaWrench } from "react-icons/fa";
import ProjectModalForm from "./ProjectModalForm";

export default function ProjectCard({ project }) {
  const [isModalActive, setIsModalActive] = useState(false)
  return (
    <div className="bg-gray-800 p-4 rounded shadow-md">
      <ProjectModalForm
        projectSlug={project.slug}
        previousTitle={project.title}
        previousCeua={project.ceua_protocol}
        previousAuthor={project.author.name}
        previousAdvisor={project.advisor.name}
        previousDescription={project.description}
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
      />
      <div className="grid grid-cols-2 mb-4">
        <h2 className="text-xl font-semibold">Projeto</h2>
        <Button
          size="xs"
          color="gray"
          className="w-fit justify-self-end place-self-center font-bold"
          onClick={() => setIsModalActive(!isModalActive)}
          outline
          pill
        >
          <FaWrench className="h-3 w-3" />
        </Button>
      </div>
      <p>Título: {project.title}</p>
      <p>CEUA: {project.ceua_protocol}</p>
      <p>
        Autor: {project.author.name} -{" "}
        {project.author.department?.name + "/" ?? ""}
        {project.author.institute?.abbreviation ?? ""}
      </p>
      <p>
        Orientador: {project.advisor.name} -{" "}
        {project.advisor.department?.name + "/" ?? ""}
        {project.advisor.institute?.abbreviation ?? ""}
      </p>
    </div>
  );
}
