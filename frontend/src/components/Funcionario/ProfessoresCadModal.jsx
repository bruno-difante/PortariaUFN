import React, { useEffect, useState } from "react";
import Alerta from "../Site/Alerta";
import { FaTrash } from "react-icons/fa";
import "../../css/ProfessorModal.css";

const ProfessoresCadModal = ({ isOpen, onClose }) => {
    const [atribuicoes, setAtribuicoes] = useState([]);
    const [mensagemAlerta, setMensagemAlerta] = useState("");
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [selecionados, setSelecionados] = useState([]);
    const [filtro, setFiltro] = useState("");

    useEffect(() => {
        if (isOpen) {
            fetch("http://192.168.100.97:8080/usuarios")
                .then(res => res.json())
                .then(data => setAtribuicoes(data))
                .catch(err => {
                    console.error(err);
                    setMensagemAlerta("Erro ao carregar item!");
                });
        }
    }, [isOpen]);

    const deletarSelecionados = async () => {
        for (const id of selecionados) {
            await fetch(`http://192.168.100.97:8080/usuarios/${id}`, {
                method: "DELETE",
            });
        }

        const novaLista = await fetch("http://192.168.100.97:8080/usuarios").then(r => r.json());
        setAtribuicoes(novaLista);
        setSelecionados([]);
        setShowCheckboxes(false);
        setMensagemAlerta("Funcionário deletado!");
    };

    const toggleSelecionado = (id) => {
        setSelecionados(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    };

    const professoresFiltrados = atribuicoes.filter(p =>
        p.nome.toLowerCase().includes(filtro.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <>
            <div className="modal-overlay">
                <div className="modal-box">
                    <h2>
                        Lista de Funcionarios
                        <FaTrash
                            onClick={() => setShowCheckboxes(!showCheckboxes)}
                            style={{ cursor: "pointer", marginLeft: "10px", color: "red" }}
                            title="Selecionar itens para deletar"
                        />
                    </h2>

                    <input
                        type="text"
                        placeholder="Buscar por nome..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                        style={{ marginBottom: "10px", width: "100%", padding: "5px" }}
                    />

                    <ul>
                        {professoresFiltrados.map((prof, index) => (
                            <li key={index} style={{ marginBottom: "15px" }}>
                                {showCheckboxes && (
                                    <input
                                        type="checkbox"
                                        checked={selecionados.includes(prof.id)}
                                        onChange={() => toggleSelecionado(prof.id)}
                                        style={{ marginRight: "8px" }}
                                    />
                                )}
                                <p><strong>Nome:</strong> {prof.nome}</p>
                                <p><strong>ID Crachá:</strong> {prof.rfid}</p>
                                <p><strong>Função:</strong> {prof.tipo}</p>
                                <hr />
                            </li>
                        ))}
                    </ul>

                    {showCheckboxes && selecionados.length > 0 && (
                        <button
                            onClick={deletarSelecionados}
                            style={{ marginTop: "10px", backgroundColor: "red", color: "white" }}
                        >
                            Deletar Selecionados
                        </button>
                    )}

                    <button onClick={onClose}>Fechar</button>
                </div>
            </div>

            {/* Alerta personalizado */}
            {mensagemAlerta && (
                <Alerta
                    mensagem={mensagemAlerta}
                    onClose={() => setMensagemAlerta("")}
                />
            )}
        </>
    );
};

export default ProfessoresCadModal;