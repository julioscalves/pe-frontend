import Head from "next/head";
import Layout from "@/components/Layout";
import LoginWall from "@/components/LoginWall";
import Statistics from "@/components/statistics/Statistics";

export default function DashboardPage() {
  return (
    <LoginWall>
      <Head>
        <title>Estatísticas</title>
      </Head>
      <Layout>
        <Statistics />
      </Layout>
    </LoginWall>
  );
}