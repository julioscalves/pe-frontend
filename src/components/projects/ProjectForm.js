import React, { useState, useEffect } from "react";
import InputField from "@/components/utils/InputField";
import AutocompleteInputField from "@/components/utils/AutocompleteInputField";
import FileInputField from "../utils/FileInputField";
import SubmitButton from "../utils/SubmitButton";
import { ROOT_URL, PROFILES_PATH, PROJECTS_PATH } from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext";
import LoadingSpinner from "../utils/LoadingSpinner";
import Alert from "../utils/Alert";
import { useRouter } from "next/router";

export default function ProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectFile, setProjectFile] = useState(null);
  const [ceuaProtocol, setCeuaProtocol] = useState("");
  const [ceuaFile, setCeuaFile] = useState(null);
  const [advisor, setAdvisor] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [displayAlert, setDisplayAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const { authToken } = useAuth();

  const router = useRouter();

  useEffect(() => {
    const isTitleValid = title.length > 10;
    const isCeuaProtocolValid = ceuaProtocol.length > 4;
    const isAuthorValid = author.length > 5;
    const isAdvisorValid = advisor.length > 5;

    setDisabled(
      !(isTitleValid && isCeuaProtocolValid && isAuthorValid && isAdvisorValid)
    );
  }, [title, ceuaProtocol, advisor, author]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    try {
      setLoading(true);
      const response = await fetch(ROOT_URL + PROJECTS_PATH, {
        method: "POST",
        headers: {
          Authorization: `Token ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        setDisplayAlert(true);
        setAlertType("success");
        setAlertMessage("Projeto enviado com successo! Redirecionando...");
        router.push("/dashboard/projects");
      } else {
        setDisplayAlert(true);
        setAlertType("warning");
        setAlertMessage(
          "Houve um erro ao enviar o formulário.",
          response.statusText
        );
      }
    } catch (error) {
      setDisplayAlert(true);
      setAlertType("danger");
      setAlertMessage("Erro na submissão do formulário.", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 py-8 max-w-md mx-auto">
      {loading && <LoadingSpinner />}
      {displayAlert && (
        <Alert
          message={alertMessage}
          type={alertType}
          onClick={() => setDisplayAlert(false)}
        />
      )}
      <form onSubmit={handleSubmit} className="mx-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Registro de projeto de pesquisa
        </h2>
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
          label={"Arquivo do projeto"}
          onChange={(e) => setProjectFile(e.target.files[0])}
        />
        <InputField
          label="Protocolo de parecer da CEUA"
          value={ceuaProtocol}
          onChange={(e) => setCeuaProtocol(e.target.value)}
          required
        />
        <FileInputField
          label={"Arquivo de parecer da CEUA"}
          onChange={(e) => setCeuaFile(e.target.files[0])}
        />
        <AutocompleteInputField
          label="Discente"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          url={ROOT_URL + PROFILES_PATH}
          placeholder="Realizar busca por discente"
          field="name"
          filterOut={true}
          filterOutBy={"is_advisor"}
        />
        <AutocompleteInputField
          label="Orientador"
          value={advisor}
          onChange={(e) => setAdvisor(e.target.value)}
          url={ROOT_URL + PROFILES_PATH}
          placeholder="Realizar busca por orientador"
          field="name"
          filterIn={true}
          filterInBy={"is_advisor"}
        />
        <SubmitButton disabled={disabled} onClick={handleSubmit}>
          Enviar
        </SubmitButton>
      </form>
    </div>
  );
}
