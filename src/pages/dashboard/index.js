import Body from "@/components/dashboard/Body";
import Layout from "@/components/Layout";
import LoginWall from "@/components/LoginWall";

export default function DashboardPage() {
  return (
    <LoginWall>
      <Layout>
        <Body />
      </Layout>
    </LoginWall>
  );
}
