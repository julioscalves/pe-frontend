import Head from "next/head";
import Layout from "@/components/Layout";
import LoginWall from "@/components/LoginWall";
import Deliveries from "@/components/delivers/Deliveries"

export default function RequisitionPage() {
  return (
    <LoginWall>
      <Head>
        <title>Entregas</title>
      </Head>
      <Layout>
        <Deliveries />
      </Layout>
    </LoginWall>
  );
}