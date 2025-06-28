import React, { useState } from "react";
import Alerta from "../Site/Alerta";

import "../../css/ProfessorModal.css";

// Declaramos esse JS como um modal, e o isOpen garante que ele esteja aberto
const ItensModal = ({ isOpen, onClose}) => {

    // Declaramos as variaveis ok amigos??
    const [nome, setNome] = useState ("");
    const [mensagemAlerta, setMensagemAlerta] = useState("");
    const [tipo, setTipo] = useState ("");
    const [descricao, setDescricao] = useState ("");
    const [quantidadeTotal, setQuantidadeTotal] = useState ("");
    const [quantidadeAtual, setQuantidadeAtual] = useState ("");
    const [ativo, setAtivo] = useState (true); // É um boolean
    const [sala, setSala] = useState("");
    const [predio, setPredio] = useState("");

    //Objeto
    const handleSubmit = async (e) => {
        e.preventDefault();

        const item = {
            nome,
            tipo,
            descricao,
            quantidadeTotal: parseInt(quantidadeTotal),
            quantidadeAtual: parseInt(quantidadeAtual),
            sala,
            predio,
            ativo
        };


        try {
            const response = await fetch('http://192.168.100.97:8080/itens', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            });

            if (response.ok) {
                alert("Item cadastrado!");
                onClose();
            } else {
                alert("Erro ao cadastrar o Item!");
            }
        } catch (error) {
            console.error(error);
            alert("Erro na requisição!");
        }
    };

    //Fechamos o modal
    if (!isOpen) return null;

    // Aqui fazemos o REACT, tudo acima é somente a conexão ao banco de dados MONGODB!!!!
    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2>Cadastro de Itens</h2>
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
                        placeholder="tipo"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="quantidadeTotal"
                        value={quantidadeTotal}
                        onChange={(e) => setQuantidadeTotal(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="quantidadeAtual"
                        value={quantidadeAtual}
                        onChange={(e) => setQuantidadeAtual(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Sala"
                        value={sala}
                        onChange={(e) => setSala(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Predio"
                        value={predio}
                        onChange={(e) => setPredio(e.target.value)}
                        required
                    />

                    <select value={ativo} onChange={(e) => setAtivo(e.target.value === "true")} required>
                        <option value="true">Ativo</option>
                        <option value="false">Inativo</option>
                    </select>
                    <div className="modal-buttons">
                        <button type="submit">Cadastrar</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ItensModal;