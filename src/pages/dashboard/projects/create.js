import Head from "next/head";
import Layout from "@/components/Layout";
import LoginWall from "@/components/LoginWall";
import ProjectForm from "@/components/projects/ProjectForm";

export default function ProjectsPage() {
  return (
    <LoginWall>
      <Head>
        <title>Novo projeto</title>
      </Head>
      <Layout>
        <ProjectForm />
      </Layout>
    </LoginWall>
  );
}