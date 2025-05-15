"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie"; // use this for cookie handling
import LoadingPage from "@/app/loading";


interface AuthContextType {
    user: string | null;
    login: (userData: string, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.log(error);

            localStorage.removeItem("user");
        } finally {
            setLoading(false);
        }
    }, []);

    if (loading) return <LoadingPage />;

    const login = (userData: string, token: string) => {
        localStorage.setItem("user", JSON.stringify(userData));
        if (token) {


            // Cookies.set("auth_token", token, {
            //     expires: 1,         // 1 day
            //     path: "/",          // Accessible across entire site
            //     sameSite: "strict",  // CSRF protection
            //     secure: process.env.NODE_ENV === "production" // HTTPS only in production
            // });
        }
        setUser(userData);
    };
    const logout = () => {
        localStorage.removeItem("user");


        Cookies.remove("auth_token", {
            path: "/",
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        });
        setUser(null);
        window.location.reload();
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// ✅ Custom hook for consuming AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
