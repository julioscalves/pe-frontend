import { Button, Navbar, Dropdown, Item } from "flowbite-react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { FaProjectDiagram } from "react-icons/fa";
import { useRouter } from "next/router";

export default function Header() {
  const { logout, name } = useAuth();
  const router = useRouter();
  const path = router.asPath

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <Navbar fluid rounded>
      <Navbar.Brand>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          <Link href="/dashboard"><FaProjectDiagram /></Link>
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 text-sm text-gray-100">
        <Dropdown
        className=""
          inline
          label={`Olá, ${name}!`}
        >
          <Button color="gray" className="text-center mx-auto px-2" pill onClick={handleLogout}>Logout</Button>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/dashboard/profiles" active={path.includes('profiles')}>Usuários</Navbar.Link>
        <Navbar.Link href="/dashboard/projects" active={path.includes('projects')}>Projetos</Navbar.Link>
        <Navbar.Link href="/dashboard/requisitions" active={path.includes('requisitions')}>Requisições</Navbar.Link>
        <Navbar.Link href="/dashboard/deliveries" active={path.includes('deliveries')}>Entregas</Navbar.Link>
        <Navbar.Link href="/dashboard/statistics" active={path.includes('statistics')}>Estatísticas</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
