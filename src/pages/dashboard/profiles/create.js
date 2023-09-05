import Head from "next/head";
import Layout from "@/components/Layout";
import LoginWall from "@/components/LoginWall";
import ProfileForm from "@/components/profiles/ProfileForm";

export default function RequisitionPage() {
  return (
    <LoginWall>
      <Head>
        <title>Novo perfil</title>
      </Head>
      <Layout>
        <ProfileForm />
      </Layout>
    </LoginWall>
  );
}