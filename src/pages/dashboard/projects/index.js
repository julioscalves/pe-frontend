import Head from "next/head";
import Layout from "@/components/Layout";
import LoginWall from "@/components/LoginWall";
import Projects from "@/components/projects/Projects";

export default function ProjectsPage() {
  return (
    <LoginWall>
      <Head>
        <title>Projetos</title>
      </Head>
      <Layout>
        <Projects />
      </Layout>
    </LoginWall>
  );
}
