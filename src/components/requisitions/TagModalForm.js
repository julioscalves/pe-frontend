import { useState, useEffect } from "react";
import { ROOT_URL, TAGS_PATH } from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext";
import { Button, Modal } from "flowbite-react";
import Alert from "../utils/Alert";
import { FaPen, FaTrash } from "react-icons/fa";

function TagItem({ id, name, color, handleDelete }) {
  return (
    <div className="grid grid-cols-12">
      <span
        className={`col-span-10 w-fit text-md font-medium mr-2 px-4 py-2 rounded bg-${color}-900 text-${color}-300`}
      >
        {name}
      </span>
      <FaPen className="my-auto text-amber-500 hover:text-amber-300" />
      <FaTrash
        className="my-auto text-red-500 hover:text-red-300"
        onClick={handleDelete}
      />
    </div>
  );
}

async function sendRequest({ URL, method, authToken, payload = {} }) {
  request = {
    GET: {
      method: "GET",
      headers: {
        Authorization: `Token ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
    POST: {
        method: "POST",
        headers: {
          Authorization: `Token ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    PATCH: {
        method: "PATCH",
        headers: {
          Authorization: `Token ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    DELETE: {
        method: "DELETE",
        headers: {
          Authorization: `Token ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
  };
  const response = await fetch(URL);
}

export default function TagModalForm({ isModalActive, setIsModalActive }) {
  const [displayAlert, setDisplayAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [options, setOptions] = useState([]);

  const { authToken } = useAuth();

  const handleDelete = (id) => {
    console.log(id);
  };

  const handleEdit = (id, name, color) => {};

  useEffect(() => {
    const fetchBadgeOptions = async () => {
      try {
        const response = await fetch(ROOT_URL + TAGS_PATH, {
          method: "GET",
          headers: {
            Authorization: `Token ${authToken}`,
          },
        });
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error("Error fetching badge options:", error);
      }
    };

    fetchBadgeOptions();
  }, []);

  return (
    <Modal
      show={isModalActive}
      onClose={() => setIsModalActive(false)}
      className="bg-gray-800"
    >
      <Modal.Header>Gerenciar tags</Modal.Header>
      <Modal.Body>
        {displayAlert && (
          <Alert
            message={alertMessage}
            type={alertType}
            onClick={() => setDisplayAlert(false)}
          />
        )}
        <div className="space-y-6">
          {options?.length > 0 ? (
            options.map((item) => (
              <TagItem
                key={item.id}
                id={item.id}
                name={item.name}
                color={item.color}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <p>Nenhuma tag cadastrada</p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          color="warning"
          className="font-bold"
          pill
          onClick={() => setIsModalActive(false)}
        >
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
