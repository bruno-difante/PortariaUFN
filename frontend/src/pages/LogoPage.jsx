import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Site/Logo";

const LogoPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate("/dashboard"); // Apos o tempo ir para dashboard
        }, 5000); // 5 Segundos para ficar na tela de inicio

        return () => clearTimeout(timeout);
    }, [navigate]);

    return (
        <div>
            <Logo />
        </div>
    );
};

export default LogoPage;
