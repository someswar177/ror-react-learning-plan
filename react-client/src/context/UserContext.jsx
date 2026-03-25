import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUserState] = useState(null);
  const [cartId, setCartIdState] = useState(null);

  // Restore from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedCartId = localStorage.getItem("cartId");
    if (storedUser) {
      try {
        setUserState(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
    if (storedCartId) {
      setCartIdState(storedCartId);
    }
  }, []);

  const setUser = (userData) => {
    setUserState(userData);
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
  };

  const setCartId = (id) => {
    setCartIdState(id);
    if (id) {
      localStorage.setItem("cartId", id);
    } else {
      localStorage.removeItem("cartId");
    }
  };

  const logout = () => {
    setUser(null);
    setCartId(null);
    localStorage.removeItem("user");
    localStorage.removeItem("cartId");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        cartId,
        setUser,
        setCartId,
        logout,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
