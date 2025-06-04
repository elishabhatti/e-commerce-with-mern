import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"))

    const setTokenIns = (token) => {
        localStorage.setItem("token", token)
    }
    return (
        <AuthContext.Provider value={{token, setTokenIns}}>
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