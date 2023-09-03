import Layout from "@/components/Layout";
import LoginWall from "@/components/LoginWall";
import RequisitionForm from "@/components/requisitions/RequisitionForm"

export default function RequisitionPage() {
  return (
    <LoginWall>
      <Layout>
        <RequisitionForm />
      </Layout>
    </LoginWall>
  );
}