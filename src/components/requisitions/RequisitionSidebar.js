import React, { useState } from "react";
import { Sidebar } from "flowbite-react";
import FilterTags from "./FilterTags";
import FilterDate from "./FilterDate";
import { FaFilter } from "react-icons/fa";
import Button from "../utils/Button";
import {MdMenu, MdMenuOpen} from "react-icons/md";

export default function RequisitionSidebar({
  visualizationData,
  setVisualizationData,
  data,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="sticky h-fit">
      <div className="md:hidden">
        {isSidebarOpen ? <MdMenuOpen className="h-8 w-8 text-center mx-auto" onClick={toggleSidebar} /> : <MdMenu className="h-8 w-8" onClick={toggleSidebar} />}
      </div>
      <Sidebar className={`md:block ${isSidebarOpen ? "block" : "hidden"} z-50`}>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#">
              <div className="flex items-center justify-center">
                <FaFilter className="mr-2" />
                <p className="text-xl font-bold">Filtragem por tag</p>
              </div>
              <FilterTags
                visualizationData={visualizationData}
                setVisualizationData={setVisualizationData}
                data={data}
              />
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
