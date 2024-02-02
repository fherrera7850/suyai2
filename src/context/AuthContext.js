// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(0);
    const [rol, setRol] = useState(0);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userId, setUserId, rol, setRol }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
