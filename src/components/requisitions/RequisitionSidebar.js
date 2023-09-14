import React, { useState } from "react";
import { Sidebar } from "flowbite-react";
import FilterTags from "./FilterTags";
import FilterDate from "./FilterDate";
import { FaFilter } from "react-icons/fa";
import Button from "../utils/Button";
import { MdMenu, MdMenuOpen } from "react-icons/md";
import TagModalForm from "./TagModalForm";

export default function RequisitionSidebar({
  visualizationData,
  setVisualizationData,
  data,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="sticky h-fit">
      <div className="md:hidden">
        {isSidebarOpen ? (
          <MdMenuOpen
            className="h-8 w-8 text-center mx-auto"
            onClick={toggleSidebar}
          />
        ) : (
          <MdMenu className="h-8 w-8" onClick={toggleSidebar} />
        )}
      </div>
      <Sidebar
        className={`md:block ${isSidebarOpen ? "block" : "hidden"} z-50`}
      >
        {isModalActive ? (
          <TagModalForm
            isModalActive={isModalActive}
            setIsModalActive={setIsModalActive}
          />
        ) : (
          <></>
        )}
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item>
              <div className="flex items-center justify-center">
                <FaFilter className="mr-2" />
                <p className="text-xl font-bold">Filtragem por etiqueta</p>
              </div>
              <FilterTags
                visualizationData={visualizationData}
                setVisualizationData={setVisualizationData}
                data={data}
              />
              {/*
              <div className="mx-auto text-center">
                <Button color="blue" onClick={() => setIsModalActive(true)}>
                  Gerenciar tags
                </Button>
              </div>
              */}
            </Sidebar.Item>
            <Sidebar.Item href="#">
              <div className="flex items-center justify-center">
                <FaFilter className="mr-2" />
                <p className="text-xl font-bold">Filtragem por datas</p>
              </div>
              <FilterDate
                visualizationData={visualizationData}
                setVisualizationData={setVisualizationData}
                data={data}
              />
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
