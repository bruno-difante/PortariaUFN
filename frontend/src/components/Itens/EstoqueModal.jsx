
import React, { useEffect, useState } from "react";
import Alerta from "../Site/Alerta";
import { FaTrash, FaEdit } from "react-icons/fa";
import "../../css/ProfessorModal.css";

const EstoqueModal = ({ isOpen, onClose }) => {
    const [itens, setItens] = useState([]);
    const [mensagemAlerta, setMensagemAlerta] = useState("");
    const [filtro, setFiltro] = useState("");
    const [selecionados, setSelecionados] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [formEdicao, setFormEdicao] = useState({});
    const [showCheckboxes, setShowCheckboxes] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetch("http://192.168.100.97:8080/itens")
                .then(res => res.json())
                .then(data => setItens(data))
                .catch(err => {
                    console.error(err);
                    alert("Erro ao carregar itens!");
                });
        }
    }, [isOpen]);

    const itensFiltrados = itens.filter(item =>
        item.nome.toLowerCase().includes(filtro.toLowerCase())
    );

    const toggleSelecionado = (id) => {
        setSelecionados(prev => prev.includes(id)
            ? prev.filter(i => i !== id)
            : [...prev, id]);
    };

    const deletarSelecionados = async () => {
        for (const id of selecionados) {
            await fetch (`http://192.168.100.97:8080/itens/${id}`, {
                method: "DELETE"
            });
        }
        const novaLista = await fetch("http://192.168.100.97:8080/itens").then(r => r.json());
        setItens(novaLista);
        setSelecionados([]);
        setShowCheckboxes(false);
        alert("Itens deletados com sucesso!");
    };

    const iniciarEdicao = (item) => {
        setEditandoId(item.id);
        setFormEdicao({
            nome: item.nome,
            tipo: item.tipo,
            descricao: item.descricao,
            quantidadeTotal: item.quantidadeTotal,
            quantidadeAtual: item.quantidadeAtual,
            sala: item.sala,
            predio: item.predio,
            ativo: item.ativo
        });
    };

    const atualizarItem = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://192.168.100.97:8080/itens/${editandoId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(formEdicao)
            });
            if (response.ok) {
                const atualizados = await fetch("http://192.168.100.97:8080/itens").then(r => r.json());
                setItens(atualizados);
                setEditandoId(null);
                setFormEdicao({});
                alert("Item atualizado com sucesso!");
            } else {
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
                <input
                    type="text"
                    placeholder="Buscar por nome..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    style={{ marginBottom: "10px", width: "100%", padding: "5px" }}
                />
                <ul>
                    {itensFiltrados.map((item) => (
                        <li key={item.id} style={{ marginBottom: "15px" }}>
                            {editandoId === item.id ? (
                                <form onSubmit={atualizarItem} className="editar-form">
                                    <input
                                        type="text"
                                        value={formEdicao.nome}
                                        onChange={e => setFormEdicao({ ...formEdicao, nome: e.target.value })}
                                        placeholder="Nome"
                                        required
                                    />
                                    <input
                                        type="text"
                                        value={formEdicao.tipo}
                                        onChange={e => setFormEdicao({ ...formEdicao, tipo: e.target.value })}
                                        placeholder="Tipo"
                                        required
                                    />
                                    <input
                                        type="text"
                                        value={formEdicao.descricao}
                                        onChange={e => setFormEdicao({ ...formEdicao, descricao: e.target.value })}
                                        placeholder="Descrição"
                                    />
                                    <input
                                        type="number"
                                        value={formEdicao.quantidadeTotal}
                                        onChange={e => setFormEdicao({ ...formEdicao, quantidadeTotal: parseInt(e.target.value) })}
                                        placeholder="Quantidade Total"
                                        required
                                    />
                                    <input
                                        type="number"
                                        value={formEdicao.quantidadeAtual}
                                        onChange={e => setFormEdicao({ ...formEdicao, quantidadeAtual: parseInt(e.target.value) })}
                                        placeholder="Quantidade Atual"
                                        required
                                    />
                                    <input
                                        type="text"
                                        value={formEdicao.sala}
                                        onChange={e => setFormEdicao({ ...formEdicao, sala: e.target.value })}
                                        placeholder="Sala"
                                    />
                                    <input
                                        type="text"
                                        value={formEdicao.predio}
                                        onChange={e => setFormEdicao({ ...formEdicao, predio: e.target.value })}
                                        placeholder="Prédio"
                                    />
                                    <label>Status:</label>
                                    <select
                                        value={formEdicao.ativo?.toString() || "true"}
                                        onChange={e => setFormEdicao({ ...formEdicao, ativo: e.target.value === "true" })}
                                    >
                                        <option value="true">Ativo</option>
                                        <option value="false">Inativo</option>
                                    </select>

                                    <button type="submit">Salvar</button>
                                    <button type="button" onClick={() => setEditandoId(null)}>Cancelar</button>
                                </form>
                            ) : (
                                <div>
                                    {showCheckboxes && (
                                        <input
                                            type="checkbox"
                                            checked={selecionados.includes(item.id)}
                                            onChange={() => toggleSelecionado(item.id)}
                                            style={{ marginRight: "8px" }}
                                        />
                                    )}
                                    <p><strong>Nome:</strong> {item.nome}</p>
                                    <p><strong>Tipo:</strong> {item.tipo}</p>
                                    <p><strong>Descrição:</strong> {item.descricao}</p>
                                    <p><strong>Sala:</strong> {item.sala}</p>
                                    <p><strong>Prédio:</strong> {item.predio}</p>
                                    <p><strong>Quantidade:</strong> {item.quantidadeAtual}/{item.quantidadeTotal}</p>
                                    <p><strong>Status:</strong> {item.ativo ? "Ativo" : "Inativo"}</p>
                                    <FaEdit
                                        onClick={() => iniciarEdicao(item)}
                                        style={{ cursor: "pointer", marginLeft: "10px", color: "blue" }}
                                        title="Editar item"
                                    />
                                    <hr />
                                </div>
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