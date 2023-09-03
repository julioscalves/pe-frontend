import Body from "@/components/dashboard/Body";
import Layout from "@/components/Layout";
import LoginWall from "@/components/LoginWall";
import Statistics from "@/components/statistics/Statistics";

export default function DashboardPage() {
  return (
    <LoginWall>
      <Layout>
        <Statistics />
      </Layout>
    </LoginWall>
  );
}