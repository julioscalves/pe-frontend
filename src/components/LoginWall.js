import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import LoadingSpinner from "./utils/LoadingSpinner";

export default function LoginWall({ children }) {
  const router = useRouter();
  const { authToken } = useAuth();
  const [validToken, setValidToken] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      if (authToken) {
        try {
          const response = await fetch("/api/verify-token", {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          });
          if (response.ok) {
            const { token } = await response.json();
            setValidToken(token === authToken);
          } else {
            setValidToken(false);
          }
        } catch (error) {
          setValidToken(false);
        }
      } else {
        setValidToken(false);
      }

      setLoading(false);
    };

    validateToken();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!validToken) {
    router.push("/");
    return null;
  }

  return children;
}
