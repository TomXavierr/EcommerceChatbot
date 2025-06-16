import { useContext, createContext, useState, useEffect } from "react";
import axios from "../utils/axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const tokens = localStorage.getItem("authTokens");
    return tokens ? JSON.parse(tokens) : null;
  });

  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });

  const loginUser = async (username, password) => {
    try {
      const response = await axios.post("/token/", { username, password });
      if (response.status === 200) {
        const tokens = response.data;
        const decoded = jwtDecode(tokens.access);
        console.log(decoded.user_id);

        setAuthTokens(tokens);
        setUser({ id: decoded.user_id });

        localStorage.setItem("authTokens", JSON.stringify(tokens));
        localStorage.setItem("user", JSON.stringify({ id: decoded.user_id }));

        return true;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    if (!authTokens) return;

    const interval = setInterval(async () => {
      try {
        if (!authTokens?.refresh) {
          console.warn("No refresh token found in state.");
          logoutUser();
          return;
        }

        console.log("Attempting token refresh...");

        const response = await axios.post("/token/refresh/", {
          refresh: authTokens.refresh,
        });

        console.log("Refresh success:", response.data);

        if (response.status === 200) {
          const newAccessToken = response.data.access;
          const decoded = jwtDecode(newAccessToken);
          console.log("Decoded new access token user_id:", decoded.user_id);

      
          const newTokens = {
            access: newAccessToken,
            refresh: authTokens.refresh,
          };

          setAuthTokens(newTokens);
          setUser({ id: decoded.user_id });

          localStorage.setItem("authTokens", JSON.stringify(newTokens));
          localStorage.setItem("user", JSON.stringify({ id: decoded.user_id }));
        } else {
          console.warn("Refresh returned non-200 status. Logging out.");
          logoutUser();
        }
      } catch (error) {
        console.error("Token refresh failed:", error);
        logoutUser();
      }
    }, 1000 * 60 * 3);

    return () => clearInterval(interval);
  }, [authTokens]);

  return (
    <AuthContext.Provider value={{ user, authTokens, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
