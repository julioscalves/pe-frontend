import Head from "next/head";
import Layout from "@/components/Layout";
import LoginWall from "@/components/LoginWall";
import ProjectDetail from "@/components/projects/ProjectDetail";

export default function RequisitionPage() {
  return (
    <LoginWall>
      <Head>
        <title>Projeto</title>
      </Head>
      <Layout>
        <ProjectDetail />
      </Layout>
    </LoginWall>
  );
}