import React, { useEffect, useState } from "react";
import "../../css/ProfessorModal.css";

const SelecionarItemModal = ({ isOpen, onClose, onItemSelecionado }) => {
    const [itens, setItens] = useState([]);
    const [itemSelecionado, setItemSelecionado] = useState(null);

    useEffect(() => {
        if (isOpen) {
            fetch("http://192.168.100.109:8080/itens")
                .then(res => res.json())
                .then(data => {
                    const ativos = data.filter(item => item.ativo === true);
                    setItens(ativos);
                })
                .catch(err => {
                    console.error(err);
                    alert("Erro ao carregar itens disponíveis");
                });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2>Selecionar Item para Empréstimo</h2>

                <ul style={{ maxHeight: "200px", overflowY: "auto", listStyleType: "none", padding: 0 }}>
                    {itens.map(item => (
                        <li key={item.id}>
                            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <input
                                    type="radio"
                                    name="itemSelecionado"
                                    value={item.id}
                                    checked={itemSelecionado?.id === item.id}
                                    onChange={() => setItemSelecionado(item)}
                                />
                                {" "}{item.nome} ({item.tipo})
                            </label>
                        </li>
                    ))}
                </ul>
                <div className="modal-buttons" style={{ marginTop: "10px" }}>
                    <button onClick={() => {
                        if (!itemSelecionado) return alert("Selecione pelo menos um item!");
                        onItemSelecionado(itemSelecionado); // Chama o pai
                    }}>
                        Próximo Passo
                    </button>
                    <button onClick={onClose} style={{ marginLeft: "10px" }}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default SelecionarItemModal;
