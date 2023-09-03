import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InputField from "../utils/InputField";
import AutocompleteInputField from "../utils/AutocompleteInputField";
import SubmitButton from "../utils/SubmitButton";
import {
  ROOT_URL,
  INSTITUTES_PATH,
  DEPARTMENTS_PATH,
  PROFILES_PATH,
} from "@/utils/constants";
import LoadingSpinner from "../utils/LoadingSpinner";
import Alert from "../utils/Alert";

export default function Register() {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);
  const [name, setName] = useState(null);
  const [institute, setInstitute] = useState(null);
  const [department, setDepartment] = useState(null);
  const [phone, setPhone] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [loading, setLoading] = useState(false);

  const [displayAlert, setDisplayAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!buttonDisabled) {
      const payload = {
        username,
        email,
        password,
        name,
        institute,
        department,
        phone,
      };

      try {
        fetch(ROOT_URL + PROFILES_PATH, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }).then((response) => {
          if (response.status === 201) {
            setDisplayAlert(true);
            setAlertMessage("Perfil registrado com sucesso! Redirecionando...");
            setAlertType("success");
            setTimeout(() => router.push("/auth"), 3000);
          } else {
            setDisplayAlert(true);
            setAlertMessage(response.statusText);
            setAlertType("danger");
            setLoading(false);
          }
        });
      } catch (error) {
        console.error("Error during registration:", error);
        setDisplayAlert(true);
        setAlertMessage(error);
        setAlertType("danger");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const isUsernameValid = username.length > 3;
    const isEmailValid = email.length > 7;
    const isPasswordMatch = password === passwordConfirmation;
    const isPasswordValid = password.length > 7;
    const isNameValid = name.split(" ").length > 1;
    const isInstituteValid = institute.length > 5;
    const isDepartmentValid = department.length > 3;
    const isPhoneValid = phone.length > 7;

    const isFormValid =
      isUsernameValid &&
      isEmailValid &&
      isPasswordMatch &&
      isPasswordValid &&
      isNameValid &&
      isInstituteValid &&
      isDepartmentValid &&
      isPhoneValid;

    setButtonDisabled(!isFormValid);
  }, [
    username,
    email,
    password,
    passwordConfirmation,
    name,
    institute,
    department,
    phone,
  ]);

  return (
    <div className="h-screen bg-gray-900">
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
      <div className="flex-1 overflow-x-hidden overflow-y-auto overflow-hidden">
        <main className="bg-gray-900 p-4">
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-gray-800 p-8 rounded shadow-md w-96"
          >
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Solicitação de acesso
            </h2>
            <InputField
              label="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <InputField
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Pelo menos oito caracteres."
              type="password"
              required
            />
            <InputField
              label="Confirmação de senha"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="Pelo menos oito caracteres."
              type="password"
              required
            />
            <InputField
              label="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <InputField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <InputField
              label="Telefone (Whatsapp)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(DDD) 98765-4321"
              required
            />
            <AutocompleteInputField
              label="Instituição de ensino"
              value={institute}
              onChange={(e) => setInstitute(e.target.value)}
              url={ROOT_URL + INSTITUTES_PATH}
              required
            />
            <AutocompleteInputField
              label="Departamento"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              url={ROOT_URL + DEPARTMENTS_PATH}
              required
            />
            <SubmitButton disabled={buttonDisabled} color="green">
              Enviar
            </SubmitButton>
          </form>
        </main>
      </div>
    </div>
  );
}
