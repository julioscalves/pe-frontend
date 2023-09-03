import { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import InputField from "../utils/InputField";
import { ROOT_URL, DELIVERIES_PATH } from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext";
import TextArea from "../utils/TextArea";
import Alert from "../utils/Alert";
import LoadingSpinner from "../utils/LoadingSpinner";
import fetchData from "./utils/fetchData";
import { useRequisitionData } from "./utils/useRequisitionData";

export default function DeliverModalForm({
  protocol,
  isModalActive,
  setIsModalActive,
}) {
  const [date, setDate] = useState(null);
  const [males, setMales] = useState(0);
  const [females, setFemales] = useState(0);
  const [notes, setNotes] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [displayAlert, setDisplayAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const { authToken } = useAuth();
  const { setRequisitionData } = useRequisitionData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      requisition: protocol,
      date,
      males,
      females,
      notes,
    };

    try {
      const response = await fetch(ROOT_URL + DELIVERIES_PATH, {
        method: "POST",
        headers: {
          Authorization: `Token ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        await fetchData({ protocol, setRequisitionData, authToken })
        setMales("0")
        setFemales("0")
        setLoading(false);
        setDisplayAlert(true);
        setAlertType("success");
        setAlertMessage("Entrega registrada com sucesso!");
        setTimeout(() => setDisplayAlert(false), 2000);
      } else {
        setLoading(false);
        setDisplayAlert(true);
        setAlertType("warning");
        setAlertMessage(
          "Houve um erro ao enviar o formulário: " + response.statusText
        );
        setTimeout(() => setDisplayAlert(false), 2000);
      }
    } catch (error) {
      setLoading(false);
      setDisplayAlert(true);
      setAlertType("danger");
      setAlertMessage("Erro na submissão do formulário: " + error.message);
      setTimeout(() => setDisplayAlert(false), 2000);
    }
  };

  useEffect(() => {
    const isDateValid = date !== null;
    const isDeliveryValid = parseInt(males) > 0 || parseInt(females) > 0;
    const isFormValid = isDateValid && isDeliveryValid;

    setIsSubmitDisabled(!isFormValid);
  }, [males, females, date]);

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
          <Modal.Header>Registrar nova entrega</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <InputField label="Protocolo" value={protocol} readonly={true} />
              <InputField
                label="Data de entrega"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required={true}
              />
              <div className="grid grid-cols-2 gap-12">
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
              disabled={isSubmitDisabled}
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
