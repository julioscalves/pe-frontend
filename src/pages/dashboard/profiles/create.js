import Layout from "@/components/Layout";
import LoginWall from "@/components/LoginWall";
import ProfileForm from "@/components/profiles/ProfileForm";

export default function RequisitionPage() {
  return (
    <LoginWall>
      <Layout>
        <ProfileForm />
      </Layout>
    </LoginWall>
  );
}