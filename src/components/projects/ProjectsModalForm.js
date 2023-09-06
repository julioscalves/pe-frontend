import { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import InputField from "../utils/InputField";
import {
  ROOT_URL,
  PROJECTS_PATH,
} from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext";
import AutocompleteInputField from "../utils/AutocompleteInputField";
import Checkbox from "../utils/Checkbox";

export default function ProfileModalForm({
  id,
  previousTitle,
  previousDescription,
  previousProjectFile,
  previousCeuaProtocol,
  previousCeuaFile,
  previousAuthor,
  previousAdvisor,
  isModalActive,
  setIsModalActive,
}) {
  const [title, setTitle] = useState(previousTitle);
  const [description, setDescription] = useState(previousDescription);
  const [projectFile, setProjectFile] = useState(previousProjectFile);
  const [ceua, setCeua] = useState(previousCeuaProtocol);
  const [ceuaFile, setCeuaFile] = useState(previousCeuaFile);
  const [author, setAuthor] = useState(previousAuthor);
  const [advisor, setAdvisor] = useState(previousAdvisor);

  const { authToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id,
      email,
      phone,
      department,
      institute,
      isStaff,
      isAdvisor,
    };

    try {
      const response = await fetch(ROOT_URL + PROJECTS_PATH + id + "/", {
        method: "PATCH",
        headers: {
          Authorization: `Token ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsModalActive(false);
        router.push("/dashboard/requisitions");
      } else {
        console.error("Registration failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  if (isModalActive) {
    return (
      <>
        <Modal
          show={isModalActive}
          onClose={() => setIsModalActive(false)}
          className="bg-gray-800"
        >
          <Modal.Header>Atualizar perfil</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <InputField
                label="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <InputField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-4 py-4">
                <Checkbox
                  label="Membro do corpo técnico"
                  text="Define usuários com permissões para acessar e manipular os dados do sistema"
                  checked={isStaff}
                  onChange={() => setIsStaff(!isStaff)}
                />
                <Checkbox
                  label="Membro do corpo docente"
                  text="Define usuários que podem ser listados como orientadores"
                  checked={isAdvisor}
                  onChange={() => setIsAdvisor(!isAdvisor)}
                />
              </div>
              <AutocompleteInputField
                label="Instituição"
                value={institute}
                onChange={(e) => setInstitute(e.target.value)}
                url={ROOT_URL + INSTITUTES_PATH}
                placeholder="Busca por instituições"
                field="name"
              />
              <AutocompleteInputField
                label="Departamento"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                url={ROOT_URL + DEPARTMENTS_PATH}
                placeholder="Busca por departamentos"
                field="name"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              color="success"
              className="font-bold"
              pill
              onClick={handleSubmit}
            >
              Enviar
            </Button>
            <Button
              color="warning"
              className="font-bold"
              pill
              onClick={() => setIsModalActive(false)}
            >
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return <></>;
}
