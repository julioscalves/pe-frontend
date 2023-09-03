import Layout from "@/components/Layout";
import LoginWall from "@/components/LoginWall";
import Events from "@/components/events/Events";

export default function RequisitionPage() {
  return (
    <LoginWall>
      <Layout>
        <Events />
      </Layout>
    </LoginWall>
  );
}