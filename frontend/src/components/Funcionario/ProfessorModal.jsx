
import React, { useState } from "react";
import Alerta from "../Site/Alerta";
import "../../css/ProfessorModal.css";

const ProfessorModal = ({ isOpen, onClose }) => {
    const [nome, setNome] = useState("");
    const [rfid, setRfid] = useState("");
    const [tipo, setTipo] = useState("professor");
    const [mensagemAlerta, setMensagemAlerta] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Envia para o back-end
            const response = await fetch("http://192.168.100.97:8080/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, rfid, tipo })
            });

            if (response.ok) {
                setMensagemAlerta("Funcionário cadastrado com sucesso!");
            } else {
                setMensagemAlerta("Erro ao cadastrar funcionário.");
            }
        } catch (error) {
            console.error("Erro:", error);
            setMensagemAlerta("Erro ao conectar com o servidor.");
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {mensagemAlerta && (
                <Alerta
                    mensagem={mensagemAlerta}
                    onClose={() => {
                        setMensagemAlerta("");
                        onClose(); // Fecha o modal após confirmação
                    }}
                />
            )}

            <div className="modal-overlay">
                <div className="modal-box">
                    <h2>Cadastro de Funcionários</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="RFID"
                            value={rfid}
                            onChange={(e) => setRfid(e.target.value)}
                            required
                        />
                        <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                            <option value="professor">Professor</option>
                            <option value="funcionario">Funcionário</option>
                        </select>

                        <div className="modal-buttons">
                            <button type="submit">Cadastrar</button>
                            <button type="button" onClick={onClose}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProfessorModal;
