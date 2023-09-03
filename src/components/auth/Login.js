import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { ROOT_URL, AUTH_PATH } from "@/utils/constants";
import Button from "../utils/Button";
import LoadingSpinner from "../utils/LoadingSpinner";
import Link from "next/link";
import Alert from "../utils/Alert";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [displayAlert, setDisplayAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(ROOT_URL + AUTH_PATH, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { user, name, token } = await response.json();

        setDisplayAlert(true);
        setAlertType("success");
        setAlertMessage("Autenticação realizada! Redirecionando...");

        login(user, name, token);
        router.push("/dashboard");
      } else {
        setLoading(false);

        setDisplayAlert(true);
        setAlertType("danger");
        setAlertMessage(
          "Credenciais inválidas! Por favor, verifique o login e a senha."
        );
      }
    } catch (err) {
      setLoading(false);

      setDisplayAlert(true);
      setAlertType("danger");
      setAlertMessage(
        "Erro na requisição! Por favor, verifique sua conexão com a internet e o estado do servidor."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      {loading ? <LoadingSpinner /> : <></>}
      {displayAlert ? (
        <Alert
          message={alertMessage}
          type={alertType}
          onClick={(e) => setDisplayAlert(false)}
        />
      ) : (
        <></>
      )}
      <div className="bg-gray-800 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 mx-auto text-center">
          Autenticação
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-1 font-medium">
              Usuário
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300 bg-gray-600"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-1 font-medium">
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300 bg-gray-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full ${
              loading === false
                ? "bg-blue-500 hover:bg-blue-800"
                : "bg-gray-100"
            }  text-white py-2 rounded  transition duration-200 `}
            disabled={loading}
          >
            Autenticar
          </button>
        </form>
      </div>
    </div>
  );
}
