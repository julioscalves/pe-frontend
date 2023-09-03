import Layout from "@/components/Layout";
import LoginWall from "@/components/LoginWall";
import Deliveries from "@/components/delivers/Deliveries"

export default function RequisitionPage() {
  return (
    <LoginWall>
      <Layout>
        <Deliveries />
      </Layout>
    </LoginWall>
  );
}