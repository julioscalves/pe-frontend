import Layout from "@/components/Layout";
import LoginWall from "@/components/LoginWall";
import Requisitions from "@/components/requisitions/Requisitions";
import { RequisitionDataProvider } from "@/components/requisitions/utils/useRequisitionData";

export default function RequisitionPage() {
  return (
    <LoginWall>
        <Layout>
          <Requisitions />
        </Layout>
    </LoginWall>
  );
}
