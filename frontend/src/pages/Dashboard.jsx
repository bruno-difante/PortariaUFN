// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import Header from '../components/Site/Header';
import ProfessorModal from '../components/Funcionario/ProfessorModal';
import '../css/Dashboard.css';
import ItensModal from "../components/Itens/ItensModal";
import EstoqueModal from "../components/Itens/EstoqueModal";
import ProfessoresCadModal from "../components/Funcionario/ProfessoresCadModal";
import EmprestimoModal from "../components/Emprestimo/EmprestimoModal";
import HistoricoEmprestimos from "../components/Emprestimo/HistoricoEmprestimos";
import ResumoEmprestimos from "../components/Emprestimo/ResumoEmprestimos";

const Dashboard = () => {
    // Aqui estou declarando o Modal de cadastro de professor e falando que esta FALSO somente VERDADEIRO quando eu apertar para abrir
    const [showProfessorModal, setShowProfessorModal] = useState (false);
    const [showItensModal, setShowItensModal] = useState (false);
    const [showEstoqueModal, setShowEstoqueModal] = useState (false);
    const [showProfessoresCadModal, setShowProfessoresCadModal] = useState(false);
    const [showEmprestimoModal, setShowEmprestimoModal] = useState(false);
    const [ShowHistoricoEmprestimo, setShowHistoricoEmprestimo] = useState(false);
    return (
        <div className="dashboard">
            <Header />

            <main className="main-content">
                <h2 className="welcome">Seja Bem-Vindo(a)</h2>
                <h3 className="university">Universidade Franciscana</h3>

                <section className="card-grid">
                    {/* Card de Registro */}
                    <div className="card green"
                        onClick={() => setShowItensModal(true)}
                        style={{ cursor : "pointer"}}
                    >
                        <div className="card-title">Registrar Itens</div>
                        <div className="card-sub">Chaves, controles, etc</div>
                    </div>

                    {/* Card de Registro de Professor*/}
                    <div className="card teal"
                         onClick={() => setShowProfessorModal(true)}
                         style={{ cursor: "pointer" }}
                    >
                        <div className="card-title">Registrar Professores</div>
                        <div className="card-sub">Usuários RFID</div>
                    </div>

                    {/* Card de Estoque */}
                    <div className="card yellow"
                         onClick={() => setShowEstoqueModal(true)}
                         style={{ cursor: "pointer" }}
                    >
                        <div className="card-title">Estoque de Itens</div>
                        <div className="card-sub">Prédio e Sala</div>
                    </div>

                    {/* Card de Professores Cadastrados */}
                    <div className="card olive"
                        onClick={() => setShowProfessoresCadModal(true)}
                        style={{ cursor: "pointer"}}
                    >
                        <div className="card-title">Funcionarios Cadastrados</div>
                        <div className="card-sub">Atribuições diretas</div>
                    </div>

                    {/* Card de Emprestimo */}
                    <div className="card dark"
                        onClick={() => setShowEmprestimoModal(true)}
                         style={{ cursor: "pointer"}}
                    >
                        <div className="card-title">Emprestimo</div>
                        <div className="card-sub">Todos disponíveis</div>
                    </div>

                    {/* Card de Historico de Emprestimos*/}
                    <div className="card blue"
                         onClick={() => setShowHistoricoEmprestimo(true)}
                         style={{ cursor: "pointer"}}
                    >
                        <div className="card-title">Historico de Emprestimos</div>
                        <div className="card-sub">Gerenciamento de locais</div>
                    </div>
                </section>

                <ResumoEmprestimos />

                {/* MODALS !! */}
                <ProfessorModal
                    isOpen={showProfessorModal}
                    onClose={() => setShowProfessorModal(false)}
                />
                <ItensModal
                    isOpen={showItensModal}
                    onClose={() => setShowItensModal(false)}
                />
                <EstoqueModal
                    isOpen={showEstoqueModal}
                    onClose={() => setShowEstoqueModal(false)}
                />
                <ProfessoresCadModal
                    isOpen={showProfessoresCadModal}
                    onClose={() => setShowProfessoresCadModal(false)}
                />
                <EmprestimoModal
                    isOpen={showEmprestimoModal}
                    onClose={() => setShowEmprestimoModal(false)}
                />
                <HistoricoEmprestimos
                    isOpen={ShowHistoricoEmprestimo}
                    onClose={() => setShowHistoricoEmprestimo(false)}
                />
            </main>
        </div>
    );
};

export default Dashboard;
