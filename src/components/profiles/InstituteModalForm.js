import { useState } from "react";
import { Button, Modal } from "flowbite-react";
import InputField from "../utils/InputField";
import { ROOT_URL, INSTITUTES_PATH } from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext";
import TextArea from "../utils/TextArea";

export default function InstituteModalForm({
  isModalActive,
  setIsModalActive,
}) {
  const [name, setName] = useState(null);
  const [abbreviation, setAbbreviation] = useState(null);
  const [description, setDescription] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { authToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      abbreviation,
      description,
    };

    try {
      const response = await fetch(ROOT_URL + INSTITUTES_PATH, {
        method: "POST",
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
          <Modal.Header>Nova instituição de ensino</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <InputField
                label="Nome da instituição"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <InputField
                label="Sigla"
                value={abbreviation}
                onChange={(e) => setAbbreviation(e.target.value)}
              />
              <TextArea
                placeholder={"(Opcional) Descrição."}
                onChange={() => setDescription(e.target.value)}
                value={description}
                label={"Descrição"}
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
