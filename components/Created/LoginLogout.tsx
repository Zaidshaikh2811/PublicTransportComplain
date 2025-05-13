"use client"
import { useAuth } from "@/context/AuthContext";

import React from 'react'
import { Button } from "../ui/button";
import Link from "next/link";


const LoginLogout = () => {
    const { user, logout } = useAuth();
    return (
        <>
            {user ? (
                <Button variant="secondary" onClick={logout}>
                    Logout
                </Button>
            ) : (
                <>
                    <Button variant="default" className="text-black">
                        <Link href="/login">Login</Link>

                    </Button>
                    <Button variant="secondary">
                        <Link href="/register"> Register</Link>
                    </Button>
                </>
            )}
        </>
    )
}

export default LoginLogout
