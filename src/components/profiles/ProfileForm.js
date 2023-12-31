import React, { useState, useEffect } from "react";
import InputField from "@/components/utils/InputField";
import AutocompleteInputField from "@/components/utils/AutocompleteInputField";
import SubmitButton from "../utils/SubmitButton";
import {
  ROOT_URL,
  PROFILES_PATH,
  INSTITUTES_PATH,
  DEPARTMENTS_PATH,
} from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext";
import LoadingSpinner from "../utils/LoadingSpinner";
import Checkbox from "@/components/utils/Checkbox";
import Button from "../utils/Button";
import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa";
import DepartmentModalForm from "./DepartmentModalForm";
import InstituteModalForm from "./InstituteModalForm";

export default function ProfileForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [email, setEmail] = useState("");
  const [isStaff, setIsStaff] = useState(false);
  const [isAdvisor, setIsAdvisor] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [institute, setInstitute] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isInstituteModalFormOpen, setIsInstituteModalFormOpen] =
    useState(false);
  const [isDepartmentModalFormOpen, setIsDepartmentModalFormOpen] =
    useState(false);

  const router = useRouter();
  const { authToken } = useAuth();
  const passwordWarningStyle = "ring-2 ring-rose-500";

  useEffect(() => {
    const isNameValid = name !== null && name.length > 8;
    const isInstituteValid = institute !== null && institute.length > 6;
    const isDepartmentValid = department !== null && department.length > 6;
    const isPasswordValid =
      password !== null &&
      passwordConfirmation !== null &&
      (password.length === 0 || password.length >= 8) &&
      password === passwordConfirmation;

    setIsButtonDisabled(
      !(isNameValid && isInstituteValid && isDepartmentValid && isPasswordValid)
    );
  }, [
    name,
    institute,
    department,
    password,
    passwordConfirmation,
    isButtonDisabled,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      username,
      password,
      email,
      isStaff,
      isAdvisor,
      name,
      phone,
      institute,
      department,
    };

    try {
      setLoading(true);
      const response = await fetch(ROOT_URL + PROFILES_PATH, {
        method: "POST",
        headers: {
          Authorization: `Token ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Form data submitted successfully!");
        router.push("/dashboard/profiles");
        setLoading(false);
      } else {
        console.error("Error submitting form data");
        setLoading(false);
      }
    } catch (error) {
      console.error("An error occurred while submitting form data:", error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 py-8 max-w-lg mx-auto">
      {loading ? <LoadingSpinner /> : <></>}
      {isInstituteModalFormOpen && (
        <InstituteModalForm
          isModalActive={isInstituteModalFormOpen}
          setIsModalActive={setIsInstituteModalFormOpen}
        />
      )}
      {isDepartmentModalFormOpen && (
        <DepartmentModalForm
          isModalActive={isDepartmentModalFormOpen}
          setIsModalActive={setIsDepartmentModalFormOpen}
        />
      )}
      <form onSubmit={handleSubmit} className="mx-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Novo perfil de usuário
        </h2>
        <div className="mb-4">
          <p className="antialiased">
            Os únicos campos de preenchimento necessário para os usuários que
            não acessarão este sistema são
          </p>
          <p className="underline decoration-gray-500 decoration-2 mt-3">
            Nome completo
          </p>
          <p className="underline decoration-gray-500 decoration-2">
            Instituição
          </p>
          <p className="underline decoration-gray-500 decoration-2 mb-3">
            Departamento
          </p>
          <p>
            Os campos de nome de usuário e senha serão criados aleatoriamente
            pelo sistema caso não sejam informados.
          </p>
        </div>
        <InputField
          label="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Pelo menos oito caracteres"
          properties={
            password !== passwordConfirmation ? passwordWarningStyle : ""
          }
        />
        <InputField
          label="Confirmação de senha"
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="Pelo menos oito caracteres"
          properties={
            password !== passwordConfirmation ? passwordWarningStyle : ""
          }
        />
        <InputField
          label="Nome completo*"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className="grid grid-cols-2 gap-4 py-4">
          <Checkbox
            label="Técnico?"
            text="Define usuários com permissões para acessar e manipular os dados do sistema"
            checked={isStaff}
            onChange={() => setIsStaff(!isStaff)}
          />
          <Checkbox
            label="Servidor responsável?"
            text="Define usuários que podem ser listados como responsáveis pelos pedidos, como docentes, coordenadores e responsáveis técnicos de outros departamentos"
            checked={isAdvisor}
            onChange={() => setIsAdvisor(!isAdvisor)}
          />
        </div>
        <InputField
          label="Telefone (Whatsapp)"
          value={phone}
          placeholder="(DDD) 98473 3495"
          onChange={(e) => setPhone(e.target.value)}
        />
        <InputField
          label="E-mail"
          type="email"
          value={email}
          placeholder="usuario@provedor.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="grid grid-cols-6">
          <div className="col-span-5">
            <AutocompleteInputField
              label="Instituição*"
              value={institute}
              onChange={(e) => setInstitute(e.target.value)}
              url={ROOT_URL + INSTITUTES_PATH}
              placeholder="Busca por instituições"
              field="name"
            />
          </div>
          <div className="my-auto mx-auto pt-2 col-span-1">
            <Button
              type="button"
              color="sky"
              onClick={() => setIsInstituteModalFormOpen(true)}
            >
              <FaPlus />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-6">
          <div className="col-span-5">
            <AutocompleteInputField
              label="Departamento*"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              url={ROOT_URL + DEPARTMENTS_PATH}
              placeholder="Busca por departamentos"
              field="name"
              showIdentifier={true}
              identifier="institute.abbreviation"
            />
          </div>
          <div className="my-auto mx-auto pt-2 col-span-1">
            <Button
              type="button"
              color="sky"
              onClick={() => setIsDepartmentModalFormOpen(true)}
            >
              <FaPlus />
            </Button>
          </div>
        </div>
        <SubmitButton disabled={isButtonDisabled} onClick={handleSubmit}>
          Enviar
        </SubmitButton>
      </form>
    </div>
  );
}
