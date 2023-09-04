import Head from "next/head";
import Layout from "@/components/Layout";
import LoginWall from "@/components/LoginWall";
import RequisitionDetail from "@/components/requisitions/RequisitionDetail";
import { RequisitionDataProvider } from "@/components/requisitions/utils/useRequisitionData";

export default function RequisitionPage() {
  return (
    <LoginWall>
      <RequisitionDataProvider>
        <Head>
          <title>Requisição</title>
        </Head>
        <Layout>
          <RequisitionDetail />
        </Layout>
      </RequisitionDataProvider>
    </LoginWall>
  );
}
