"use client";
import { FaDiscord } from 'react-icons/fa';
const config = require("@/json/config.json");

export default function LoginButton() {
    const handleLogin = () => {
        window.location.href = config.baseApiURL + "auth/discord";
    };

    return (
        <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center gap-2 hover:bg-indigo-600 bg-indigo-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 text-white" onClick={handleLogin}>
            <FaDiscord size={20} />
            Login with Discord
        </button>
    );
}