import { type ReactNode, useState } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext";
import type { SignupFormValues } from "../schema/formSchema";

export type ContextType = AuthContextType;

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<SignupFormValues | null>(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    const savedUser = localStorage.getItem("currentUser");

    if (loggedIn === "true" && savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem("currentUser");
        localStorage.removeItem("loggedIn");
      }
    }
    return null;
  });

  const login = (userData: SignupFormValues) => {
    setUser(userData);
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
