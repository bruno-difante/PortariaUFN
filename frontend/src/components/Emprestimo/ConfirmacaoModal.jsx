import React from "react";
import "../../css/ProfessorModal.css";



const ConfirmacaoModal = ({ isOpen, onClose, usuario, itemSelecionado }) => {
    if (!isOpen || !usuario || !itemSelecionado) return null;

    const onConfirmar = async () => {
        try {
            // Envia o empréstimo
            await fetch("http://192.168.100.109:8080/emprestimos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    professorId: usuario.id,
                    itensIds: [itemSelecionado.id]
                })
            });

            // Decrementa o estoque
            await fetch(`http://192.168.100.109:8080/itens/${itemSelecionado.id}/decrementar`, {
                method: "PUT"
            });

            alert("Empréstimo realizado com sucesso!");
            onClose();
        } catch (error) {
            console.error("Erro ao registrar empréstimo:", error);
            alert("Erro ao registrar empréstimo.");
        }
    };

    return(
      <div className="modal-overlay">
          <div className="modal-box">
              <h2>Confirmar Empréstimo</h2>
              <p><strong>Funcionario:</strong>{usuario.nome}</p>
              <p><strong>Matrícula:</strong>{usuario.rfid}</p>
              <p><strong>Produto:</strong>{itemSelecionado.nome}</p>
              <p><strong>Sala:</strong> {itemSelecionado.sala}</p>
              <p><strong>Prédio:</strong> {itemSelecionado.predio}</p>


              <div className="modal-buttons">
                  <button onClick={onConfirmar}>Confirmar</button>
                  <button onClick={onClose}>Cancelar</button>
              </div>
          </div>
      </div>
    );
};

export default ConfirmacaoModal;