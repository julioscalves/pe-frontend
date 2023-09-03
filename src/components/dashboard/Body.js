import Link from "next/link";

export default function Body() {
  const options = [
    {
      key: 1,
      name: "Usuários",
      description: "Acessar os usuários cadastrados",
      href: "/dashboard/profiles",
    },
    {
      key: 2,
      name: "Projetos",
      description: "Ver os projetos cadastrados",
      href: "/dashboard/projects",
    },
    {
      key: 3,
      name: "Requisições",
      description: "Visualizar o painel de requisições",
      href: "/dashboard/requisitions",
    },
    {
      key: 4,
      name: "Entregas",
      description: "Explorar as entregas realizadas",
      href: "dashboard/deliveries",
    },
    {
      key: 5,
      name: "Estatísticas",
      description: "Analisar os dados armazenados",
      href: "/dashboard/statistics",
    }
  ];

  return (
    <div>
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4 mx-5">
          {options.map((option) => (
            <Link href={option.href} key={option.key}>
              <div className="transition duration-500 hover:scale-105 hover:bg-blue-700 bg-gray-800 p-4 rounded shadow hover:shadow-lg transition duration-300">
                <h3 className="text-lg font-semibold mb-2">{option.name}</h3>
                <p className="text-gray-400">{option.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
