import Head from "next/head";
import Layout from "@/components/Layout";
import LoginWall from "@/components/LoginWall";
import Requisitions from "@/components/requisitions/Requisitions";

export default function RequisitionPage() {
  return (
    <LoginWall>
      <Head>
        <title>Requisições</title>
      </Head>
      <Layout>
        <Requisitions />
      </Layout>
    </LoginWall>
  );
}
