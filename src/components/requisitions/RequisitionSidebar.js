import { Sidebar } from "flowbite-react";
import FilterTags from "./FilterTags";
import FilterDate from './FilterDate'
import { FaFilter } from "react-icons/fa";

export default function RequisitionSidebar({
  visualizationData,
  setVisualizationData,
  data,
}) {
  return (
    <div className="sticky top-0 h-fit overflow-y-auto">
      <Sidebar>
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
