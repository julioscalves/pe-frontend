import Layout from "@/components/Layout";
import LoginWall from "@/components/LoginWall";
import Projects from "@/components/projects/Projects";

export default function ProjectsPage() {
  return (
    <LoginWall>
      <Layout>
        <Projects />
      </Layout>
    </LoginWall>
  );
}
