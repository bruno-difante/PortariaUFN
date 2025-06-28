import React from "react";
import "../../css/Alerta.css";

const Alerta = ({ mensagem, onClose }) => {
    if (!mensagem) return null;

    return (
        <div className="alerta-overlay" onClick={onClose}>
            <div className="alerta-box" onClick={(e) => e.stopPropagation()}>
                <p>{mensagem}</p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
};

export default Alerta;