import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import "../css/ProfessorModal.css";

const ProfessoresCadModal = ({ isOpen, onClose}) => {
    const [atribuicoes, setAtribuicoes] = useState([]);
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [selecionados, setSelecionados] = useState([]);

    // Comando para carregar do back os professores
    useEffect(() => {
        if(isOpen) {
            fetch ("http://192.168.100.109:8080/usuarios")
                .then(res => res.json())
                .then(data => setAtribuicoes(data))
                .catch(err =>{
                    console.error(err);
                    alert("Erro ao carregar item!");
                })
        }
    }, [isOpen]);

    // Função para Deletarmos o Funcionario da Lista
    const deletarSelecionados = async () => {
        for (const id of selecionados){
            await fetch(`http://192.168.100.109:8080/usuarios/${id}`, {
                method: "DELETE",
            });
        }

        // Agora vamos atualizar a lista
        const novaLista = await fetch("http://192.168.100.109:8080/usuarios").then(r => r.json());
        setAtribuicoes(novaLista);
        setSelecionados([]);
        setShowCheckboxes(false);
        alert("Itens deletados!");
    }
    // Função para alternar seleção dos checkboxes
    const toggleSelecionado = (id) => {
        setSelecionados(prev => prev.includes(id)
            ? prev.filter(i => i !== id)
            : [...prev, id]);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2>
                    Lista de Funcionarios
                    <FaTrash
                        onClick={() => setShowCheckboxes(!showCheckboxes)}
                        style={{ cursor: "pointer", marginLeft: "10px", color: "red"}}
                        title="Selecionar itens para deletar"
                    />
                </h2>
                <ul>
                    {atribuicoes.map((prof,index) =>(
                        <li key={index}>
                            {showCheckboxes &&(
                                <input
                                    type="checkbox"
                                    checked={selecionados.includes(prof.id)}
                                    onChange={() => toggleSelecionado(prof.id)}
                                    style={{ marginRight: "10px"}}
                                />
                            )}
                            <strong>{prof.nome}</strong> - {prof.rfid} ({prof.tipo})
                        </li>

                        ))}
                </ul>

                {showCheckboxes && selecionados.length > 0 && (
                    <button onClick={deletarSelecionados} style={{ marginTop: "10px", backgroundColor: "red", color: "white" }}>
                        Deletar Selecionados
                    </button>
                )}
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
};
export default ProfessoresCadModal;