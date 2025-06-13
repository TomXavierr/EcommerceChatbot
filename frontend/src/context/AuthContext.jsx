import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (authTokens) {
      const payload = JSON.parse(atob(authTokens.access.split(".")[1]));
      setUser({
        id: payload.user_id,
        username: payload.username,
        email: payload.email,
      });
    }
  }, [authTokens]);

  const loginUser = async (username, password) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.status === 200) {
      const data = await res.json();
      setAuthTokens(data);
      localStorage.setItem("authTokens", JSON.stringify(data));
      return true;
    } else {
      return false;
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authTokens,
        loginUser,
        logoutUser,
        cartCount,
        setCartCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


// import { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [authTokens, setAuthTokens] = useState(() =>
//     localStorage.getItem("authTokens")
//       ? JSON.parse(localStorage.getItem("authTokens"))
//       : null
//   );
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (authTokens) {
//       const payload = JSON.parse(atob(authTokens.access.split(".")[1]));
//       setUser({ username: payload.username });
//     }
//   }, [authTokens]);

//   const loginUser = async (username, password) => {
//     const res = await fetch("http://127.0.0.1:8000/api/token/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, password }),
//     });

//     if (res.status === 200) {
//       const data = await res.json();
//       setAuthTokens(data);
//       console.log(data);
//       localStorage.setItem("authTokens", JSON.stringify(data));
//       return true;
//     } else {
//       return false;
//     }
//   };

//   const logoutUser = () => {
//     setAuthTokens(null);
//     setUser(null);
//     localStorage.removeItem("authTokens");
//   };

//   return (
//     <AuthContext.Provider value={{ user, authTokens, loginUser, logoutUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
