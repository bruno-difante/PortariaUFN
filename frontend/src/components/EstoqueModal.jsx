import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import "../css/ProfessorModal.css";


const EstoqueModal = ({ isOpen, onClose }) => {
    const [itens, setItens] = useState([]);
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [selecionados, setSelecionados] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [formEdicao, setFormEdicao] = useState({});


    // Função para carregar a lista e colocar todos eles visiveis
    useEffect(() => {
        if (isOpen) {
            fetch("http://192.168.100.109:8080/itens")
                .then(res => res.json())
                .then(data => setItens(data))
                .catch(err => {
                    console.error(err);
                    alert("Erro ao carregar itens!");
                });
        }
    }, [isOpen]);

    // Função para alternar seleção dos checkboxes
    const toggleSelecionado = (id) => {
        setSelecionados(prev => prev.includes(id)
            ? prev.filter(i => i !== id)
            : [...prev, id]);
    };

    // Função para deletar os delecionados
    const deletarSelecionados = async () => {
        for (const id of selecionados) {
            await fetch (`http://192.168.100.109:8080/itens/${id}`, {
                method: "DELETE"
            });
        }

        // Aqui vamos atualizar a lista com o rei do spring ok?
        const novaLista = await fetch("http://192.168.100.109:8080/itens").then(r => r.json());
        setItens(novaLista);
        setSelecionados([]);
        setShowCheckboxes(false);
        alert("Itens deletados com sucesso!");
    };
    // Apartir daqui iremos fazer a edição de alguma variavel já existente!
    const iniciarEdicao = (item) => {
        setEditandoId(item.id);
        setFormEdicao({
            nome: item.nome,
            tipo: item.tipo,
            descricao: item.descricao,
            quantidadeTotal: item.quantidadeTotal,
            quantidadeAtual: item.quantidadeAtual,
            ativo: item.ativo
        });
    };
    // Metodo agora para se comununicar com o back e atualizar o item
    const atualizarItem = async (e) => {
        e.preventDefault();
        try {
            // Chamamos o back para EDITAR e já atualizar
            const response = await fetch(`http://192.168.100.109:8080/itens/${editandoId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(formEdicao)
            });
            // Aqui mandamos novamente para a lista do card com o objeto já atualizado
            if (response.ok) {
                const atualizados = await fetch("http://192.168.100.109:8080/itens").then(r => r.json());
                setItens(atualizados);
                setEditandoId(null);
                setFormEdicao({});
                alert("Item atualizado com sucesso!");
            }else {
                alert("Erro ao atualizar item!")
            }
        } catch (error){
            console.error(error);
            alert ("Erro na requisição");
        }
    };

    if (!isOpen) return null;


    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2>
                    Estoque de Itens
                    <FaTrash
                        onClick={() => setShowCheckboxes(!showCheckboxes)}
                        style={{ cursor: "pointer", marginLeft: "10px", color: "red"}}
                        title="Selecionar itens para deletar"
                    />

                </h2>

                <ul>
                    {itens.map((item) => (
                        <li key={item.id}>
                            {showCheckboxes && (
                                <input
                                    type="checkbox"
                                    checked={selecionados.includes(item.id)}
                                    onChange={() => toggleSelecionado(item.id)}
                                    style={{ marginRight: "8px" }}
                                />
                            )}

                            {editandoId === item.id ? (
                                <form onSubmit={atualizarItem} className="editar-form">
                                    <input
                                        type="text"
                                        value={formEdicao.nome}
                                        onChange={e => setFormEdicao({ ...formEdicao, nome: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="text"
                                        value={formEdicao.tipo}
                                        onChange={e => setFormEdicao({ ...formEdicao, tipo: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="text"
                                        value={formEdicao.descricao}
                                        onChange={e => setFormEdicao({ ...formEdicao, descricao: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="number"
                                        value={formEdicao.quantidadeTotal}
                                        onChange={e => setFormEdicao({ ...formEdicao, quantidadeTotal: parseInt(e.target.value) })}
                                        required
                                    />
                                    <input
                                        type="number"
                                        value={formEdicao.quantidadeAtual}
                                        onChange={e => setFormEdicao({ ...formEdicao, quantidadeAtual: parseInt(e.target.value) })}
                                        required
                                    />
                                    <select
                                        value={formEdicao.ativo}
                                        onChange={e => setFormEdicao({ ...formEdicao, ativo: e.target.value === "true" })}
                                    >
                                        <option value="true">Ativo</option>
                                        <option value="false">Inativo</option>
                                    </select>
                                    <button type="submit">Salvar</button>
                                    <button type="button" onClick={() => setEditandoId(null)}>Cancelar</button>
                                </form>
                            ) : (
                                <>
                                    <strong>{item.nome}</strong> - {item.tipo} ({item.quantidadeAtual}/{item.quantidadeTotal}) - {item.ativo ? "Ativo" : "Inativo"}
                                    <FaEdit
                                        onClick={() => iniciarEdicao(item)}
                                        style={{ cursor: "pointer", marginLeft: "10px", color: "blue" }}
                                        title="Editar item"
                                    />
                                </>
                            )}
                        </li>
                    ))}
                </ul>

                {showCheckboxes && selecionados.length > 0 && (
                    <button onClick={deletarSelecionados} style={{ marginTop: "10px", backgroundColor: "red", color: "white" }}>
                        Deletar Selecionados
                    </button>
                )}

                <button onClick={onClose} style={{ marginTop: "10px" }}>Fechar</button>
            </div>
        </div>
    );
};
export default EstoqueModal;