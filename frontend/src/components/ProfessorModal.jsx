import React, {useState} from "react";
import "../css/ProfessorModal.css";

const ProfessorModal = ({ isOpen, onClose}) => {
    // Criamos as variaveis IGUAIS as do Java Spring, aqui usamos ela "temporariamente" para encaminhar ao banco
    // Parecido com o que faziamos com Java Swing
    const [nome, setNome] = useState("");
    const [rfid, setRfid] = useState("");
    const [tipo, setTipo] = useState("professor");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Construtor
        const professor = { nome, rfid, tipo};

        //Conecção com o Java Spring, dentro da requisição do /usuarios
        try{
         const response = await fetch ("http://localhost:8080/usuarios", {
             method: "POST", // Post pois estamos fazendo um requerimento ao banco de POSTAR algo ok?
             headers: { "Content-Type" : "application/json"},
             body: JSON.stringify(professor)
             });
            if (response.ok) {
                alert('Professor cadastrado com sucesso!');
                onClose();
            } else {
                alert('Erro ao cadastrar professor.');
            }
        } catch (error) {
            console.error(error);
            alert('Erro na requisição.');
        }
        };
        if (!isOpen) return null;

        //Aqui começamos o nosso React ali encima era somente o requerimento ao Banco e ao Java Spring

        return(
            <div className="modal-overlay">
                <div className="modal-box">
                    <h2>Cadastro de Professores</h2>
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

        );
};
export default ProfessorModal;