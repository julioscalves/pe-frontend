import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InputField from "../utils/InputField";
import AutocompleteInputField from "../utils/AutocompleteInputField";
import Button from "../utils/SubmitButton";
import { ROOT_URL, REQUISITIONS_PATH, PROJECTS_PATH } from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext";
import TagInputField from "../utils/TagInputField";
import Alert from "../utils/Alert";
import LoadingSpinner from "../utils/LoadingSpinner";

export default function Register() {
  const [date, setDate] = useState("");
  const [males, setMales] = useState(0);
  const [females, setFemales] = useState(0);
  const [project, setProject] = useState("");
  const [authorNotes, setAuthorNotes] = useState("");
  const [tags, setTags] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [displayAlert, setDisplayAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const { authToken } = useAuth();

  const router = useRouter();

  const handleSubmit = async () => {
    if (!buttonDisabled) {
      const payload = {
        date,
        males,
        females,
        project,
        authorNotes,
        tags,
      };

      try {
        const response = await fetch(ROOT_URL + REQUISITIONS_PATH, {
          method: "POST",
          headers: {
            Authorization: `Token ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          setDisplayAlert(true);
          setAlertType("success");
          setAlertMessage("Projeto enviado com successo! Redirecionando...");

          router.push("/dashboard/requisitions");
        } else {
          setDisplayAlert(true);
          setAlertType("warning");
          setAlertMessage(
            "Houve um erro ao enviar o formulário: " + response.statusText
          );
        }
      } catch (error) {
        setDisplayAlert(true);
        setAlertType("danger");
        setAlertMessage("Erro na submissão do formulário: " + error.message);
      }
    }
  };

  useEffect(() => {
    const isDateValid = date.length >= 6 && date.length <= 12;
    const isQuantityValid =
      parseInt(males) + parseInt(females) >= 1 &&
      parseInt(males) + parseInt(females) <= 999;
    const isProjectValid = project.length > 1;

    const isFormValid = isDateValid && isQuantityValid && isProjectValid;

    setButtonDisabled(!isFormValid);
  }, [males, females, date, project]);

  return (
    <div className="bg-gray-900">
      {loading && <LoadingSpinner />}
      {displayAlert && (
        <Alert
          message={alertMessage}
          type={alertType}
          onClick={() => setDisplayAlert(false)}
        />
      )}
      <div className="overflow-x-hidden overflow-y-auto overflow-hidden">
        <main className="bg-gray-900 p-4">
          <form
            onSubmit={handleSubmit}
            className="mx-auto bg-gray-800 p-8 rounded shadow-md min-w-fit max-w-lg grid grid-cols-1"
          >
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Requisição de animais
            </h2>
            <div className="pb-4">
              <p className="text-gray-300 pb-1">
                Antes de preencher esta requisição, certifique-se que seu
                projeto foi cadastrado.
              </p>
              <p className="text-gray-300 pb-1">
                Informe a quantidade total de animais conforme descrito no
                projeto e aprovado pelo parecer da CEUA.
              </p>
              <p className="text-gray-300 pb-1">
                Adicione as particularidades do seu projeto, como faixa de idade
                e retirada parcelada de animais, no campo de observações.
              </p>
            </div>

            <InputField
              label="Data de entrega (estimada)"
              value={date}
              type="date"
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <AutocompleteInputField
              label="Projeto"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              url={ROOT_URL + PROJECTS_PATH}
              field={"title"}
              placeholder={"Caso não encontre o projeto, realize o cadastro"}
              showIdentifier={true}
              required
            />
            <InputField
              label="Machos"
              value={males}
              onChange={(e) => setMales(e.target.value)}
            />
            <InputField
              label="Fêmeas"
              value={females}
              onChange={(e) => setFemales(e.target.value)}
            />
            <InputField
              label="Observações"
              value={authorNotes}
              onChange={(e) => setAuthorNotes(e.target.value)}
              placeholder="Detalhes adicionais para a equipe do Biotério, como a faixa de idade."
            />
            <TagInputField tags={tags} setTags={setTags} />
            <Button type="button" onClick={handleSubmit} disabled={buttonDisabled}>
              Solicitar
            </Button>
          </form>
        </main>
      </div>
    </div>
  );
}
