import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
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
