import React, { useEffect, useState } from "react";
import "../../css/Logo.css";

import part2 from "../../imagens/part2.png";
import part3 from "../../imagens/part3.png";
import part5 from "../../imagens/part5.png";
import part6 from "../../imagens/part6.png";
import part7 from "../../imagens/part7.png";
import nomeufn from "../../imagens/nomeufn.png";

// Declaração das imagens e com top = Altura, left = Lado, rotate = curvatura
const partsData = [
    { src: part6, top: "42%", left: "50%", rotate: 0 },
    { src: part5, top: "22%", left: "33%", rotate: 0 },
    { src: part7, top: "22%", left: "64%", rotate: 0 },
    { src: part7, top: "44%", left: "75%", rotate: 58 },
    { src: part2, top: "62%", left: "65%", rotate: 0 },
    { src: part3, top: "62%", left: "35%", rotate: 0 },
    { src: part5, top: "45%", left: "22%", rotate: 300 }
];

const Logo = () => {
    // Declaração de cada parte e da pagina
    const [visibleParts, setVisibleParts] = useState([]);
    const [showLetreiro, setShowLetreiro] = useState(false);

    // Declaração do tempo que cada uma deve aparecer
    useEffect(() => {
        partsData.forEach((_, index) => {
            setTimeout(() => {
                setVisibleParts(prev => [...prev, index]);
            }, index * 500);
        });

        setTimeout(() => {
            setShowLetreiro(true);
        }, partsData.length * 500 + 300);
    }, []);

    return (
        <div className="logo-container">
            <div className="logo-wrapper">
                {partsData.map((part, index) =>
                    visibleParts.includes(index) ? (
                        <img
                            key={index}
                            src={part.src}
                            alt={`Parte ${index + 1}`}
                            className="logo-piece"
                            style={{
                                top: part.top,
                                left: part.left,
                                transform: `translate(-50%, -50%) rotate(${part.rotate}deg)`
                            }}
                        />
                    ) : null
                )}

                {showLetreiro && (
                    <img
                        src={nomeufn}
                        alt="Letreiro UFN"
                        className="letreiro"
                    />
                )}
            </div>

            <footer className="logo-footer">
                <p> Software Developers: Iago, Bruno, Viti, Gabriel </p>
            </footer>
        </div>
    );
};

export default Logo;
