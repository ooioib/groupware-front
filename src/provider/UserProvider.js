import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (sessionStorage.getItem("user")) {
      return JSON.parse(sessionStorage.getItem("user"));
    } else {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    if (sessionStorage.getItem("token")) {
      return sessionStorage.getItem("token");
    } else {
      return null;
    }
  });

  const [stompClient, setStompClient] = useState(null);

  const providerValue = {
    user,
    setUser,
    token,
    setToken,
    stompClient,
    setStompClient,
  };

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = function () {
  return useContext(UserContext);
};
