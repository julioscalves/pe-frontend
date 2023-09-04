import Head from "next/head";
import Login from "@/components/auth/Login";

export default function LoginPage() {
  return (
    <div>
      <Head>
        <title>Autenticação</title>
      </Head>
      <Login />
    </div>
  );
}
