import { useVerifyToken } from "@/Auth/hooks/useAuthQuery";
import React, { createContext, useEffect, useState } from "react";

interface UserDetails {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
}

type AuthContextType = UserDetails | null;

export const AuthContext = createContext<AuthContextType>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { data, error, isLoading } = useVerifyToken();
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

    useEffect(() => {
        if (data && !isLoading && !error) {
            setUserDetails(data);
        }
    }, [data, isLoading, error]);

    return (
        <AuthContext.Provider value={userDetails}>
            {children}
        </AuthContext.Provider>
    );
}

