import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"))

    const storeTokenIns = (token) => {
        localStorage.setItem("token", token)
    }
    return (
        <AuthContext.Provider value={{token,storeTokenIns}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext)
    if(!authContextValue) {
        throw new Error("use Auth must be used within the AuthProvider")
    }
    return authContextValue
}