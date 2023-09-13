import { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import InputField from "../utils/InputField";
import { ROOT_URL, PROJECTS_PATH, PROFILES_PATH } from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext";
import AutocompleteInputField from "../utils/AutocompleteInputField";
import Alert from "../utils/Alert";
import FileInputField from "../utils/FileInputField";
import LoadingSpinner from "../utils/LoadingSpinner";
import { useRouter } from "next/router";

export default function ProjectModalForm({
  slug,
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
  const [projectFile, setProjectFile] = useState(null);
  const [ceuaProtocol, setCeuaProtocol] = useState(previousCeuaProtocol);
  const [ceuaFile, setCeuaFile] = useState(null);
  const [author, setAuthor] = useState(previousAuthor);
  const [advisor, setAdvisor] = useState(previousAdvisor);
  const [loading, setLoading] = useState(false)
  const [displayAlert, setDisplayAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  console.log(ceuaFile, projectFile)

  const { authToken } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("ceua_protocol", ceuaProtocol);
    formData.append("advisor", advisor);
    formData.append("author", author);

    const appendFileIfNotNull = (fieldName, file) => {
      if (file !== null) {
        formData.append(fieldName, file);
      }
    };

    appendFileIfNotNull("project_file", projectFile);
    appendFileIfNotNull("ceua_file", ceuaFile);

    console.log(formData)

    try {
      const response = await fetch(ROOT_URL + PROJECTS_PATH + slug + "/", {
        method: "PATCH",
        headers: {
          Authorization: `Token ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        setDisplayAlert(true);
        setAlertType("success");
        setAlertMessage("Projeto enviado com successo! Redirecionando...");
        setIsModalActive(false)
      } else {
        setDisplayAlert(true);
        setAlertType("warning");
        setAlertMessage(
          "Houve um erro ao enviar o formulário.",
          response.statusText
        );
      }
    } catch (error) {
      console.log(error)
      setDisplayAlert(true);
      setAlertType("danger");
      setAlertMessage("Erro na submissão do formulário.", error);
    } finally {
      setLoading(false);
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
          {loading && <LoadingSpinner />}
          {displayAlert && (
            <Alert
              message={alertMessage}
              type={alertType}
              onClick={() => setDisplayAlert(false)}
            />
          )}
          <Modal.Header>Atualizar projeto</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <InputField
                label="Título do projeto"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <InputField
                label="Observações"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="(Campo opcional)"
              />
              <FileInputField
                label={`Novo arquivo do projeto`}
                onChange={(e) => setProjectFile(e.target.files[0])}
              />
              <InputField
                label="Protocolo de parecer da CEUA"
                value={ceuaProtocol}
                onChange={(e) => setCeuaProtocol(e.target.value)}
                required
              />
              <FileInputField
                label={"Novo arquivo de parecer da CEUA"}
                onChange={(e) => setCeuaFile(e.target.files[0])}
              />
              <AutocompleteInputField
                label="Autor"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                url={ROOT_URL + PROFILES_PATH}
                placeholder="Realizar busca por autor"
                field="name"
                filterOut={true}
                filterOutBy={"is_advisor"}
              />
              <AutocompleteInputField
                label="Responsável"
                value={advisor}
                onChange={(e) => setAdvisor(e.target.value)}
                url={ROOT_URL + PROFILES_PATH}
                placeholder="Realizar busca por responsável"
                field="name"
                filterIn={true}
                filterInBy={"is_advisor"}
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
