import Head from "next/head";
import Layout from "@/components/Layout";
import LoginWall from "@/components/LoginWall";
import RequisitionForm from "@/components/requisitions/RequisitionForm"

export default function RequisitionPage() {
  return (
    <LoginWall>
      <Head>
        <title>Nova requisição</title>
      </Head>
      <Layout>
        <RequisitionForm />
      </Layout>
    </LoginWall>
  );
}