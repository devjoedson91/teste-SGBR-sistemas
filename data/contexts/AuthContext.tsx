import { ReactNode, createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/services/api";
import { ToastAndroid } from "react-native";
import { useRouter } from "expo-router";

type SignInProps = {
  user: string;
  password: string;
};

type AuthContextData = {
  currentUser: UserProps;
  loadingAuth: boolean;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

type UserProps = {
  id: string;
  name: string;
  token: string;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<UserProps>({
    id: "",
    name: "",
    token: "",
  });

  const [loadingAuth, setLoadingAuth] = useState(false);

  const isAuthenticated = !!currentUser?.name;

  const router = useRouter();

  useEffect(() => {
    async function getToken() {
      const userInfo = await AsyncStorage.getItem("@sgbr-sistemas");

      let hasUser: UserProps = JSON.parse(userInfo || "{}");

      if (Object.keys(hasUser).length > 0) {
        setCurrentUser({
          id: hasUser.id,
          name: hasUser.name,
          token: hasUser.token,
        });
      }
    }

    getToken();
  }, []);

  async function signIn({ user, password }: SignInProps) {
    try {
      setLoadingAuth(true);

      const response = await api.post("/signIn", { user, password });

      const { id, name, token } = response.data.user;

      const data = { ...response.data.user };

      await AsyncStorage.setItem("@sgbr-sistemas", JSON.stringify(data));

      setCurrentUser({ id, name, token });

      router.push("/home");
    } catch (error: any) {
      ToastAndroid.show(error.response.data.message, ToastAndroid.LONG);
    } finally {
      setLoadingAuth(false);
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem("@sgbr-sistemas").then(() => {
      setCurrentUser({ id: "", name: "", token: "" });
    });

    router.push("/");
  }

  return (
    <AuthContext.Provider
      value={{ loadingAuth, signIn, signOut, isAuthenticated, currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
