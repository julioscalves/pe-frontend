import Layout from "@/components/Layout";
import LoginWall from "@/components/LoginWall";
import ProjectForm from "@/components/projects/ProjectForm";

export default function ProjectsPage() {
  return (
    <LoginWall>
      <Layout>
        <ProjectForm />
      </Layout>
    </LoginWall>
  );
}