import React, { useState} from "react";
import "../../css/ProfessorModal.css";
import SelecionarItemModal from "../Itens/SelecionarItemModal";
import ConfirmacaoModal from "./ConfirmacaoModal";
const EmprestimoModal = ({isOpen, onClose}) => {
    const [rfid, setRfid] = useState("");
    const [usuario, setUsuario] = useState(null);
    const [erro, setErro] = useState("");
    const [showSelecionarItemModal, setShowSelecionarItemModal] = useState(false);
    const [showConfirmacaoModal, setShowConfirmacaoModal] = useState(false);
    const [itemSelecionado, setItemSelecionado] = useState(null);


    const handleRfidKeyDown = async (e) => {
        if (e.key === "Enter"){
            try {
                const response = await fetch (`http://192.168.100.109:8080/usuarios/rfid/${rfid}`);
                if (response.ok){
                    const data = await response.json();
                    setUsuario(data);
                    setErro("");
                } else {
                    setErro("Usuário não encontrado");
                    setUsuario(null);
                }
            } catch(err){
                console.error(err);
                setErro("Erro ao buscar usuário");
            }
        }
    };

    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2> Empréstimo</h2>

                <input
                    type="text"
                    placeholder="Bipe o crachá (RFID)"
                    value={rfid}
                    onChange={(e) => setRfid(e.target.value)}
                    onKeyDown={handleRfidKeyDown}
                    autoFocus
                />

                {erro && <p style={{ color: "red" }}>{erro}</p>}

                {usuario && (
                    <div className="usuario-info">
                        <p><strong>Nome:</strong>{usuario.nome}</p>
                        <p><strong>Tipo:</strong>{usuario.tipo}</p>
                        <p><strong>Crachá:</strong>{usuario.rfid}</p>
                        <button onClick={() => setShowSelecionarItemModal(true)}>
                            Próximo Passo
                        </button>
                    </div>
                )}
                <div className="modal-buttons">
                    <button onClick={onClose}>Fechar</button>
                </div>
            </div>

            {/* Ativar os modals */}
            <SelecionarItemModal
                isOpen={showSelecionarItemModal}
                onClose={() => setShowSelecionarItemModal(false)}
                usuario={usuario}
                onItemSelecionado={(item) => {
                    setItemSelecionado(item);
                    setShowSelecionarItemModal(false);
                    setShowConfirmacaoModal(true);
                }}
            />
            <ConfirmacaoModal
                isOpen={showConfirmacaoModal}
                onClose={() => setShowConfirmacaoModal(false)}
                usuario={usuario}
                itemSelecionado={itemSelecionado}
            />

        </div>
    );
};

export default EmprestimoModal;