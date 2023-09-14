import React, { useState } from "react";
import { FaWrench } from "react-icons/fa";
import ProfileModalForm from "./ProfileModalForm";

export default function ListItem({ item }) {
  const [isModalActive, setIsModalActive] = useState(false);
  const advisorStyle = "outline outline-offset-2 outline-blue-500";
  const staffStyle = "outline outline-offset-2 outline-amber-500";
  return (
    <div>
      {isModalActive && (
        <ProfileModalForm
          id={item.id}
          previousName={item.name}
          previousEmail={item.user.email}
          previousPhone={item.phone}
          previousDepartment={item.department.name}
          previousInstitute={item.institute.name}
          previousIsStaff={item.user.is_staff}
          previousIsAdvisor={item.is_advisor}
          setIsModalActive={setIsModalActive}
          isModalActive={isModalActive}
        />
      )}
      <div
        className={`transition duration-500 hover:bg-blue-700 bg-gray-800 p-4 rounded shadow-md hover:shadow-lg transition duration-300 mb-4 w-full px-5 py-5 ${
          item.is_advisor ? advisorStyle : ""
        } ${item.user.is_staff ? staffStyle : ""}`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold mb-2 text-gray-100 text-center">
            {item.name}
          </h3>
          <button className="text-right hover:text-amber-500 mb-auto" onClick={() => setIsModalActive(true)}>
            <FaWrench className="inline-block"/>
          </button>
        </div>

        {item.is_advisor ? (
          <h5 className="text-sm font-semibold mb-2 text-gray-100 text-center">
            Responsável (Docente ou RT)
          </h5>
        ) : (
          <></>
        )}

        {item.user.is_staff ? (
          <h5 className="text-sm font-semibold mb-2 text-gold-100 text-center">
            Técnico
          </h5>
        ) : (
          <></>
        )}

        <p className="text-gray-400">
          <strong>Vínculo:</strong> {item.department?.name}/
          {item.institute?.abbreviation}
        </p>
        <p className="text-gray-400">
          <strong>Email:</strong> {item.user.email}
        </p>
        <p className="text-gray-400">
          <strong>Telefone:</strong> {item.phone}
        </p>
        <p className="text-gray-400">
          <strong>Data de registro:</strong> {item.user.date_joined}
        </p>
        <p className="text-gray-400"></p>
      </div>
    </div>
  );
}
