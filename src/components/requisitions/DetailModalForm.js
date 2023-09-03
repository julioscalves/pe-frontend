import { useState } from "react";
import { Button, Modal } from "flowbite-react";
import InputField from "../utils/InputField";
import { ROOT_URL, REQUISITIONS_PATH } from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext";
import TextArea from "../utils/TextArea";
import Alert from "../utils/Alert";
import fetchData from "./utils/fetchData";
import { useRequisitionData } from "./utils/useRequisitionData";

export default function DeliverModalForm({
  protocol,
  deliveryDate,
  solicitedMales,
  solicitedFemales,
  oldNotes,
  isModalActive,
  setIsModalActive,
}) {
  const [date, setDate] = useState(deliveryDate);
  const [males, setMales] = useState(solicitedMales);
  const [females, setFemales] = useState(solicitedFemales);
  const [notes, setNotes] = useState(oldNotes);

  const [displayAlert, setDisplayAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const { authToken } = useAuth();
  const { requisitionData, setRequisitionData } = useRequisitionData();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      requisition: protocol,
      date,
      males,
      females,
      notes,
    };

    try {
      const response = await fetch(
        ROOT_URL + REQUISITIONS_PATH + protocol + "/",
        {
          method: "PATCH",
          headers: {
            Authorization: `Token ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        await fetchData({ protocol, setRequisitionData, authToken });
        setDisplayAlert(true);
        setAlertType("success");
        setAlertMessage("Entrega registrada com sucesso!");
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
      <Modal.Header>Atualizar requisição</Modal.Header>
      <Modal.Body>
        {displayAlert && (
          <Alert
            message={alertMessage}
            type={alertType}
            onClick={() => setDisplayAlert(false)}
          />
        )}
        <div className="space-y-6">
          <InputField label="Protocolo" value={protocol} readonly={true} />
          <InputField
            label="Data de entrega"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-12">
            <InputField
              label="Machos"
              value={males}
              onChange={(e) => setMales(parseInt(e.target.value))}
            />
            <InputField
              label="Fêmeas"
              value={females}
              onChange={(e) => setFemales(parseInt(e.target.value))}
            />
          </div>
          <TextArea
            value={notes}
            label="Observações"
            onChange={(e) => setNotes(e.target.value)}
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
