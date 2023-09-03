import React from "react";
import { Tooltip } from "flowbite-react";
import { useRouter } from "next/router";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export default function BackButton({ children }) {
  const router = useRouter();

  function handleBack() {
    const path = router.asPath.split("/");
    path.pop();
    const parentPath = path.join("/");
    router.push(parentPath);
  }

  return (
    <Tooltip content="Retornar">
      <FaArrowAltCircleLeft
        className="w-8 h-8 text-gray-300 hover:text-blue-500 transition duration-200"
        onClick={handleBack}
      >
        {children}
      </FaArrowAltCircleLeft>
    </Tooltip>
  );
}
