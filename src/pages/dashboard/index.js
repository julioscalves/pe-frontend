import Body from "@/components/dashboard/Body";
import Layout from "@/components/Layout";
import LoginWall from "@/components/LoginWall";
import Head from "next/head";

export default function DashboardPage() {
  return (
    <LoginWall>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Layout>
        <Body />
      </Layout>
    </LoginWall>
  );
}
