import Layout from "@/components/Layout";
import LoginWall from "@/components/LoginWall";
import ProjectDetail from "@/components/projects/ProjectDetail";

export default function RequisitionPage() {
  return (
    <LoginWall>
      <Layout>
        <ProjectDetail />
      </Layout>
    </LoginWall>
  );
}