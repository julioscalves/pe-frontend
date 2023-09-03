import Layout from "@/components/Layout";
import LoginWall from "@/components/LoginWall";
import Profiles from "@/components/profiles/Profiles";

export default function RequisitionPage() {
  return (
    <LoginWall>
      <Layout>
        <Profiles />
      </Layout>
    </LoginWall>
  );
}
