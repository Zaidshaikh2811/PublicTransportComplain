"use client";

import React from "react";
import "./loading.css"; // Or use Tailwind/styled-components if preferred

const LoadingPage = () => {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-white dark:bg-black">
            <div className="loader"></div>
        </div>
    );
};

export default LoadingPage;
