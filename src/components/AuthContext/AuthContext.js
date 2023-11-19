import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);

    const loginForReact = () => {
        setAuthenticated(true);
    };

    const logout = () => {
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loginForReact, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
