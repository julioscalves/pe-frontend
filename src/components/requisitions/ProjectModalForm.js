import { useState } from "react";
import { Button, Modal } from "flowbite-react";
import InputField from "../utils/InputField";
import { ROOT_URL, PROJECTS_PATH, PROFILES_PATH } from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext";
import TextArea from "../utils/TextArea";
import Alert from "../utils/Alert";
import fetchData from "./utils/fetchData";
import AutocompleteInputField from "../utils/AutocompleteInputField";
import { useRequisitionData } from "./utils/useRequisitionData";

export default function ProjectModalForm({
  projectSlug,
  previousTitle,
  previousCeua,
  previousAuthor,
  previousAdvisor,
  previousDescription,
  isModalActive,
  setIsModalActive,
}) {
  const [title, setTitle] = useState(previousTitle);
  const [ceua, setCeua] = useState(previousCeua);
  const [author, setAuthor] = useState(previousAuthor);
  const [advisor, setAdvisor] = useState(previousAdvisor);
  const [description, setDescription] = useState(previousDescription);

  const [displayAlert, setDisplayAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const { authToken } = useAuth();
  const { requisitionData, setRequisitionData } = useRequisitionData();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("project", projectSlug);
    formData.append("title", title);
    formData.append("ceua_protocol", ceua);
    formData.append("advisor", advisor);
    formData.append("author", author);

    try {
      const response = await fetch(
        ROOT_URL + PROJECTS_PATH + projectSlug + "/",
        {
          method: "PATCH",
          headers: {
            Authorization: `Token ${authToken}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        await fetchData({ protocol, setRequisitionData, authToken });
        setDisplayAlert(true);
        setAlertType("success");
        setAlertMessage("Atualização registrada com sucesso!");
        setIsModalActive(false);
      } else {
        setDisplayAlert(true);
        setAlertType("warning");
        setAlertMessage(
          "Houve um erro ao enviar o formulário: " + response.statusText
        );
        setTimeout(() => setDisplayAlert(false), 2000);
      }
    } catch (error) {
      setDisplayAlert(true);
      setAlertType("danger");
      setAlertMessage("Erro na submissão do formulário: " + error.message);
    }
  };

  return (
    <Modal
      show={isModalActive}
      onClose={() => setIsModalActive(false)}
      className="bg-gray-800"
    >
      <Modal.Header>Atualizar projeto</Modal.Header>
      <Modal.Body>
        {displayAlert && (
          <Alert
            message={alertMessage}
            type={alertType}
            onClick={() => setDisplayAlert(false)}
          />
        )}
        <div className="space-y-6">
          <InputField
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputField
            label="Protocolo CEUA"
            value={ceua}
            onChange={(e) => setCeua(e.target.value)}
          />
          <AutocompleteInputField
            label="Discente"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            url={ROOT_URL + PROFILES_PATH}
            placeholder="Realizar busca por discente"
            field="name"
          />
          <AutocompleteInputField
            label="Orientador"
            value={advisor}
            onChange={(e) => setAdvisor(e.target.value)}
            url={ROOT_URL + PROFILES_PATH}
            placeholder="Realizar busca por orientador"
            field="name"
          />
          <TextArea
            value={description}
            label="Observações"
            onChange={(e) => setDescription(e.target.value)}
            placeholder={"Campo opcional"}
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
  );
}
