// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import ProfessorModal from '../components/ProfessorModal';
import '../css/Dashboard.css';
import ItensModal from "../components/ItensModal";
import EstoqueModal from "../components/EstoqueModal";
import ProfessoresCadModal from "../components/ProfessoresCadModal";
import EmprestimoModal from "../components/EmprestimoModal";


const Dashboard = () => {
    // Aqui estou declarando o Modal de cadastro de professor e falando que esta FALSO somente VERDADEIRO quando eu apertar para abrir
    const [showProfessorModal, setShowProfessorModal] = useState (false);
    const [showItensModal, setShowItensModal] = useState (false);
    const [showEstoqueModal, setShowEstoqueModal] = useState (false);
    const [showProfessoresCadModal, setShowProfessoresCadModal] = useState(false);
    const [showEmprestimoModal, setShowEmprestimoModal] = useState(false);

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
                        onClick={() => setShowEmprestimoModal}
                         style={{ cursor: "pointer"}}
                    >
                        <div className="card-title">Emprestimo</div>
                        <div className="card-sub">Todos disponíveis</div>
                    </div>

                    <div className="card blue">
                        <div className="card-title">Adicionar Prédio e Sala</div>
                        <div className="card-count">125 registros</div>
                        <div className="card-sub">Gerenciamento de locais</div>
                    </div>
                </section>

                <section className="info-columns">
                    <div className="column">
                        <h4>Professores Ativos</h4>
                        <ul>
                            <li>João Silva</li>
                            <li>Maria Costa</li>
                            <li>Ana Lima</li>
                        </ul>
                    </div>

                    <div className="column">
                        <h4>Itens Emprestados</h4>
                        <ul>
                            <li>Chave Lab 1 - João</li>
                            <li>Controle Ar - Maria</li>
                        </ul>
                    </div>

                    <div className="column">
                        <h4>Itens Disponíveis</h4>
                        <ul>
                            <li>Chave Auditório</li>
                            <li>HDMI reserva</li>
                        </ul>
                    </div>
                </section>

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
            </main>
        </div>
    );
};

export default Dashboard;
