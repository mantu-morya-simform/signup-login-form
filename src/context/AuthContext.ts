import { createContext } from "react";
import type { SignupFormValues } from "../schema/formSchema";

export type AuthContextType = {
  user: SignupFormValues | null;
  login: (userData: SignupFormValues) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
