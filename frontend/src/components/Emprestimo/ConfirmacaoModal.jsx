import React, { useState } from "react";
import Alerta from "../Site/Alerta";
import { useNavigate } from "react-router-dom";
import "../../css/ProfessorModal.css";

const ConfirmacaoModal = ({ isOpen, onClose, usuario, itemSelecionado }) => {
    const [mensagemAlerta, setMensagemAlerta] = useState("");
    const navigate = useNavigate();

    if (!isOpen || !usuario || !itemSelecionado) return null;

    const onConfirmar = async () => {
        try {
            await fetch("http://192.168.100.97:8080/emprestimos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    professorId: usuario.id,
                    itensIds: [itemSelecionado.id]
                })
            });

            await fetch(`http://192.168.100.97:8080/itens/${itemSelecionado.id}/decrementar`, {
                method: "PUT"
            });

            setMensagemAlerta("Empréstimo realizado com sucesso!");

        } catch (error) {
            console.error("Erro ao registrar empréstimo:", error);
            setMensagemAlerta("Erro ao registrar empréstimo.");
        }
    };

    const handleFecharAlerta = () => {
        setMensagemAlerta("");
        onClose(); // Fecha o modal
        navigate("/dashboard"); // Redireciona
    };

    return (
        <>
            <div className="modal-overlay">
                <div className="modal-box">
                    <h2>Confirmar Empréstimo</h2>
                    <p><strong>Funcionário:</strong> {usuario.nome}</p>
                    <p><strong>Matrícula:</strong> {usuario.rfid}</p>
                    <p><strong>Produto:</strong> {itemSelecionado.nome}</p>
                    <p><strong>Sala:</strong> {itemSelecionado.sala}</p>
                    <p><strong>Prédio:</strong> {itemSelecionado.predio}</p>

                    <div className="modal-buttons">
                        <button onClick={onConfirmar}>Confirmar</button>
                        <button onClick={onClose}>Cancelar</button>
                    </div>
                </div>
            </div>

            {/* Alerta com redirecionamento */}
            {mensagemAlerta && (
                <Alerta
                    mensagem={mensagemAlerta}
                    onClose={handleFecharAlerta}
                />
            )}
        </>
    );
};

export default ConfirmacaoModal;