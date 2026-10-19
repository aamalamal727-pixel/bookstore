import React, { createContext, useEffect, useState } from "react";
export const routeGuardContext = createContext();
function AuthContext({ children }) {
  const [role, setRole] = useState("");
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("token") && sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"));
      setRole(user.role);
      setAuthorized(true);
    }
  }, [role, authorized]);
  return (
    <div>
      <routeGuardContext.Provider value={{ role, authorized, setAuthorized }}>
        {children}
      </routeGuardContext.Provider>
    </div>
  );
}

export default AuthContext;
