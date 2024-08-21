import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (
    email: string,
    password: string,
    login: string,
    langKey: string,
    firstName: string,
    lastName: string,
    referralCode: string,
    phoneNumber: string,
    subscribeNewsletter: boolean,
    acceptTerms: boolean
  ) => Promise<any>;
  Login?: (
    email: string,
    password: string
  ) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "token";
export const API_URL = "http://dev-wick.com/api";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {

      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log("token:", token);
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({
          token,
          authenticated: true,
        });
      }
    };

    loadToken();
  }, []); // Empty dependency array indicates the effect should only run once on component mount

  const register = async (
    email: string,
    password: string,
    login: string,
    langKey: string,
    firstName: string,
    lastName: string,
    referralCode: string,
    phoneNumber: string,
    subscribeNewsletter: boolean,
    acceptTerms: boolean
  ) => {
    try {
      console.log("registering...");
      const result = await axios.post(
        `${API_URL}/register`,
        {
          email,
          password,
          login,
          langKey,
          firstName,
          lastName,
          referralCode,
          phoneNumber,
          subscribeNewsletter,
          acceptTerms,
        },
        {
          headers: {
            "Content-Type": "application/json",
           
          },
        }
      );
      console.log("auth result:", result);
      setAuthState({
        token: result.data.id_token,
        authenticated: true,
      });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.id_token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.id_token);
      return result;
    } catch (error) {
      return { error: true, message: (error as any).response.data.message };
    }
  };

  const login = async (
    email: string,
    password: string
  ) => {
    try {
      const result = await axios.post(`${API_URL}/authenticate`, {
        email,
        password
      });
      console.log(result);
      setAuthState({
        token: result.data.id_token,
        authenticated: true,
      });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.idToken}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.id_token);
      return result;
    } catch (error) {
      return { error: true, message: (error as any).response.data.message };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setAuthState({
      token: null,
      authenticated: false,
    });
    axios.defaults.headers.common["Authorization"] = "";

  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
