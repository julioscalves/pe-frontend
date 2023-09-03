import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const cookies = parseCookies();
  const router = useRouter();
  const [authToken, setAuthToken] = useState(cookies.authToken || null);
  const [user, setUser] = useState(cookies.user || null);
  const [name, setName] = useState(cookies.name || null);

  const login = (user, name, token) => {
    destroyCookie(null, "authToken");
    destroyCookie(null, "user");
    destroyCookie(null, "name");
    
    setUser(user);
    setName(name);
    setAuthToken(token);

    setCookie(null, "authToken", token, { maxAge: 30 * 24 * 60 * 60 });
    setCookie(null, "user", user, { maxAge: 30 * 24 * 60 * 60 });
    setCookie(null, "name", name, { maxAge: 30 * 24 * 60 * 60 });
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    setName(null);
    
    destroyCookie(null, "authToken");
    destroyCookie(null, "user");
    destroyCookie(null, "name");

    router.push("/auth");
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, user, name }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
